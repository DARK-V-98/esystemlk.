import { 
  Shield, 
  Clock, 
  Headphones, 
  Award, 
  Zap, 
  Heart,
  RefreshCw,
  Users
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Lifetime Free Maintenance",
    description: "We manage and maintain your website for free, forever. No hidden costs, no recurring fees.",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "Quick turnaround times without compromising on quality. Get your project done on schedule.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our dedicated support team is always ready to help you with any issues or questions.",
  },
  {
    icon: Award,
    title: "Quality Guaranteed",
    description: "We ensure every project meets the highest standards of quality and performance.",
  },
  {
    icon: Zap,
    title: "Modern Technology",
    description: "We use the latest technologies and best practices to build fast, secure solutions.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Your satisfaction is our priority. We work closely with you to exceed expectations.",
  },
  {
    icon: RefreshCw,
    title: "Free Updates",
    description: "Regular updates and improvements to keep your website or app running smoothly.",
  },
  {
    icon: Users,
    title: "Dedicated Team",
    description: "A team of experienced developers and designers committed to your success.",
  },
];

const WhyUs = () => {
  return (
    <section id="why-us" className="py-24 bg-accent text-accent-foreground relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-primary/10 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/50 bg-primary/10 mb-6 animate-fade-in opacity-0">
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Why Choose Us</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in opacity-0 animation-delay-100">
            What Makes Us <span className="text-primary">Different</span>
          </h2>
          <p className="text-lg text-accent-foreground/70 animate-fade-in opacity-0 animation-delay-200">
            We're not just another software company. We're your technology partner committed to your long-term success.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group relative p-6 rounded-2xl border border-accent-foreground/10 bg-accent-foreground/5 hover:bg-primary/10 hover:border-primary/30 transition-all duration-500 animate-fade-in opacity-0`}
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-accent-foreground/70 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-16 border-t border-accent-foreground/10">
          {[
            { value: "100+", label: "Happy Clients" },
            { value: "150+", label: "Projects Completed" },
            { value: "5+", label: "Years Experience" },
            { value: "24/7", label: "Support Available" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center animate-fade-in opacity-0`}
              style={{ animationDelay: `${(index + 11) * 100}ms` }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-accent-foreground/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
