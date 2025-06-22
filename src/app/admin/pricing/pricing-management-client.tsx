
"use client";

import React, { useState, useEffect, useTransition } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { updatePricingDocStatus, uploadPricingData, deletePricingDoc, updateServiceStatus, deleteServiceFromCategory } from './actions';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import * as Icons from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

// Define types for better readability
type Tier = { name: string; price: string };
type Addon = { name: string; price: string };
type Service = { name: string; tiers: Tier[]; addons?: Addon[]; enabled: boolean };
type PricingCategory = {
    id: string;
    icon: keyof typeof Icons;
    category: string;
    services: Service[];
    enabled: boolean;
};
type CommonAddons = {
    id: string;
    icon: keyof typeof Icons;
    category: string;
    items: Addon[];
    enabled: boolean;
};

// Generic Icon component
const Icon = ({ name, className }: { name: keyof typeof Icons; className?: string }) => {
    const LucideIcon = Icons[name] as React.ElementType;
    if (!LucideIcon) return <Icons.Package className={className} />;
    return <LucideIcon className={className} />;
};

export default function PricingManagementClient() {
    const [pricingData, setPricingData] = useState<(PricingCategory | CommonAddons)[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();
    const [itemToDelete, setItemToDelete] = useState<{ type: 'category' | 'service'; categoryId: string; serviceName?: string } | null>(null);

    useEffect(() => {
        const q = query(collection(db, 'pricing'), orderBy('order'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as (PricingCategory | CommonAddons)[];
            setPricingData(data);
            setIsLoading(false);
        }, (error) => {
            console.error("Error fetching pricing data:", error);
            toast({ title: "Error", description: "Could not fetch pricing data.", variant: "destructive" });
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, [toast]);

    const handleUpload = () => {
        startTransition(async () => {
            const result = await uploadPricingData();
            toast({
                title: result.success ? 'Success' : 'Error',
                description: result.message,
                variant: result.success ? 'default' : 'destructive',
            });
        });
    };
    
    const handleStatusChange = (type: 'category' | 'service', id: string, status: boolean, serviceName?: string) => {
        startTransition(async () => {
            let result;
            if (type === 'category') {
                result = await updatePricingDocStatus(id, status);
            } else if (type === 'service' && serviceName) {
                result = await updateServiceStatus(id, serviceName, status);
            }
            toast({
                title: result?.success ? 'Success' : 'Error',
                description: result?.message,
                variant: result?.success ? 'default' : 'destructive',
            });
        });
    };
    
    const handleDelete = () => {
        if (!itemToDelete) return;
        
        startTransition(async () => {
            let result;
            if (itemToDelete.type === 'category') {
                result = await deletePricingDoc(itemToDelete.categoryId);
            } else if (itemToDelete.type === 'service' && itemToDelete.serviceName) {
                result = await deleteServiceFromCategory(itemToDelete.categoryId, itemToDelete.serviceName);
            }
            toast({
                title: result?.success ? 'Success' : 'Error',
                description: result?.message,
                variant: result?.success ? 'default' : 'destructive',
            });
            setItemToDelete(null);
        });
    };


    const renderSkeleton = () => (
        <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
        </div>
    );

    return (
        <AlertDialog>
            <div className="space-y-8">
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the selected item from the database.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setItemToDelete(null)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} disabled={isPending}>
                            {isPending ? 'Deleting...' : 'Continue'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>

                <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg">
                    <CardHeader>
                        <CardTitle>Database Management</CardTitle>
                        <CardDescription>
                            Use this to perform a one-time upload of the default pricing structure into the database. This will overwrite existing data.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={handleUpload} disabled={isPending}>
                            {isPending ? 'Uploading...' : 'Initialize/Upload Pricing Data'}
                        </Button>
                    </CardContent>
                </Card>

                {isLoading ? renderSkeleton() : (
                    <div className="space-y-6">
                        {pricingData.map((category) => (
                            <Card key={category.id} className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg overflow-hidden">
                                <CardHeader className="flex flex-row items-center justify-between bg-black/20 p-6">
                                    <div className="flex items-center gap-4">
                                        <Icon name={category.icon} className="w-8 h-8 text-primary" />
                                        <CardTitle className="text-2xl font-headline">{category.category}</CardTitle>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Switch checked={category.enabled} onCheckedChange={(checked) => handleStatusChange('category', category.id, checked)} disabled={isPending} />
                                        <AlertDialogTrigger asChild>
                                            <Button variant="ghost" size="sm" onClick={() => setItemToDelete({ type: 'category', categoryId: category.id })} disabled={isPending}>
                                                <Icons.Trash2 className="w-4 h-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <Button variant="ghost" size="sm" disabled><Icons.FileEdit className="w-4 h-4" /></Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    {'services' in category ? (
                                        <Accordion type="single" collapsible className="w-full">
                                            {category.services.map((service, index) => (
                                                <AccordionItem key={index} value={`item-${index}`}>
                                                    <div className="flex items-center w-full">
                                                        <AccordionTrigger className="flex-1 hover:no-underline pr-4">
                                                            <span className="font-semibold text-lg text-left text-primary/90">{service.name}</span>
                                                        </AccordionTrigger>
                                                        <div className="flex items-center gap-2">
                                                            <Switch checked={service.enabled} onCheckedChange={(checked) => handleStatusChange('service', category.id, checked, service.name)} disabled={isPending} />
                                                            <AlertDialogTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setItemToDelete({ type: 'service', categoryId: category.id, serviceName: service.name })} disabled={isPending}>
                                                                    <Icons.Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8" disabled><Icons.FileEdit className="w-4 h-4" /></Button>
                                                        </div>
                                                    </div>
                                                    <AccordionContent className="pl-4 border-l-2 border-primary/20 ml-2">
                                                        <div className="space-y-3">
                                                            <h4 className="font-semibold mt-2">Tiers</h4>
                                                            {service.tiers.map((tier, tIndex) => (
                                                                <div key={tIndex} className="flex justify-between items-center text-sm text-muted-foreground p-2 rounded-md hover:bg-white/5">
                                                                    <span>{tier.name}</span>
                                                                    <span className="font-mono text-foreground">{tier.price}</span>
                                                                </div>
                                                            ))}
                                                            {service.addons && service.addons.length > 0 && (
                                                                <>
                                                                    <h4 className="font-semibold mt-4">Add-ons</h4>
                                                                    {service.addons.map((addon, aIndex) => (
                                                                        <div key={aIndex} className="flex justify-between items-center text-sm text-muted-foreground p-2 rounded-md hover:bg-white/5">
                                                                            <span>{addon.name}</span>
                                                                            <span className="font-mono text-foreground">{addon.price}</span>
                                                                        </div>
                                                                    ))}
                                                                </>
                                                            )}
                                                        </div>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    ) : (
                                        <div className="space-y-3">
                                            {category.items.map((item, index) => (
                                                <div key={index} className="flex justify-between items-center text-sm text-muted-foreground p-2 rounded-md hover:bg-white/5">
                                                    <span>{item.name}</span>
                                                    <span className="font-mono text-foreground">{item.price}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AlertDialog>
    );
}
