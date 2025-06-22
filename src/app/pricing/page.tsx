import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";

const pricingPlans = [
  {
    name: "Basic Website",
    price: "25,000+",
    currency: "LKR",
    description: "Perfect for personal portfolios, blogs, and small business profiles.",
    features: [
      "Up to 5 Pages",
      "Responsive Design",
      "Contact Form Integration",
      "Basic SEO Setup",
      "Social Media Links",
    ],
    cta: "Get Started",
    href: "/contact"
  },
  {
    name: "Business Pro",
    price: "75,000+",
    currency: "LKR",
    description: "Ideal for growing businesses, e-commerce stores, and startups.",
    features: [
      "Everything in Basic Plan",
      "E-commerce Functionality",
      "Content Management System (CMS)",
      "Payment Gateway Integration",
      "Admin Panel / Dashboard",
    ],
    cta: "Choose Plan",
    href: "/contact",
    popular: true,
  },
  {
    name: "Enterprise Solution",
    price: "Custom",
    currency: "",
    description: "Tailor-made solutions for large-scale applications and unique requirements.",
    features: [
      "Everything in Business Pro Plan",
      "Custom Backend & API Development",
      "Advanced Logistics/Courier Systems",
      "Scalable Cloud Architecture",
      "Dedicated Hosting & Maintenance",
      "Priority Support",
    ],
    cta: "Contact Us",
    href: "/contact"
  }
];

export default function PricingPage() {
  return (
    <>
      <section className="w-full py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 text-center bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl py-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Flexible Pricing Plans</h1>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4">
            Choose a plan that fits your needs. All our plans are transparent, with no hidden fees.
          </p>
        </div>
      </section>

      <section className="w-full pb-20 md:pb-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {pricingPlans.map((plan) => (
              <Card key={plan.name} className={`flex flex-col bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-2 ${plan.popular ? 'border-primary/50' : ''}`}>
                {plan.popular && (
                  <div className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider text-center py-1 rounded-t-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader className="p-6">
                  <CardTitle className="font-headline text-2xl font-bold">{plan.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.currency && <span className="text-muted-foreground ml-1">{plan.currency}</span>}
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary shrink-0 mt-1" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="p-6 mt-auto">
                  <Button asChild size="lg" className={`w-full rounded-full ${plan.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-white text-black hover:bg-white/90'}`}>
                    <Link href={plan.href}>{plan.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
