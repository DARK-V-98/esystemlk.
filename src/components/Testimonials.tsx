import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Kasun Perera",
    role: "CEO, TechVentures LK",
    content: "esystemlk transformed our business with a stunning website and custom CRM. Their lifetime support is unmatched. Highly recommended!",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=11",
  },
  {
    name: "Dilani Fernando",
    role: "Founder, StyleBoutique",
    content: "Amazing e-commerce solution! Our online sales increased by 300% after launching. The team is responsive and professional.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Ruwan Silva",
    role: "Director, SilvaExports",
    content: "The inventory management system they built saved us countless hours. Clean code, great design, and excellent support.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Nimali Jayawardena",
    role: "Owner, GreenLeaf Cafe",
    content: "Beautiful website at an affordable price. They even helped with SEO. Now customers find us easily online!",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=9",
  },
  {
    name: "Ashan Bandara",
    role: "Manager, AutoParts LK",
    content: "Professional team, excellent communication. Our web app handles thousands of orders smoothly. Best investment we made!",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=8",
  },
  {
    name: "Chamari Wijesinghe",
    role: "CEO, EduLearn Academy",
    content: "They built our complete learning management system from scratch. Students love the intuitive interface!",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=23",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6 animate-fade-in opacity-0">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium text-primary">Client Reviews</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in opacity-0 animation-delay-100">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground animate-fade-in opacity-0 animation-delay-200">
            Don't just take our word for it. Here's what businesses across Sri Lanka say about working with us.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={`group relative bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-500 hover:shadow-red animate-fade-in opacity-0`}
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Quote className="w-5 h-5 text-primary" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>

              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
