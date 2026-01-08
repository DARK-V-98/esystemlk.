
'use client';

import { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addDemoDesign, deleteDemoDesign, type DemoDesign } from './actions';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image as ImageIcon, Plus, Trash2, Link as LinkIcon, Loader2, ChevronsUpDown, Check, X } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Image from 'next/image';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const designSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  demoUrl: z.string().url('Please enter a valid URL'),
  category: z.string().min(1, 'Category is required'),
  technologies: z.array(z.string()).min(1, "At least one technology is required."),
  image: z.instanceof(File).refine(file => file.size > 0, 'An image is required.'),
});

const allTechnologies = [
    "HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "Angular",
    "Node.js", "Python", "PHP", "Java", "Ruby on Rails", "Go", "Firebase", "Supabase",
    "PostgreSQL", "MySQL", "MongoDB", "Tailwind CSS", "Bootstrap", "Framer Motion", "GraphQL", "REST API"
];

export default function DemoDesignsManagementClient({ initialDesigns }: { initialDesigns: DemoDesign[] }) {
  const [designs, setDesigns] = useState<DemoDesign[]>(initialDesigns);
  const [itemToDelete, setItemToDelete] = useState<DemoDesign | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [techPopoverOpen, setTechPopoverOpen] = useState(false);

  useEffect(() => {
    setDesigns(initialDesigns);
  }, [initialDesigns]);

  const form = useForm<z.infer<typeof designSchema>>({
    resolver: zodResolver(designSchema),
    defaultValues: {
      name: '',
      demoUrl: '',
      category: '',
      technologies: [],
      image: new File([], ''),
    },
  });
  
  const imageFile = form.watch('image');
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (imageFile && imageFile.size > 0) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(imageFile);
    } else {
      setPreview(null);
    }
  }, [imageFile]);

  const onSubmit = (values: z.infer<typeof designSchema>) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('demoUrl', values.demoUrl);
    formData.append('category', values.category);
    formData.append('technologies', JSON.stringify(values.technologies));
    formData.append('image', values.image);

    startTransition(async () => {
      const result = await addDemoDesign(formData);
      if (result.success) {
        toast({ title: 'Success', description: result.message });
        form.reset();
        setPreview(null);
      } else {
        toast({ title: 'Error', description: result.message, variant: 'destructive' });
      }
    });
  };

  const handleDelete = () => {
    if (!itemToDelete) return;
    startTransition(async () => {
        const result = await deleteDemoDesign(itemToDelete.id, itemToDelete.imageUrl);
         if (result.success) {
            toast({ title: 'Success', description: result.message });
            setDesigns(prevDesigns => prevDesigns.filter(d => d.id !== itemToDelete.id));
        } else {
            toast({ title: 'Error', description: result.message, variant: 'destructive' });
        }
        setItemToDelete(null);
    });
  };
  
  const selectedTechs = form.watch('technologies');

  return (
    <AlertDialog>
    <div className="space-y-8">
      <Card className="bg-card border-border rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle>Add New Demo Design</CardTitle>
          <CardDescription>Fill out the form to add a new project to your demo gallery.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel>Project Name</FormLabel><FormControl><Input placeholder="e.g., Modern Portfolio" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="category" render={({ field }) => (
                        <FormItem><FormLabel>Category</FormLabel><FormControl><Input placeholder="e.g., Portfolio, Hotel" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                <FormField control={form.control} name="demoUrl" render={({ field }) => (
                    <FormItem><FormLabel>Demo Link</FormLabel><FormControl><Input placeholder="https://example.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />

                <FormField control={form.control} name="technologies" render={({ field }) => (
                    <FormItem className="flex flex-col"><FormLabel>Technologies</FormLabel>
                        <Popover open={techPopoverOpen} onOpenChange={setTechPopoverOpen}>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button variant="outline" role="combobox" className={cn("w-full justify-between h-auto", !field.value.length && "text-muted-foreground")}>
                                        <div className="flex gap-1 flex-wrap">
                                            {field.value.length > 0 ? field.value.map(tech => (
                                                <Badge key={tech} variant="secondary">{tech}</Badge>
                                            )) : "Select technologies"}
                                        </div>
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                <Command>
                                    <CommandInput placeholder="Search or create technology..." />
                                    <CommandList>
                                        <CommandEmpty>No results found.</CommandEmpty>
                                        <CommandGroup>
                                            {allTechnologies.map(tech => (
                                                <CommandItem key={tech} onSelect={() => {
                                                    const newValue = field.value.includes(tech) ? field.value.filter(t => t !== tech) : [...field.value, tech];
                                                    field.onChange(newValue);
                                                }}>
                                                    <Check className={cn("mr-2 h-4 w-4", field.value.includes(tech) ? "opacity-100" : "opacity-0")} />
                                                    {tech}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                )} />

               <FormField control={form.control} name="image" render={({ field }) => (
                  <FormItem><FormLabel>Project Image</FormLabel><FormControl><Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files?.[0])} /></FormControl><FormMessage /></FormItem>
                )} />
               {preview && (
                <div className="mt-4"><p className="text-sm font-medium mb-2">Image Preview:</p><Image src={preview} alt="Image preview" width={200} height={150} className="rounded-lg border border-border" /></div>
              )}
              <Button type="submit" disabled={isPending}>{isPending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding...</> : <><Plus className="mr-2 h-4 w-4" /> Add Demo Design</>}</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card className="bg-card border-border rounded-2xl shadow-lg">
        <CardHeader><CardTitle>Current Demo Designs</CardTitle><CardDescription>The designs currently displayed on your demo page.</CardDescription></CardHeader>
        <CardContent>
           {designs.length === 0 ? (<div className="text-center py-10 text-muted-foreground">No designs added yet.</div>) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {designs.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                       <Image src={item.imageUrl} alt={item.name} width={400} height={300} className="w-full h-40 object-cover" />
                       <CardContent className="p-4">
                           <h3 className="font-semibold truncate">{item.name}</h3>
                           <a href={item.demoUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline break-all flex items-center gap-1">
                               <LinkIcon size={12}/>{item.demoUrl}
                           </a>
                            <div className="flex flex-wrap gap-1 mt-2">
                                {item.technologies.map(tech => (
                                    <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                                ))}
                            </div>
                           <AlertDialogTrigger asChild>
                             <Button variant="destructive" size="sm" className="w-full mt-4" onClick={() => setItemToDelete(item)}><Trash2 className="mr-2 h-4 w-4" /> Delete</Button>
                           </AlertDialogTrigger>
                       </CardContent>
                    </Card>
                ))}
             </div>
           )}
        </CardContent>
      </Card>
    </div>
     <AlertDialogContent>
        <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone. This will permanently delete the demo design.</AlertDialogDescription></AlertDialogHeader>
        <AlertDialogFooter><AlertDialogCancel onClick={() => setItemToDelete(null)}>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleDelete} disabled={isPending}>{isPending ? 'Deleting...' : 'Continue'}</AlertDialogAction></AlertDialogFooter>
    </AlertDialogContent>
    </AlertDialog>
  );
}
