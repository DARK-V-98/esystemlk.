
import { Card, CardContent } from "@/components/ui/card";

export default function TermsOfServicePage() {
    const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <section className="w-full py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 text-center bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl py-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Terms of Service</h1>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>
      
      <section className="w-full pb-20 md:pb-28">
        <div className="container mx-auto px-4 md:px-6">
            <Card className="bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl">
                <CardContent className="p-8 md:p-12 space-y-6 text-muted-foreground prose prose-invert prose-lg max-w-none">
                    <h2 className="font-headline text-2xl font-bold text-foreground">1. Agreement to Terms</h2>
                    <p>
                        By using our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We may modify these terms at any time, and such modifications will be effective immediately upon posting.
                    </p>
                    
                    <h2 className="font-headline text-2xl font-bold text-foreground pt-4">2. User Accounts</h2>
                    <p>
                        To access some features of the service, you may be required to create an account. You are responsible for safeguarding your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                    </p>

                    <h2 className="font-headline text-2xl font-bold text-foreground pt-4">3. Intellectual Property</h2>
                    <p>
                        The Service and its original content, features, and functionality are and will remain the exclusive property of ESystemLk and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of ESystemLk.
                    </p>

                    <h2 className="font-headline text-2xl font-bold text-foreground pt-4">4. Prohibited Activities</h2>
                    <p>You agree not to engage in any of the following prohibited activities:</p>
                    <ul>
                        <li>Copying, distributing, or disclosing any part of the service in any medium.</li>
                        <li>Using any automated system, including "robots," "spiders," "offline readers," etc., to access the service.</li>
                        <li>Transmitting spam, chain letters, or other unsolicited email.</li>
                        <li>Attempting to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers running the service.</li>
                    </ul>

                    <h2 className="font-headline text-2xl font-bold text-foreground pt-4">5. Termination</h2>
                    <p>
                        We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                    </p>
                    
                    <h2 className="font-headline text-2xl font-bold text-foreground pt-4">6. Limitation of Liability</h2>
                    <p>
                        In no event shall ESystemLk, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
                    </p>
                    
                    <h2 className="font-headline text-2xl font-bold text-foreground pt-4">7. Governing Law</h2>
                    <p>
                        These Terms shall be governed and construed in accordance with the laws of Sri Lanka, without regard to its conflict of law provisions.
                    </p>

                    <h2 className="font-headline text-2xl font-bold text-foreground pt-4">Contact Us</h2>
                    <p>
                        If you have any questions about these Terms, please contact us.
                    </p>
                </CardContent>
            </Card>
        </div>
      </section>
    </>
  );
}
