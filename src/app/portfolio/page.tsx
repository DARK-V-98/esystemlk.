
import PortfolioClient from './portfolio-client';
import type { PortfolioItem } from './portfolio-client';

const projects: PortfolioItem[] = [
  {
    id: '1',
    name: 'Zenith E-commerce Platform',
    link: 'https://example.com',
    imageUrl: 'https://placehold.co/600x400.png',
    hint: 'modern ecommerce',
  },
  {
    id: '2',
    name: 'Innovate AI Dashboard',
    link: 'https://example.com',
    imageUrl: 'https://placehold.co/600x400.png',
    hint: 'data dashboard',
  },
  {
    id: '3',
    name: 'Future-Forward Landing Page',
    link: 'https://example.com',
    imageUrl: 'https://placehold.co/600x400.png',
    hint: 'website design',
  },
  {
    id: '4',
    name: 'Creative Co. Portfolio',
    link: 'https://example.com',
    imageUrl: 'https://placehold.co/600x400.png',
    hint: 'creative portfolio',
  },
  {
    id: '5',
    name: 'Global Net Mobile App',
    link: 'https://example.com',
    imageUrl: 'https://placehold.co/600x400.png',
    hint: 'mobile application',
  },
  {
    id: '6',
    name: 'Fusion Marketing Campaign',
    link: 'https://example.com',
    imageUrl: 'https://placehold.co/600x400.png',
    hint: 'marketing website',
  },
];


export default async function PortfolioPage() {
  return (
    <>
      <section className="w-full py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6 text-center bg-black/30 backdrop-blur-lg border border-white/10 shadow-2xl rounded-3xl py-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Our Work</h1>
          <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl mt-4">
            Explore a selection of projects that showcase our technical expertise and commitment to quality.
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
