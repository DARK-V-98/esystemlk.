import { Cpu, Database } from "lucide-react";

const technologies = [
  {
    name: "React",
    icon: (
      <svg
        className="w-8 h-8 text-[#61DAFB]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-11.5 -10.23174 23 20.46348"
      >
        <title>React Logo</title>
        <circle cx="0" cy="0" r="2.05" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
    category: "Frontend",
  },
  {
    name: "Next.js",
    icon: (
      <svg
        className="w-8 h-8"
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="64" cy="64" r="64" fill="black" />
        <path
          d="M34.6471 103V25H47.4471V88.4118L88.2353 25H101L55.8235 76.2353L103 103H89.4118L47.4471 44.1765V103H34.6471Z"
          fill="white"
        />
      </svg>
    ),
    category: "Framework",
  },
  {
    name: "TypeScript",
    icon: (
      <svg
        className="w-8 h-8"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M42 42H6V6H42V42Z"
          fill="#3178C6"
          stroke="#3178C6"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path
          d="M14 14.0001L14 34.0001L34 34.0001"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M34 19V14H14"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    category: "Language",
  },
  {
    name: "Node.js",
    icon: (
        <svg className="w-8 h-8" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#8CC84B" d="M128 0l123.11 71.082v142.164L128 256l-123.11-42.754V71.082z"/>
            <path fill="#73A43B" d="M128 0l123.11 71.082v142.164L128 256z"/>
            <path fill="#43853D" d="M128 256l-123.11-42.754V71.082L128 0z"/>
            <path fill="#68A03E" d="M128 0v256l123.11-42.754V71.082z"/>
            <g fill="#fff"><path d="M127.132 208.389c-2.146 0-3.834-1.688-3.834-3.834V52.016c0-2.146 1.688-3.834 3.834-3.834h2.146c2.146 0 3.834 1.688 3.834 3.834v152.539c0 2.146-1.688 3.834-3.834 3.834h-2.146z"/><path d="M127.132 208.389c-2.146 0-3.834-1.688-3.834-3.834V52.016c0-2.146 1.688-3.834 3.834-3.834h2.146c2.146 0 3.834 1.688 3.834 3.834v152.539c0 2.146-1.688 3.834-3.834 3.834h-2.146z"/><path d="M192.052 165.733c-2.023 0-3.65-1.565-3.65-3.588V94.426c0-2.023 1.627-3.588 3.65-3.588h2.023c2.023 0 3.65 1.565 3.65 3.588v67.719c0 2.023-1.627 3.588-3.65 3.588h-2.023z"/><path d="M64.358 165.733c-2.023 0-3.65-1.565-3.65-3.588V94.426c0-2.023 1.627-3.588 3.65-3.588h2.023c2.023 0 3.65 1.565 3.65 3.588v67.719c0 2.023-1.627 3.588-3.65 3.588h-2.023z"/></g>
        </svg>
    ),
    category: "Backend",
  },
   {
    name: "Tailwind CSS",
    icon: (
      <svg
        className="w-8 h-8"
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M256 256C256 322.018 202.018 376 136 376C69.9822 376 16 322.018 16 256C16 189.982 69.9822 136 136 136C202.018 136 256 189.982 256 256ZM148.917 236.425C158.077 227.265 178.697 227.265 187.857 236.425C197.018 245.585 197.018 266.205 187.857 275.365C178.697 284.525 158.077 284.525 148.917 275.365C139.757 266.205 139.757 245.585 148.917 236.425Z"
          fill="#38BDF8"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M376 256C376 322.018 322.018 376 256 376C189.982 376 136 322.018 136 256C136 189.982 189.982 136 256 136C322.018 136 376 189.982 376 256ZM268.917 236.425C278.077 227.265 298.697 227.265 307.857 236.425C317.018 245.585 317.018 266.205 307.857 275.365C298.697 284.525 278.077 284.525 268.917 275.365C259.757 266.205 259.757 245.585 268.917 236.425Z"
          fill="#38BDF8"
        />
      </svg>
    ),
    category: "Styling",
  },
  {
    name: "MongoDB",
    icon: (
      <svg
        className="w-8 h-8"
        viewBox="0 0 256 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M165.458 251.785C165.458 251.785 152.92 144.135 112.518 116.485C92.316 102.66 76.549 97.435 59.513 119.493C34.218 149.778 35.487 251.785 35.487 251.785H165.458Z"
          fill="#41A139"
        />
        <path
          d="M165.458 251.785S152.92 144.135 112.518 116.485C92.316 102.66 76.549 97.435 59.513 119.493C34.218 149.778 35.487 251.785 35.487 251.785"
          fill="#4DB33D"
        />
        <path
          d="M90.34 3.419C90.34 3.419 102.878 111.069 143.28 138.719C163.482 152.544 179.249 157.769 196.285 135.711C221.58 105.426 220.311 3.419 220.311 3.419H90.34Z"
          fill="#41A139"
        />
        <path
          d="M90.34 3.419S102.878 111.069 143.28 138.719C163.482 152.544 179.249 157.769 196.285 135.711C221.58 105.426 220.311 3.419 220.311 3.419"
          fill="#4DB33D"
        />
        <path
          d="M127.9 127.602C130.697 127.602 132.96 125.339 132.96 122.542C132.96 119.745 130.697 117.482 127.9 117.482C125.103 117.482 122.84 119.745 122.84 122.542C122.84 125.339 125.103 127.602 127.9 127.602Z"
          fill="#F1F1F1"
        />
      </svg>
    ),
    category: "Database",
  },
  {
    name: "PostgreSQL",
    icon: (
      <svg
        className="w-8 h-8"
        viewBox="0 0 256 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M128 251.139c27.11 0 52.8-6.195 75.3-17.777V189.6c-21.75 8.7-46.74 13.565-75.3 13.565s-53.55-4.865-75.3-13.565v43.762C75.2 244.944 100.89 251.14 128 251.14Z"
          fill="#336791"
        />
        <path
          d="M203.3 177.56V132.1c-21.75 8.7-46.74 13.565-75.3 13.565s-53.55-4.865-75.3-13.565v45.46c0 30.015 33.69 54.349 75.3 54.349s75.3-24.334 75.3-54.349Z"
          fill="#336791"
        />
        <path
          d="M203.3 119.982V74.522C203.3 44.507 169.61 20.173 128 20.173S52.7 44.507 52.7 74.522v45.46c21.75-8.7 46.74-13.564 75.3-13.564s53.55 4.864 75.3 13.564Z"
          fill="#336791"
        />
        <path
          d="M128 20.173c-41.61 0-75.3 24.334-75.3 54.35 0 27.87 30.15 50.849 69.45 53.974l5.85.375 5.85-.375c39.3-3.125 69.45-26.103 69.45-53.974 0-30.016-33.69-54.35-75.3-54.35Z"
          fill="#fff"
        />
      </svg>
    ),
    category: "Database",
  },
  {
    name: "Firebase",
    icon: (
      <svg
        className="w-8 h-8"
        viewBox="0 0 256 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M49.33 195.833l13.926-80.49-43.25-26.836z" fill="#F57C00" />
        <path d="M128 41.666l-23.21 113.674 23.21 23.209 75.29-136.883z" fill="#FFCA28" />
        <path d="m20.006 88.507 107.994-46.841-23.21 113.674-98.71-39.99z" fill="#FFA000" />
        <path d="M49.33 195.833l78.67 58.5-78.67-107.323z" fill="#F57C00" />
      </svg>
    ),
    category: "Database",
  },
  {
    name: "Docker",
    icon: (
      <svg
        className="w-8 h-8"
        viewBox="0 0 256 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M241.97 122.422c-7.614-2.825-17.07-2.093-24.81-2.093-3.138 0-6.15-.314-9.01-.813v-27.1c0-3.363-2.912-6.088-6.494-6.088h-19.48c-3.582 0-6.494 2.725-6.494 6.088v-19.48c0-3.363-2.912-6.088-6.494-6.088h-19.48c-3.582 0-6.494 2.725-6.494 6.088h-6.493c-3.582 0-6.494 2.725-6.494 6.088v-13.01c0-3.363-2.912-6.088-6.494-6.088H90.87c-3.582 0-6.494 2.725-6.494 6.088v-6.494c0-3.363-2.912-6.088-6.494-6.088H58.402c-3.582 0-6.494 2.725-6.494 6.088v25.975H45.414c-3.582 0-6.494 2.725-6.494 6.088v19.48c0 3.363-2.912 6.088-6.494 6.088H13.11c-3.582 0-6.494 2.725-6.494 6.088v35.31c0 24.32 18.06 44.417 41.52 47.78 4.09.588 8.285.922 12.56.922 13.91 0 26.684-4.83 36.31-13.018 7.37-6.288 12.3-15.42 13.41-25.592.083-1.045.15-2.093.15-3.138 0-21.71-17.65-39.36-39.36-39.36-4.52 0-8.835.75-12.875 2.15-1.06.36-2.15.686-3.216.98-.314.09-.658.15-.97.24-.314.09-.627.21-.94.3-.22.06-.39.12-.6.18-.588.18-1.15.39-1.71.62-1.12.42-2.21 1-3.27 1.5-.18.09-.36.18-.53.27-1.03.56-2.03 1.18-3 1.83-3.61 2.44-7.46 3.48-11.43 3.48-13.88 0-25.14-11.26-25.14-25.138 0-1.89.21-3.723.6-5.494 4.54-20.59 22.84-35.49 45.49-35.49 24.96 0 45.24 20.28 45.24 45.24 0 .45-.03.9-.06 1.35.03-.45.06-.9.06-1.35 0-28.51-23.15-51.66-51.66-51.66-28.51 0-51.66 23.15-51.66 51.66 0 10.96 3.42 21.09 9.33 29.43 14.37 20.3 39.52 32.95 67.5 32.95 19.33 0 37.13-5.94 51.52-16.12 3.81-2.7 7.28-5.78 10.37-9.13 14.8-15.98 23.49-37.03 23.49-59.51v-14.73c.001-8.547-6.84-15.534-15.35-15.717z"
          fill="#2496ED"
        />
      </svg>
    ),
    category: "DevOps",
  },
  {
    name: "AWS",
    icon: (
      <svg
        className="w-8 h-8 text-[#FF9900]"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.634 15.437c-1.144 1.25-2.922 1.5-4.303 1.054-1.296-.42-2.18-1.57-2.39-2.798-.073-.42.277-.8.708-.8h.276c.394 0 .73.303.79.69.176.99 1.15 1.745 2.186 1.745.98 0 1.95-.73 2.21-1.742.26-1.02-1.37-1.42-2.52-1.76-1.81-.54-3.87-1.2-3.87-3.41 0-1.74 1.48-3.08 3.51-3.08 1.43 0 2.76.62 3.54 1.5.317.37.225.96-.213 1.17l-.23.107c-.36.162-.81.04-1.03-.31-.31-.5-.87-.85-1.5-.85-.79 0-1.44.45-1.63.9-.19.45.34 1.05 2.45 1.63 2.11.58 4.22 1.63 4.22 4.14 0 1.9-1.58 3.43-3.77 3.43zM21.6 6.323c-.39-.08-1.04-.15-1.04.5v9.554c0 .65.65.58 1.04.5s1.04.15 1.04-.5V6.823c0-.65-.65-.58-1.04-.5zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
      </svg>
    ),
    category: "Cloud",
  },
  {
    name: "Figma",
    icon: (
      <svg
        className="w-8 h-8"
        viewBox="0 0 256 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M128 251.14c27.11 0 52.8-6.195 75.3-17.777V189.6c-21.75 8.7-46.74 13.565-75.3 13.565s-53.55-4.865-75.3-13.565v43.762C75.2 244.944 100.89 251.14 128 251.14Z" fill="#F24E1E" />
        <path d="M203.3 177.56V132.1c-21.75 8.7-46.74 13.565-75.3 13.565s-53.55-4.865-75.3-13.565v45.46c0 30.015 33.69 54.349 75.3 54.349s75.3-24.334 75.3-54.349Z" fill="#FF7262" />
        <path d="M203.3 119.982V74.522C203.3 44.507 169.61 20.173 128 20.173S52.7 44.507 52.7 74.522v45.46c21.75-8.7 46.74-13.564 75.3-13.564s53.55 4.864 75.3 13.564Z" fill="#A259FF" />
        <path d="M128 20.173c-41.61 0-75.3 24.334-75.3 54.35 0 30.015 33.69 54.349 75.3 54.349s75.3-24.334 75.3-54.349C203.3 44.507 169.61 20.173 128 20.173Z" fill="#1ABCFE" />
        <path d="M128 145.665c-30.87 0-55.89-24.976-55.89-55.845 0-30.87 25.02-55.845 55.89-55.845 30.87 0 55.89 24.975 55.89 55.845s-25.02 55.845-55.89 55.845Z" fill="#0ACF83" />
      </svg>
    ),
    category: "Design",
  },
  {
    name: "WordPress",
    icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.79 12.5c-.17.07-.35.1-.53.1-.32 0-.6-.1-.83-.31l-2-2.15c-.41.36-.88.68-1.42.97l.7 2.45c.16.54-.15.93-.7.93-.03 0-.07 0-.1 0-.6-.07-1.02-.57-.86-1.12l-.01-.02.7-2.45-1.57.53c-1.1.35-2.22.18-3.21-.5-.59-.41-1.03-.96-1.28-1.61-.41-1.07.13-2.25 1.2-2.88.24-.13.5-.24.78-.32l5.73-1.63c.46-.13.8.2.67.66l-1.3 4.54c.48-.22.92-.51 1.28-.88l2.2 2.1c.45.45.39 1.15-.14 1.53zM8.34 9.38c-.35 0-.64.28-.64.63 0 .35.29.63.64.63.35 0 .64-.28.64-.63s-.28-.63-.64-.63zm2.53.81c-.38 0-.68.3-.68.68 0 .37.3.68.68.68.37 0 .68-.3.68-.68 0-.37-.31-.68-.68-.68zm2.53.81c-.41 0-.75.33-.75.75s.34.75.75.75.75-.34.75-.75-.33-.75-.75-.75z" fill="#21759B"/>
        </svg>
    ),
    category: "CMS"
  },
  {
    name: "SQL",
    icon: <Database className="w-8 h-8 text-blue-500" />,
    category: "Database",
  },
  {
    name: "Vite",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.012 2.187L2.438 12l9.574 9.813L21.586 12L12.012 2.187zm0 0L7.225 12l4.787 4.906L16.8 12L12.012 2.187z" fill="url(#vite-gradient)"/>
        <defs>
          <linearGradient id="vite-gradient" x1="7.225" y1="2.187" x2="16.8" y2="16.906" gradientUnits="userSpaceOnUse">
            <stop stopColor="#41D1FF"/>
            <stop offset="1" stopColor="#BD34FE"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    category: "Build Tool",
  },
];

const TechStack = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-6 animate-fade-in opacity-0">
            <Cpu className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Tech Stack</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fade-in opacity-0 animation-delay-100">
            Built with Modern Technology
          </h2>
          <p className="text-lg text-muted-foreground animate-fade-in opacity-0 animation-delay-200">
            We use cutting-edge technologies to build fast, secure, and
            scalable solutions for your business.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {technologies.map((tech, index) => (
            <div
              key={tech.name}
              className={`group relative bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-all duration-500 hover:shadow-red hover:-translate-y-1 animate-fade-in opacity-0`}
              style={{ animationDelay: `${(index + 3) * 50}ms` }}
            >
              {/* Icon */}
              <div className="text-3xl mb-3 flex justify-center items-center h-8 group-hover:scale-110 transition-transform duration-300">
                {tech.icon}
              </div>

              {/* Name */}
              <div className="font-semibold text-foreground text-sm mb-1 group-hover:text-primary transition-colors">
                {tech.name}
              </div>

              {/* Category */}
              <div className="text-xs text-muted-foreground">
                {tech.category}
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <p className="text-center text-muted-foreground mt-12 animate-fade-in opacity-0 animation-delay-700">
          And many more! We choose the best tools for each project based on
          your specific requirements.
        </p>
      </div>
    </section>
  );
};

export default TechStack;
