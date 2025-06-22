
import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
    const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <section className="w-full py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 text-center bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl py-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4">
            Last Updated: {lastUpdated}
          </p>
        </div>
      </section>
      
      <section className="w-full pb-20 md:pb-28">
        <div className="container mx-auto px-4 md:px-6">
            <Card className="bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl">
                <CardContent className="p-8 md:p-12 space-y-6 text-muted-foreground prose prose-invert prose-lg max-w-none">
                    <p>
                        ESystemLk ("us", "we", or "our") operates the ESystemLk website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data. We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.
                    </p>

                    <h2 className="font-headline text-2xl font-bold text-foreground pt-4">Information Collection and Use</h2>
                    <p>
                        We collect several different types of information for various purposes to provide and improve our Service to you.
                    </p>

                    <h3 className="font-headline text-xl font-bold text-foreground">Types of Data Collected</h3>
                    <h4>Personal Data</h4>
                    <p>
                        While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to: Email address, First name and last name, Phone number, Cookies and Usage Data.
                    </p>
                    
                    <h4>Usage Data</h4>
                    <p>
                        We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                    </p>

                    <h2 className="font-headline text-2xl font-bold text-foreground pt-4">Use of Data</h2>
                    <p>ESystemLk uses the collected data for various purposes:</p>
                    <ul>
                        <li>To provide and maintain the Service</li>
                        <li>To notify you about changes to our Service</li>
                        <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                        <li>To provide customer care and support</li>
                        <li>To provide analysis or valuable information so that we can improve the Service</li>
                        <li>To monitor the usage of the Service</li>
                        <li>To detect, prevent and address technical issues</li>
                    </ul>
                    
                    <h2 className="font-headline text-2xl font-bold text-foreground pt-4">Security of Data</h2>
                    <p>
                        The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                    </p>

                    <h2 className="font-headline text-2xl font-bold text-foreground pt-4">Changes to This Privacy Policy</h2>
                    <p>
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes.
                    </p>
                    
                    <h2 className="font-headline text-2xl font-bold text-foreground pt-4">Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us by visiting the contact page on our website.
                    </p>
                </CardContent>
            </Card>
        </div>
      </section>
    </>
  );
}
