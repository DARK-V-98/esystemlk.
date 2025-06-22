import MessagesClient from './messages-client';

export default function AdminMessagesPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl py-8 text-center mb-10">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Contact Messages</h1>
        <p className="text-white/80 md:text-xl mt-4 max-w-3xl mx-auto">
          Review and manage inquiries submitted through your website's contact form.
        </p>
      </div>

      <MessagesClient />
    </div>
  );
}
