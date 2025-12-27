
import ToolsClient from './tools-client';

export default function ToolsPage() {
  return (
    <>
      <section className="w-full py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="inline-block bg-primary/10 text-primary rounded-full px-4 py-1 text-sm font-medium mb-4">
                Productivity Suite
            </div>
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Developer Tools Suite</h1>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4">
            A suite of fast, free, and secure tools that run 100% inside your browser. No uploads, no waiting.
          </p>
        </div>
      </section>
      
      <section className="w-full pb-20 md:pb-28">
        <div className="container mx-auto px-4 md:px-6">
          <ToolsClient />
        </div>
      </section>
    </>
  );
}
