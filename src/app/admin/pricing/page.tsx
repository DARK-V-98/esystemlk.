import PricingManagementClient from './pricing-management-client';

export default function AdminPricingPage() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <div className="bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl py-8 text-center mb-10">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Pricing Management</h1>
        <p className="text-white/80 md:text-xl mt-4 max-w-3xl mx-auto">
            Manage your service pricing, packages, and add-ons. Initialize, update, or disable pricing tiers from this central hub.
        </p>
      </div>

      <PricingManagementClient />
    </div>
  );
}
