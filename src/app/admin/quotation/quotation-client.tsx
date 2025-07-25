
"use client";

import { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Trash2, Plus, Download, Eye, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface IQuotationItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

interface IQuotationForm {
  clientName: string;
  companyName: string;
  phoneNumber: string;
  emailAddress: string;
  clientAddress: string;
  quotationNumber: string;
  date: Date;
  expiryDate: Date;
  items: IQuotationItem[];
  optionalItems: IQuotationItem[];
  discount: number;
  tax: number;
}

// Extend jsPDF with autoTable
declare module 'jspdf' {
    interface jsPDF {
      autoTable: (options: any) => jsPDF;
    }
}

export default function QuotationClient() {
  const [isClient, setIsClient] = useState(false);
  const { register, control, handleSubmit, watch, setValue } = useForm<IQuotationForm>({
    defaultValues: {
      clientName: '',
      companyName: '',
      phoneNumber: '',
      emailAddress: '',
      clientAddress: '',
      date: new Date(),
      expiryDate: new Date(new Date().setDate(new Date().getDate() + 30)),
      items: [{ description: '', quantity: 1, unitPrice: 0 }],
      optionalItems: [{ description: '', quantity: 1, unitPrice: 0 }],
      discount: 0,
      tax: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });
  
  const { fields: optionalFields, append: appendOptional, remove: removeOptional } = useFieldArray({
    control,
    name: 'optionalItems',
  });

  const watchedItems = watch('items');
  const watchedOptionalItems = watch('optionalItems');
  const discount = watch('discount');
  const tax = watch('tax');

  useEffect(() => {
    setIsClient(true);
    setValue('quotationNumber', `QUO-${Date.now()}`);
  }, [setValue]);

  const subtotal = watchedItems.reduce((acc, item) => {
    const quantity = Number(item.quantity) || 0;
    const unitPrice = Number(item.unitPrice) || 0;
    return acc + quantity * unitPrice;
  }, 0);

  const optionalSubtotal = watchedOptionalItems.reduce((acc, item) => {
    const quantity = Number(item.quantity) || 0;
    const unitPrice = Number(item.unitPrice) || 0;
    return acc + quantity * unitPrice;
  }, 0);

  const discountAmount = (subtotal * (Number(discount) || 0)) / 100;
  const subtotalAfterDiscount = subtotal - discountAmount;
  const taxAmount = (subtotalAfterDiscount * (Number(tax) || 0)) / 100;
  const finalTotal = subtotalAfterDiscount + taxAmount;

  const generatePDF = (mode: 'download' | 'preview') => {
    const doc = new jsPDF();
    const formData = watch();

    // Add Logo
    const img = document.getElementById('logo-for-pdf') as HTMLImageElement;
    if (img) {
      doc.addImage(img, 'PNG', 14, 12, 30, 30);
    }
    
    // Company Info
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('eSystemLK', 150, 20);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Your Address, City, Sri Lanka', 150, 26);
    doc.text('Phone: +94 76 571 1396', 150, 31);
    doc.text('Website: www.esystemlk.xyz', 150, 36);
    doc.text('Email: contact@esystemlk.com', 150, 41);

    // Quotation Title
    doc.setFontSize(26);
    doc.setFont('helvetica', 'bold');
    doc.text('QUOTATION', 14, 60);

    // Client Info
    let yPos = 80;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Bill To:', 14, 75);
    doc.setFont('helvetica', 'normal');
    doc.text(formData.clientName, 14, yPos);
    yPos += 5;
    if(formData.companyName) {
        doc.text(formData.companyName, 14, yPos);
        yPos += 5;
    }
    if(formData.clientAddress) {
        doc.text(formData.clientAddress, 14, yPos);
        yPos += 5;
    }
    doc.text(formData.phoneNumber, 14, yPos);
    yPos += 5;
    if(formData.emailAddress) {
        doc.text(formData.emailAddress, 14, yPos);
    }

    // Quotation Info
    doc.setFont('helvetica', 'bold');
    doc.text('Quotation #:', 130, 75);
    doc.text('Date:', 130, 80);
    doc.text('Expiry Date:', 130, 85);
    doc.setFont('helvetica', 'normal');
    doc.text(formData.quotationNumber, 160, 75);
    doc.text(format(formData.date, 'PPP'), 160, 80);
    doc.text(format(formData.expiryDate, 'PPP'), 160, 85);
    
    // Items Table
    const tableColumn = ["#", "Description", "Qty", "Unit Price", "Total"];
    const tableRows = formData.items.map((item, index) => [
        index + 1,
        item.description,
        item.quantity.toString(),
        `Rs. ${Number(item.unitPrice || 0).toFixed(2)}`,
        `Rs. ${(Number(item.quantity || 0) * Number(item.unitPrice || 0)).toFixed(2)}`
    ]);

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 110,
        theme: 'striped',
        headStyles: { fillColor: [0, 87, 163] } // Royal Blue
    });
    
    // Pricing Summary
    let finalY = (doc as any).lastAutoTable.finalY;
    doc.setFontSize(12);
    const summaryX = 130;
    let summaryY = finalY + 15;
    
    doc.setFont('helvetica', 'bold');
    doc.text('Subtotal:', summaryX, summaryY);
    doc.text(`Discount (${formData.discount}%):`, summaryX, summaryY + 7);
    doc.text(`Tax (${formData.tax}%):`, summaryX, summaryY + 14);
    doc.setFontSize(14);
    doc.text('Total:', summaryX, summaryY + 24);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text(`Rs. ${subtotal.toFixed(2)}`, 195, summaryY, { align: 'right' });
    doc.text(`- Rs. ${discountAmount.toFixed(2)}`, 195, summaryY + 7, { align: 'right' });
    doc.text(`+ Rs. ${taxAmount.toFixed(2)}`, 195, summaryY + 14, { align: 'right' });
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`Rs. ${finalTotal.toFixed(2)}`, 195, summaryY + 24, { align: 'right' });

    finalY = summaryY + 24;

    // Optional Items Table
    if (formData.optionalItems.length > 0 && formData.optionalItems[0].description) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Optional Services / Add-ons', 14, finalY + 15);

        const optionalTableRows = formData.optionalItems.map((item, index) => [
            index + 1,
            item.description,
            item.quantity.toString(),
            `Rs. ${Number(item.unitPrice || 0).toFixed(2)}`,
            `Rs. ${(Number(item.quantity || 0) * Number(item.unitPrice || 0)).toFixed(2)}`
        ]);

        doc.autoTable({
            head: [tableColumn],
            body: optionalTableRows,
            startY: finalY + 20,
            theme: 'striped',
            headStyles: { fillColor: [80, 80, 80] } // Gray
        });

        const optionalFinalY = (doc as any).lastAutoTable.finalY;
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Optional Subtotal:', summaryX, optionalFinalY + 10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Rs. ${optionalSubtotal.toFixed(2)}`, 195, optionalFinalY + 10, { align: 'right' });
    }

    // Footer
    doc.setFontSize(10);
    doc.text("Thank you for your business!", 14, 280);
    doc.text("eSystemLK - Clarity in Code. Power in Design.", 105, 290, { align: 'center' });


    if (mode === 'preview') {
      doc.output('dataurlnewwindow');
    } else {
      doc.save(`Quotation-${formData.quotationNumber}.pdf`);
    }
  };

  if (!isClient) return null; // Render nothing on the server

  return (
    <form onSubmit={handleSubmit((data) => generatePDF('download'))}>
        <div style={{ display: 'none' }}>
            <Image id="logo-for-pdf" src="/logo.png" alt="logo" width={100} height={100} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Client & Quote Info */}
            <div className="lg:col-span-2 space-y-6">
                <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg">
                    <CardHeader><CardTitle>Client Information</CardTitle></CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-4">
                        <Input placeholder="Client Full Name" {...register('clientName')} required />
                        <Input placeholder="Company Name (Optional)" {...register('companyName')} />
                        <Input placeholder="Phone Number" {...register('phoneNumber')} required />
                        <Input type="email" placeholder="Email Address (Optional)" {...register('emailAddress')} />
                        <Textarea placeholder="Client Address (Optional)" {...register('clientAddress')} className="md:col-span-2" />
                    </CardContent>
                </Card>

                <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg">
                    <CardHeader><CardTitle>Quotation Details</CardTitle></CardHeader>
                    <CardContent className="grid md:grid-cols-3 gap-4">
                         <Input readOnly placeholder="Quotation Number" {...register('quotationNumber')} />
                         <Controller
                            control={control}
                            name="date"
                            render={({ field }) => (
                               <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant={"outline"} className={cn("justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent>
                            </Popover>
                            )}
                        />
                         <Controller
                            control={control}
                            name="expiryDate"
                            render={({ field }) => (
                               <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant={"outline"} className={cn("justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {field.value ? format(field.value, "PPP") : <span>Pick an expiry date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent>
                            </Popover>
                            )}
                        />
                    </CardContent>
                </Card>
            </div>

             {/* Right Column - Summary & Actions */}
            <div className="lg:col-span-1 space-y-6">
                 <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg">
                    <CardHeader><CardTitle>Summary & Actions</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center"><span className="text-muted-foreground">Subtotal</span><span className="font-semibold">Rs. {subtotal.toFixed(2)}</span></div>
                        <div className="flex justify-between items-center"><span className="text-muted-foreground">Discount Amount</span><span className="font-semibold">- Rs. {discountAmount.toFixed(2)}</span></div>
                        <div className="flex justify-between items-center"><span className="text-muted-foreground">Tax Amount</span><span className="font-semibold">+ Rs. {taxAmount.toFixed(2)}</span></div>
                        <div className="border-t border-white/20 my-2"></div>
                        <div className="flex justify-between items-center text-lg"><span className="font-bold">Total</span><span className="font-bold text-primary">Rs. {finalTotal.toFixed(2)}</span></div>
                         <div className="pt-4 space-y-2">
                           <Button type="button" variant="outline" className="w-full" onClick={() => generatePDF('preview')}><Eye className="mr-2 h-4 w-4" /> Preview PDF</Button>
                           <Button type="submit" className="w-full"><Download className="mr-2 h-4 w-4" /> Generate & Download PDF</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>

        {/* Items Table */}
        <div className="mt-8">
            <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg">
                <CardHeader>
                    <CardTitle>Products / Services</CardTitle>
                    <CardDescription>Add the main items for this quotation.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/20">
                                    <th className="text-left p-2">Description</th>
                                    <th className="text-left p-2 w-28">Quantity</th>
                                    <th className="text-left p-2 w-40">Unit Price (Rs)</th>
                                    <th className="text-left p-2 w-40">Line Total (Rs)</th>
                                    <th className="w-12 p-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {fields.map((item, index) => (
                                    <tr key={item.id} className="border-b border-white/10">
                                        <td><Input type="text" placeholder="Item Description" {...register(`items.${index}.description`)} className="my-1" required /></td>
                                        <td><Input type="number" {...register(`items.${index}.quantity`)} className="my-1" min="1" required /></td>
                                        <td><Input type="number" step="0.01" {...register(`items.${index}.unitPrice`)} className="my-1" min="0" required /></td>
                                        <td><Input readOnly value={(Number(watchedItems[index]?.quantity) || 0) * (Number(watchedItems[index]?.unitPrice) || 0)} className="my-1 bg-black/20" /></td>
                                        <td>
                                            <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Button type="button" variant="outline" onClick={() => append({ description: '', quantity: 1, unitPrice: 0 })} className="mt-4">
                        <Plus className="mr-2 h-4 w-4" /> Add Item
                    </Button>
                </CardContent>
            </Card>
        </div>
        
        {/* Optional Items Table */}
        <div className="mt-8">
            <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg">
                <CardHeader>
                    <CardTitle>Optional Services / Add-ons</CardTitle>
                    <CardDescription>Add any optional items for this quotation.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/20">
                                    <th className="text-left p-2">Description</th>
                                    <th className="text-left p-2 w-28">Quantity</th>
                                    <th className="text-left p-2 w-40">Unit Price (Rs)</th>
                                    <th className="text-left p-2 w-40">Line Total (Rs)</th>
                                    <th className="w-12 p-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {optionalFields.map((item, index) => (
                                    <tr key={item.id} className="border-b border-white/10">
                                        <td><Input type="text" placeholder="Optional Item Description" {...register(`optionalItems.${index}.description`)} className="my-1" /></td>
                                        <td><Input type="number" {...register(`optionalItems.${index}.quantity`)} className="my-1" min="1" /></td>
                                        <td><Input type="number" step="0.01" {...register(`optionalItems.${index}.unitPrice`)} className="my-1" min="0" /></td>
                                        <td><Input readOnly value={(Number(watchedOptionalItems[index]?.quantity) || 0) * (Number(watchedOptionalItems[index]?.unitPrice) || 0)} className="my-1 bg-black/20" /></td>
                                        <td>
                                            <Button type="button" variant="ghost" size="icon" onClick={() => removeOptional(index)}>
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Button type="button" variant="outline" onClick={() => appendOptional({ description: '', quantity: 1, unitPrice: 0 })} className="mt-4">
                        <Plus className="mr-2 h-4 w-4" /> Add Optional Item
                    </Button>
                </CardContent>
            </Card>
        </div>

        {/* Totals Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg md:col-start-3">
                 <CardHeader><CardTitle>Totals</CardTitle></CardHeader>
                 <CardContent className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Discount (%)</label>
                        <Input type="number" step="0.01" placeholder="e.g. 5" {...register('discount')} min="0" />
                    </div>
                    <div>
                         <label className="text-sm font-medium">Tax (%)</label>
                        <Input type="number" step="0.01" placeholder="e.g. 10" {...register('tax')} min="0" />
                    </div>
                 </CardContent>
            </Card>
        </div>
    </form>
  );
}
