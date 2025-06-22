"use client";

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type Message = {
    id: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    createdAt: Timestamp;
    read: boolean;
};

function formatTimestamp(timestamp: Timestamp | null | undefined): string {
    if (!timestamp) return 'No date';
    return new Date(timestamp.seconds * 1000).toLocaleString();
}

export default function MessagesClient() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const messagesCollection = collection(db, 'messages');
        const q = query(messagesCollection, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const messagesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Message));
            setMessages(messagesData);
            setIsLoading(false);
        }, (error) => {
            console.error("Error fetching messages: ", error);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (isLoading) {
        return (
             <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <Card key={i} className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg">
                        <CardHeader>
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2 mt-2" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-10 w-full" />
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }
    
    if (messages.length === 0) {
        return (
            <div className="text-center py-16 bg-black/30 backdrop-blur-lg border border-white/10 rounded-3xl">
                <h3 className="font-headline text-2xl font-bold">No Messages Yet</h3>
                <p className="text-muted-foreground mt-2">When someone contacts you, their message will appear here.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <Accordion type="single" collapsible className="w-full space-y-4">
                 {messages.map((msg) => (
                    <AccordionItem key={msg.id} value={msg.id} className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg px-6">
                        <AccordionTrigger className="hover:no-underline">
                            <div className="flex flex-col sm:flex-row justify-between w-full items-start sm:items-center gap-2">
                                <div className="text-left">
                                    <p className="font-semibold">{msg.subject}</p>
                                    <p className="text-sm text-muted-foreground">{`From: ${msg.name} (${msg.email})`}</p>
                                </div>
                                <div className="flex items-center gap-4 self-end sm:self-center">
                                     {!msg.read && <Badge>New</Badge>}
                                     <span className="text-xs text-muted-foreground">{formatTimestamp(msg.createdAt)}</span>
                                </div>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                           <div className="space-y-4 pt-4 border-t border-white/10">
                                <p><strong>From:</strong> {msg.name}</p>
                                <p><strong>Email:</strong> {msg.email}</p>
                                {msg.phone && <p><strong>Phone:</strong> {msg.phone}</p>}
                                <p className="text-muted-foreground whitespace-pre-wrap p-4 bg-black/20 rounded-md">{msg.message}</p>
                           </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
