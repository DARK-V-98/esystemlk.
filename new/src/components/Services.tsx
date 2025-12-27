import { 
  Globe, 
  Code2, 
  Smartphone, 
  Server, 
  ShoppingCart, 
  FileCode,
  Palette,
  Database,
  ArrowRight
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Business Websites",
    description: "Professional, responsive websites tailored for corporate and business needs with SEO optimization.",
    features: ["Responsive Design", "SEO Ready", "Fast Loading"],
  },
  {
    icon: Code2,
    title: "Web Applications",
    description: "Custom web apps with powerful functionality, user authentication, and real-time features.",
    features: ["Custom Features", "User Dashboard", "API Integration"],
  },
  {
    icon: Server,
    title: "Software Systems",
    description: "Complete software solutions including inventory, CRM, ERP, and management systems.",
    features: ["Custom Solutions", "Scalable", "Secure"],
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description: "Online stores with payment gateways, inventory management, and order tracking.",
    features: ["Payment Gateway", "Product Management", "Order Tracking"],
  },
  {
    icon: Smartphone,
    title: "Progressive Web Apps",
    description: "Mobile-first web apps that work offline and provide native-like experiences.",
    features: ["Offline Support", "Push Notifications", "App-like UX"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, user-centric designs that enhance engagement and conversions.",
    features: ["Modern Design", "User Research", "Prototyping"],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6 animate-fade-in opacity-0">
            <Code2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Our Services</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in opacity-0 animation-delay-100">
            Complete Digital Solutions
          </h2>
          <p className="text-lg text-muted-foreground animate-fade-in opacity-0 animation-delay-200">
            From simple websites to complex software systems, we deliver high-quality solutions 
            that drive your business forward.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group relative bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-500 hover:shadow-red animate-fade-in opacity-0`}
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-red">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-foreground border border-border"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Link */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-primary font-medium group/link"
              >
                Learn More
                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </a>

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
