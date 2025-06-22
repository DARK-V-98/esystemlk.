import PageManagementClient from './page-management-client';

export default function AdminPagesPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl py-8 text-center mb-10">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Page Management</h1>
        <p className="text-white/80 md:text-xl mt-4 max-w-3xl mx-auto">
          Enable or disable pages and sections across your website. Changes will be reflected in the navigation and on the homepage.
        </p>
      </div>

      <PageManagementClient />
    </div>
  );
}
