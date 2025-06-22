import PortfolioClient from './portfolio-client';

export default function PortfolioPage() {
  return (
    <>
      <section className="w-full py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Our Work</h1>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4">
            Explore a selection of projects that showcase our technical expertise and commitment to quality.
          </p>
        </div>
      </section>
      
      <section className="w-full pb-20 md:pb-28">
        <div className="container mx-auto px-4 md:px-6">
          <PortfolioClient />
        </div>
      </section>
    </>
  );
}
