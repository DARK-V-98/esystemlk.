import { ContactForm } from "./contact-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageCircle, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <>
      <section className="w-full py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 text-center bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl py-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Get in Touch</h1>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4">
            We'd love to hear from you. Whether you have a question about our services or want to start a project, our team is ready to answer all your questions.
          </p>
        </div>
      </section>
      
      <section className="w-full pb-20 md:pb-28">
        <div className="container mx-auto px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12">
                <div>
                    <h2 className="font-headline text-3xl font-bold mb-6">Send us a message</h2>
                    <ContactForm />
                </div>
                <div className="space-y-8">
                    <h2 className="font-headline text-3xl font-bold">Contact Information</h2>
                    <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-md">
                        <CardContent className="p-6">
                            <a href="mailto:contact@esystemlk.com" className="flex items-center gap-4 group">
                                <Mail className="w-8 h-8 text-primary" />
                                <div>
                                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">Email</h3>
                                    <p className="text-muted-foreground">contact@esystemlk.com</p>
                                </div>
                            </a>
                        </CardContent>
                    </Card>
                     <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-md">
                        <CardContent className="p-6">
                            <a href="https://wa.me/94765711396" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                                <MessageCircle className="w-8 h-8 text-primary" />
                                <div>
                                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">WhatsApp</h3>
                                    <p className="text-muted-foreground">+94 76 571 1396</p>
                                </div>
                            </a>
                        </CardContent>
                    </Card>
                    <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-md">
                        <CardContent className="p-6">
                            <a href="tel:+94765711396" className="flex items-center gap-4 group">
                                <Phone className="w-8 h-8 text-primary" />
                                <div>
                                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">Phone</h3>
                                    <p className="text-muted-foreground">+94 76 571 1396</p>
                                </div>
                            </a>
                        </CardContent>
                    </Card>
                     <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-md">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <MapPin className="w-8 h-8 text-primary" />
                                <div>
                                    <h3 className="font-semibold text-lg">Office</h3>
                                    <p className="text-muted-foreground">123 Tech Avenue, Silicon Valley, CA 94043</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
      </section>
    </>
  );
}
