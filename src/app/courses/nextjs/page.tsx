
'use client';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const courseModules = [
    { id: 'getting-started', title: 'Getting Started', description: 'Create a new Next.js application using the dashboard starter example and explore the project.' },
    { id: 'css-styling', title: 'CSS Styling', description: 'Style your Next.js application with Tailwind and CSS modules.' },
    { id: 'optimizing-fonts-and-images', title: 'Optimizing Fonts and Images', description: 'Optimize fonts and images with the Next.js built-in components.' },
    { id: 'creating-layouts-and-pages', title: 'Creating Layouts and Pages', description: 'Create the dashboard routes and a shared layout that can be shared between multiple pages.' },
    { id: 'navigating-between-pages', title: 'Navigating Between Pages', description: 'Learn how to use the <Link> component to navigate between pages.' },
    { id: 'setting-up-your-database', title: 'Setting Up Your Database', description: 'Setup a database for your application and seed it with initial data.' },
    { id: 'fetching-data', title: 'Fetching Data', description: 'Learn about the different ways to fetch data in Next.js, and fetch data for your dashboard page using Server Components.' },
    { id: 'static-and-dynamic-rendering', title: 'Static and Dynamic Rendering', description: 'Understand how rendering works in Next.js, and make your dashboard app dynamic.' },
    { id: 'streaming', title: 'Streaming', description: 'Improve your application\'s loading experience with streaming and loading skeletons.' },
    { id: 'adding-search-and-pagination', title: 'Adding Search and Pagination', description: 'Add search and pagination to your dashboard application using Next.js APIs.' },
    { id: 'mutating-data', title: 'Mutating Data', description: 'Mutate data using React Server Actions, and revalidate the Next.js cache.' },
    { id: 'handling-errors', title: 'Handling Errors', description: 'Handle errors gracefully with error.tsx and notFound.' },
    { id: 'improving-accessibility', title: 'Improving Accessibility', description: 'Implement server-side form validation and improve accessibility in your forms.' },
    { id: 'adding-authentication', title: 'Adding Authentication', description: 'Add authentication to protect your dashboard routes using NextAuth.js, Server Actions, and Proxy.' },
    { id: 'adding-metadata', title: 'Adding Metadata', description: 'Learn how to add metadata to your Next.js application.' },
    { id: 'next-steps', title: 'Next Steps', description: 'Next.js Dashboard Course Conclusion.' },
];

const CodeBlock = ({ code }: { code: string }) => (
    <pre className="bg-black/80 rounded-lg p-4 my-4 overflow-x-auto">
        <code className="text-sm font-mono text-white">{code.trim()}</code>
    </pre>
);

const NextJsCoursePage = () => {
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0px 0px -50% 0px" }
        );

        courseModules.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            courseModules.forEach(({ id }) => {
                const element = document.getElementById(id);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, []);
    return (
        <div className="container mx-auto px-4 md:px-6 py-20 md:py-28">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Next.js Foundations</h1>
                <p className="max-w-[700px] text-white/80 md:text-xl mt-4">
                    Learn how to build a full-stack web application with the free, Next.js Foundations course.
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-4 gap-12 mt-16 items-start">
                <aside className="lg:col-span-1 lg:sticky top-28 hidden lg:block">
                    <h3 className="font-headline text-xl font-semibold mb-4">Course Modules</h3>
                    <ul className="space-y-2">
                        {courseModules.map((module) => (
                            <li key={module.id}>
                                <a
                                    href={`#${module.id}`}
                                    className={`block p-2 rounded-md transition-colors text-sm ${
                                        activeId === module.id
                                            ? 'bg-primary/10 text-primary font-semibold'
                                            : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    {module.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </aside>

                <main className="lg:col-span-3 space-y-16">
                    {courseModules.map((module, index) => (
                        <motion.section
                            key={module.id}
                            id={module.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="bg-black/30 backdrop-blur-lg border border-white/10 rounded-3xl shadow-xl">
                                <CardHeader>
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center font-bold text-primary text-lg">
                                            {index + 1}
                                        </div>
                                        <CardTitle className="font-headline text-2xl md:text-3xl font-bold text-primary">{module.title}</CardTitle>
                                    </div>
                                    <p className="text-muted-foreground">{module.description}</p>
                                </CardHeader>
                                <CardContent className="prose prose-invert prose-lg max-w-none text-muted-foreground space-y-4">
                                   <CourseContent module={module.id} />
                                </CardContent>
                            </Card>
                        </motion.section>
                    ))}
                </main>
            </div>
        </div>
    );
};

const CourseContent = ({ module }: { module: string }) => {
    switch (module) {
        case 'getting-started':
            return (
                <>
                    <p>Welcome! To begin, open your terminal and run the following command to create a new Next.js app using the official dashboard starter template.</p>
                    <CodeBlock code={`npx create-next-app@latest nextjs-dashboard --use-npm --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example"`} />
                    <p>Once the installation is complete, navigate into your new project directory and start the development server:</p>
                    <CodeBlock code={`cd nextjs-dashboard\nnpm run dev`} />
                    <p>Open <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer">http://localhost:3000</a> in your browser. You should see the starter homepage. The project structure includes key folders like `app` for routing and `public` for static assets.</p>
                </>
            );
        case 'css-styling':
            return (
                <>
                    <p>Next.js offers multiple ways to style your application. This project uses Tailwind CSS, a utility-first CSS framework for rapid UI development.</p>
                    <p>You can style elements by adding Tailwind classes directly in your JSX. For example, to create a blue button:</p>
                    <CodeBlock code={`<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">\n  Click me\n</button>`} />
                    <p>For component-specific styles that don't leak into the global scope, you can use CSS Modules. Create a file named `MyComponent.module.css` and import it into your component:</p>
                    <CodeBlock code={`/* In MyComponent.module.css */\n.error {\n  color: red;\n}\n\n// In your component\nimport styles from './MyComponent.module.css';\n\n<p className={styles.error}>This is an error.</p>`} />
                </>
            );
        case 'optimizing-fonts-and-images':
            return (
                <>
                    <p>Next.js provides built-in components for optimizing fonts and images, which are crucial for good performance and Core Web Vitals.</p>
                    <h4>Fonts</h4>
                    <p>Use `next/font` to automatically host font files, preventing layout shifts and ensuring privacy.</p>
                    <CodeBlock code={`import { Inter } from 'next/font/google';\n\nconst inter = Inter({ subsets: ['latin'] });\n\nexport default function Layout({ children }) {\n  return (\n    <html lang="en" className={inter.className}>\n      <body>{children}</body>\n    </html>\n  );\n}`} />
                    <h4>Images</h4>
                    <p>The `next/image` component optimizes images by resizing, lazy-loading, and serving them in modern formats like WebP.</p>
                    <CodeBlock code={`import Image from 'next/image';\n\n<Image\n  src="/profile.png"\n  alt="My Profile Picture"\n  width={500}\n  height={500}\n/>`} />
                </>
            );
        case 'creating-layouts-and-pages':
            return (
                <>
                    <p>In the App Router, a **page** is UI that is unique to a route. You can create a page by exporting a component from a `page.tsx` file.</p>
                    <p>A **layout** is UI that is shared between multiple pages. Create a `layout.tsx` file to define a shared layout. It must accept a `children` prop that will be populated with a child layout or page.</p>
                    <CodeBlock code={`// app/dashboard/layout.tsx\n\nexport default function DashboardLayout({\n  children,\n}: { children: React.ReactNode }) {\n  return (\n    <section>\n      {/* Include shared UI here, e.g., a sidebar */}\n      <nav>Dashboard Sidebar</nav>\n      {children}\n    </section>\n  );\n}`} />
                    <p>Any pages inside the `app/dashboard` directory, like `app/dashboard/settings/page.tsx`, will automatically be wrapped with this layout.</p>
                </>
            );
        case 'navigating-between-pages':
            return (
                <>
                    <p>The `<Link>` component from `next/link` is used for client-side navigation between routes. It enables seamless transitions without a full page reload.</p>
                    <CodeBlock code={`import Link from 'next/link';\n \nexport default function Page() {\n  return (\n    <Link href="/dashboard">\n      Dashboard\n    </Link>\n  );\n}`} />
                    <p>The `usePathname()` hook can be used to check the current URL path and apply active styles to links.</p>
                     <CodeBlock code={`'use client';\n \nimport { usePathname } from 'next/navigation';\n \nconst pathname = usePathname(); // e.g., '/dashboard/invoices'\n \n<Link\n  className={clsx(\n    'p-2 rounded-md',\n    { 'bg-blue-500 text-white': pathname === '/dashboard' },\n  )}\n  href="/dashboard"\n>\n  Home\n</Link>`} />
                </>
            );
        case 'setting-up-your-database':
            return (
                <>
                    <p>For this course, we'll use Vercel Postgres, but you can use any PostgreSQL provider. After creating a database, you'll get a connection string.</p>
                    <p>Add the connection string to a `.env` file in the root of your project:</p>
                    <CodeBlock code={`POSTGRES_URL="postgres://..."`} />
                    <p>Next, install the Vercel Postgres SDK: `npm install @vercel/postgres`.</p>
                    <p>To seed your database with initial data, you can create a script. For example, `scripts/seed.js`:</p>
                    <CodeBlock code={`// scripts/seed.js\nconst { db } = require('@vercel/postgres');\n\nasync function main() {\n  const client = await db.connect();\n  // ... (CREATE TABLE and INSERT statements)\n  await client.end();\n}\n\nmain().catch((err) => console.error(err));`} />
                    <p>Run the script from your `package.json`: `"seed": "node -r dotenv/config ./scripts/seed.js"`.</p>
                </>
            );
        case 'fetching-data':
            return (
                <>
                    <p>In the App Router, React Server Components are the default. This allows you to fetch data directly within your components on the server.</p>
                    <p>You can fetch data at the component level, which is great for co-locating data fetching logic with the UI that uses it.</p>
                    <CodeBlock code={`// app/dashboard/page.tsx\n\nimport { fetchCardData } from '@/app/lib/data';\n \nexport default async function Page() {\n  const { \n    numberOfInvoices, \n    numberOfCustomers, \n    totalPaidInvoices, \n    totalPendingInvoices \n  } = await fetchCardData();\n \n  return (\n    <main>\n      {/* ... use the fetched data ... */}\n    </main>\n  );\n}`} />
                    <p>Next.js automatically deduplicates `fetch` requests. If you use a database client, you should manually cache your data fetches using `React.cache` to avoid re-fetching the same data in a single render pass.</p>
                </>
            );
        case 'static-and-dynamic-rendering':
            return (
                <>
                    <p>By default, Next.js will use **Static Rendering**. Routes are rendered at build time, making them fast, always available, and cachable.</p>
                    <p>You can opt into **Dynamic Rendering** when you have data that changes frequently. This renders the route for each user at request time.</p>
                    <p>Dynamic rendering is triggered by using dynamic functions like `cookies()`, `headers()`, or by using the `unstable_noStore` API.</p>
                     <CodeBlock code={`import { unstable_noStore as noStore } from 'next/cache';\n\nexport async function fetchInvoices() {\n  noStore(); // This opts the component into dynamic rendering\n  // ... data fetching logic ...\n}`} />
                </>
            );
        case 'streaming':
            return (
                <>
                    <p>Streaming allows you to break down the page into smaller chunks and progressively send them from the server to the client.</p>
                    <p>You can use React's `<Suspense>` boundary to stream a component. You provide a fallback UI (like a skeleton) to show while the component is loading.</p>
                    <CodeBlock code={`import { Suspense } from 'react';\nimport { RevenueChart } from '@/app/ui/dashboard/revenue-chart';\nimport { RevenueChartSkeleton } from '@/app/ui/skeletons';\n\n<Suspense fallback={<RevenueChartSkeleton />}>\n  <RevenueChart />\n</Suspense>`} />
                    <p>This improves user experience by showing content sooner, even if some parts of the page take longer to fetch or render.</p>
                </>
            );
        case 'adding-search-and-pagination':
            return (
                <>
                    <p>To implement search and pagination, you'll use URL search parameters to manage the state.</p>
                    <p>First, capture the user's input in a client component. Use the `useRouter` and `usePathname` hooks to update the URL with the search query.</p>
                    <CodeBlock code={`'use client';\n \nconst { replace } = useRouter();\nconst pathname = usePathname();\n \nfunction handleSearch(term: string) {\n  const params = new URLSearchParams(window.location.search);\n  if (term) {\n    params.set('query', term);\n  } else {\n    params.delete('query');\n  }\n  replace(\`$\{pathname\}?$\{params.toString()\}\`);\n}`} />
                    <p>On the server, in your page component, read the search params from the `searchParams` prop and pass them to your data fetching function.</p>
                    <CodeBlock code={`export default async function Page({ \n  searchParams \n}: { \n  searchParams?: { query?: string; page?: string; } \n}) {\n  const query = searchParams?.query || '';\n  const currentPage = Number(searchParams?.page) || 1;\n  const invoices = await fetchFilteredInvoices(query, currentPage);\n  // ...\n}`} />
                </>
            );
        case 'mutating-data':
            return (
                <>
                    <p>React **Server Actions** allow you to run asynchronous code directly on the server, triggered from client-side events. They eliminate the need to create separate API endpoints for data mutations.</p>
                    <p>Define a Server Action by adding the `'use server';` directive at the top of a function.</p>
                     <CodeBlock code={`'use server';\n \nimport { z } from 'zod';\nimport { sql } from '@vercel/postgres';\nimport { revalidatePath } from 'next/cache';\n \nexport async function createInvoice(formData: FormData) {\n  // ... (validate and process formData)\n \n  await sql\`INSERT INTO invoices ...\`;\n \n  revalidatePath('/dashboard/invoices'); // Revalidate the cache and show new data\n}`} />
                    <p>You can then call this action directly from a form's `action` attribute.</p>
                </>
            );
        case 'handling-errors':
            return (
                <>
                    <p>The `error.tsx` file convention allows you to gracefully handle unexpected runtime errors in nested routes. It automatically wraps a page or child layout in a React Error Boundary.</p>
                    <CodeBlock code={`'use client';\n \nexport default function Error({ error, reset }: {\n  error: Error & { digest?: string };\n  reset: () => void;\n}) {\n  return (\n    <main>\n      <h2>Something went wrong!</h2>\n      <button onClick={() => reset()}>Try again</button>\n    </main>\n  );\n}`} />
                    <p>The `notFound()` function can be used to handle "not found" states. If called inside a route segment, it will render the closest `not-found.tsx` file.</p>
                    <CodeBlock code={`import { notFound } from 'next/navigation';\n \nexport default async function Page({ params }: { params: { id: string } }) {\n  const invoice = await fetchInvoiceById(params.id);\n  if (!invoice) {\n    notFound();\n  }\n  // ...\n}`} />
                </>
            );
        case 'improving-accessibility':
            return (
                <>
                    <p>Web accessibility (a11y) is crucial for creating inclusive applications. Key practices include using semantic HTML, ensuring proper color contrast, and managing focus.</p>
                    <p>For forms, always associate labels with inputs using the `htmlFor` attribute. This helps screen readers announce what the input is for.</p>
                    <CodeBlock code={`<label htmlFor="amount">Choose an amount</label>\n<input id="amount" name="amount" type="number" />`} />
                    <p>When creating custom components, use ARIA (Accessible Rich Internet Applications) attributes to provide additional context to assistive technologies. For example, `aria-live="polite"` can be used to announce status updates.</p>
                </>
            );
        case 'adding-authentication':
            return (
                <>
                    <p>NextAuth.js is a complete open-source authentication solution for Next.js applications. To add it, install `next-auth`.</p>
                    <p>Configure your authentication providers (e.g., Google, GitHub, Credentials) in an API route at `app/api/auth/[...nextauth]/route.ts`.</p>
                    <CodeBlock code={`import NextAuth from 'next-auth';\nimport Credentials from 'next-auth/providers/credentials';\n\nexport const { auth, signIn, signOut } = NextAuth({\n  providers: [\n    Credentials({\n      // ... configure credentials provider\n    }),\n  ],\n});`} />
                    <p>You can protect routes by using middleware. Create a `middleware.ts` file in the root of your project to intercept requests and redirect unauthenticated users.</p>
                </>
            );
        case 'adding-metadata':
            return (
                <>
                    <p>Next.js has a Metadata API that allows you to define metadata (e.g., `title`, `description`) for each page, which is important for SEO.</p>
                    <p>You can export a static `metadata` object from a `layout.tsx` or `page.tsx` file.</p>
                    <CodeBlock code={`import { Metadata } from 'next';\n \nexport const metadata: Metadata = {\n  title: 'Invoices | Acme Dashboard',\n};`} />
                    <p>For dynamic routes, you can use the `generateMetadata` function to create metadata based on the current route parameters.</p>
                    <CodeBlock code={`export async function generateMetadata({ params }): Promise<Metadata> {\n  const invoice = await fetchInvoiceById(params.id);\n  return { title: \`Invoice # $\{invoice.id}\` };\n}`} />
                </>
            );
        case 'next-steps':
            return (
                <>
                    <p>Congratulations on completing the Next.js Foundations course! You've learned the core concepts of building a full-stack application with the App Router.</p>
                    <h4>Where to go from here?</h4>
                    <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Explore the Next.js Documentation:</strong> Dive deeper into advanced features like Parallel Routes, Intercepting Routes, and more.</li>
                        <li><strong>Build Your Own Project:</strong> The best way to learn is by doing. Start a personal project to apply and solidify your knowledge.</li>
                        <li><strong>Join the Community:</strong> Engage with other Next.js developers on GitHub, Discord, and Reddit.</li>
                    </ul>
                </>
            );
        default:
            return <p>Content for this module is coming soon!</p>;
    }
}


export default NextJsCoursePage;

