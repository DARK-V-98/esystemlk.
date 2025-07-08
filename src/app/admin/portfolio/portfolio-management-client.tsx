"use client";

import { useState, useTransition, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addPortfolioItem, deletePortfolioItem, type PortfolioItem } from './actions';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import Image from 'next/image';
import { Trash2, UploadCloud } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: "Project name is required." }),
  link: z.string().url({ message: "Please enter a valid URL." }),
  image: z.instanceof(File, { message: "Image is required." }).refine(file => file.size > 0, "Image is required."),
});

export default function PortfolioManagementClient({ initialItems }: { initialItems: PortfolioItem[] }) {
    const [items, setItems] = useState<PortfolioItem[]>(initialItems);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();
    const formRef = useRef<HTMLFormElement>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: "", link: "" },
    });

    function onSubmit() {
        startTransition(async () => {
            if (!formRef.current) return;
            const formData = new FormData(formRef.current);
            const result = await addPortfolioItem(formData);
            
            toast({
                title: result.success ? 'Success' : 'Error',
                description: result.message,
                variant: result.success ? 'default' : 'destructive',
            });

            if (result.success) {
                form.reset();
                formRef.current?.reset();
                 // You might need to refresh the page to see the new item, 
                 // as server-side revalidation won't update this client component's state automatically.
            }
        });
    }

    const handleDelete = (id: string, imageUrl: string) => {
        startTransition(async () => {
            const result = await deletePortfolioItem(id, imageUrl);
            toast({
                title: result.success ? 'Success' : 'Error',
                description: result.message,
                variant: result.success ? 'default' : 'destructive',
            });
             if (result.success) {
                setItems(prevItems => prevItems.filter(item => item.id !== id));
            }
        });
    };

    return (
        <div className="space-y-8">
            <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg">
                <CardHeader>
                    <CardTitle>Add New Project</CardTitle>
                    <CardDescription>Upload a project image, name, and link to add it to your portfolio.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g., Zenith E-commerce" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="link"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Project Link</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="image"
                                render={({ field: { onChange, value, ...rest }}) => (
                                    <FormItem>
                                        <FormLabel>Project Image</FormLabel>
                                        <FormControl>
                                            <Input type="file" accept="image/*" onChange={(e) => onChange(e.target.files?.[0])} {...rest} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isPending}>
                                {isPending ? 'Uploading...' : <><UploadCloud className="mr-2 h-4 w-4" /> Add Project</>}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg">
                 <CardHeader>
                    <CardTitle>Current Portfolio</CardTitle>
                    <CardDescription>Manage your existing portfolio projects.</CardDescription>
                </CardHeader>
                <CardContent>
                    {items.length === 0 ? (
                        <p className="text-muted-foreground text-center">No portfolio items yet. Add one above to get started.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {items.map(item => (
                                <Card key={item.id} className="relative group overflow-hidden bg-black/20 border-white/10">
                                    <Image src={item.imageUrl} alt={item.name} width={400} height={300} className="object-cover w-full h-48" />
                                    <div className="p-4">
                                        <h3 className="font-semibold truncate">{item.name}</h3>
                                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline truncate block">
                                            {item.link}
                                        </a>
                                    </div>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This will permanently delete "{item.name}" from your portfolio and storage. This action cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleDelete(item.id, item.imageUrl)} disabled={isPending}>
                                                    {isPending ? 'Deleting...' : 'Delete'}
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </Card>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
