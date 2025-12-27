
import PortfolioManagementClient from './portfolio-management-client';
import { getPortfolioItems } from './actions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AdminPortfolioPage() {
  // This is a temporary workaround to fetch data in a Server Component
  // and pass it to a Client Component. In a real app, you might use a library
  // or a different pattern. This is a simplified approach.
  const promise = getPortfolioItems();
  const [initialItems] = React.use(promise);


  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl py-8 text-center mb-10">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Portfolio Management</h1>
        <p className="text-white/80 md:text-xl mt-4 max-w-3xl mx-auto">
          Add, view, and remove projects from your portfolio showcase.
        </p>
      </div>

       <div className="mb-8">
        <Button asChild variant="outline">
            <Link href="/admin">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
            </Link>
        </Button>
      </div>

      <PortfolioManagementClient initialItems={initialItems} />
    </div>
  );
}
