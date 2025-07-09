
import PortfolioClient from './portfolio-client';
import type { PortfolioItem } from './portfolio-client';

const projects: PortfolioItem[] = [
  {
    id: '1',
    name: 'Fly Cargo Lanka',
    link: 'https://www.flycargolanka.lk',
    imageUrl: '/fly.png',
    hint: 'cargo logistics',
  },
  {
    id: '2',
    name: 'Aarya Hardware',
    link: 'https://www.aaryahardware.lk',
    imageUrl: '/ar.png',
    hint: 'hardware store',
  },
  {
    id: '3',
    name: 'Big Costa Construction Pvt Ltd',
    link: 'https://www.bigcosta.lk',
    imageUrl: '/bg.png',
    hint: 'construction company',
  },
  {
    id: '4',
    name: 'ESystemLK POS System - Rental',
    link: '/contact',
    description: 'Monthly First Payment: Rs. 5,000 | Monthly Rental: Rs. 3,000. Get started with our flexible POS solution.',
  },
  {
    id: '5',
    name: 'ESystemLK POS System - Lifetime',
    link: '/contact',
    description: 'Starting from Rs. 50,000. A one-time payment for a powerful, customizable POS system with various add-ons.',
  },
];


export default async function PortfolioPage() {
  return (
    <>
      <section className="w-full py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 text-center bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl py-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Our Work</h1>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4">
            Explore a selection of projects and services that showcase our technical expertise and commitment to quality.
          </p>
        </div>
      </section>
      
      <section className="w-full pb-20 md:pb-28">
        <div className="container mx-auto px-4 md:px-6">
          <PortfolioClient projects={projects} />
        </div>
      </section>
    </>
  );
}
