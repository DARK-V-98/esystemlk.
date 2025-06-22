import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Linkedin, Twitter } from "lucide-react";

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    avatar: "https://placehold.co/150x150.png",
    hint: "professional portrait",
    bio: "Visionary leader with 15+ years in tech, driving innovation and strategic growth."
  },
  {
    name: "Samantha Lee",
    role: "Lead Developer",
    avatar: "https://placehold.co/150x150.png",
    hint: "woman developer",
    bio: "Expert full-stack developer specializing in scalable architectures and clean code."
  },
  {
    name: "Michael Chen",
    role: "Head of Product",
    avatar: "https://placehold.co/150x150.png",
    hint: "man designer",
    bio: "Passionate product strategist focused on creating user-centric and impactful solutions."
  },
  {
    name: "Emily Rodriguez",
    role: "UI/UX Design Lead",
    avatar: "https://placehold.co/150x150.png",
    hint: "creative artist",
    bio: "Creative designer with a keen eye for detail, crafting beautiful and intuitive user experiences."
  }
];

const values = [
    { title: "Innovation", description: "We constantly explore new technologies to deliver cutting-edge solutions." },
    { title: "Integrity", description: "We believe in transparent and honest collaboration with our clients." },
    { title: "Excellence", description: "We are committed to the highest standards of quality in everything we do." },
    { title: "Collaboration", description: "We work as a unified team with our clients to achieve shared goals." }
]

export default function AboutPage() {
  return (
    <>
      <section className="w-full py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 text-center bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl py-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">About ESystemLk</h1>
          <p className="max-w-[700px] mx-auto text-white/80 md:text-xl mt-4">
            We are a team of passionate developers, designers, and strategists dedicated to building the future of technology.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center p-8 md:p-12 rounded-3xl bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl">
                <div className="order-2 md:order-1">
                    <h2 className="font-headline text-3xl font-bold mb-4">Our Mission</h2>
                    <p className="text-muted-foreground mb-4">
                        Our mission is to empower businesses with transformative technology solutions that drive growth, efficiency, and innovation. We strive to be a trusted partner, turning complex challenges into elegant, scalable, and user-centric digital experiences.
                    </p>
                    <p className="text-muted-foreground">
                        We are committed to pushing the boundaries of what's possible, fostering a culture of continuous learning and collaboration to deliver exceptional value to our clients worldwide.
                    </p>
                </div>
                <div className="order-1 md:order-2">
                    <Image 
                        src="https://placehold.co/600x400.png"
                        alt="Our team collaborating"
                        width={600}
                        height={400}
                        className="rounded-2xl shadow-lg"
                        data-ai-hint="team collaboration"
                    />
                </div>
            </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
                <h2 className="font-headline text-3xl md:text-4xl font-bold">Our Core Values</h2>
                <p className="text-muted-foreground md:text-lg mt-2">The principles that guide our work and culture.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map(value => (
                    <Card key={value.title} className="text-center p-6 rounded-2xl shadow-lg bg-black/30 backdrop-blur-lg border border-white/10">
                       <h3 className="font-headline text-xl font-semibold mb-2">{value.title}</h3>
                       <p className="text-muted-foreground text-sm">{value.description}</p>
                    </Card>
                ))}
            </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Meet the Team</h2>
            <p className="text-muted-foreground md:text-lg mt-2">The experts behind our success.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center p-6 transition-transform duration-300 hover:-translate-y-2 bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg">
                <CardContent className="p-0">
                  <Avatar className="w-28 h-28 mx-auto mb-4 border-4 border-primary">
                    <AvatarImage src={member.avatar} alt={member.name} data-ai-hint={member.hint} />
                    <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-headline text-xl font-semibold">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                  <p className="text-muted-foreground text-sm mt-2 mb-4">{member.bio}</p>
                  <div className="flex justify-center gap-4">
                    <a href="#" className="text-muted-foreground hover:text-primary"><Twitter className="w-5 h-5" /></a>
                    <a href="#" className="text-muted-foreground hover:text-primary"><Linkedin className="w-5 h-5" /></a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
