import { Card, CardContent } from "@/components/ui/card";
import { CodeXml, DatabaseZap, LayoutDashboard, Truck, CreditCard, Server } from 'lucide-react';

const services = [
  {
    icon: <CodeXml className="w-12 h-12 text-primary" />,
    title: "Custom Web Development",
    description: "We build bespoke, high-performance websites and web applications from the ground up, ensuring they are perfectly tailored to your business objectives and brand identity."
  },
  {
    icon: <DatabaseZap className="w-12 h-12 text-primary" />,
    title: "Firebase & Backend Solutions",
    description: "Leverage the power of Firebase and modern backends for robust, scalable server-side solutions, database design, and API development for your applications."
  },
  {
    icon: <LayoutDashboard className="w-12 h-12 text-primary" />,
    title: "Admin Panels & Dashboards",
    description: "Manage your business effectively with custom-built admin panels and data dashboards. We create intuitive interfaces to monitor and control your operations with ease."
  },
  {
    icon: <Truck className="w-12 h-12 text-primary" />,
    title: "Courier/Logistics Systems",
    description: "Streamline your delivery operations with our specialized courier and logistics software. We develop systems for tracking, dispatch, and management to enhance efficiency."
  },
  {
    icon: <CreditCard className="w-12 h-12 text-primary" />,
    title: "Payment Integration (PayHere/IPG)",
    description: "Seamlessly integrate local and international payment gateways like PayHere and IPG, providing your customers with secure and convenient payment options."
  },
  {
    icon: <Server className="w-12 h-12 text-primary" />,
    title: "Hosting & Maintenance",
    description: "Ensure your application is always online and performing at its best with our reliable hosting and ongoing maintenance services. We handle the technical details for you."
  }
];

export default function ServicesPage() {
  return (
    <>
      <section className="w-full py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 text-center bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl py-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Our Services</h1>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4">
            We provide a comprehensive suite of technology services to fuel your success.
          </p>
        </div>
      </section>

      <section className="w-full pb-20 md:pb-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Card key={service.title} className="transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-black/30 backdrop-blur-lg border border-white/10 hover:border-white/30 rounded-2xl shadow-lg group">
                <CardContent className="p-8">
                  <div className="mb-6 transition-transform duration-300 group-hover:scale-110 w-fit">{service.icon}</div>
                  <h3 className="font-headline text-2xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
