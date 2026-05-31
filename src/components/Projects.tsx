import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, ExternalLink, FolderKanban, X } from 'lucide-react';
import TiltCard from './TiltCard';
import Magnetic from './Magnetic';

interface TeamMember {
  name: string;
  role: string;
  pitch: string;
  achievements: string[];
  tech: string[];
}

interface Project {
  title: string;
  category: string;
  description: string;
  features: string[];
  challenges: string;
  image: string;
  github: string;
  live: string;
  tags: string[];
  accent: string;
  teamContributions?: TeamMember[];
}

const projects: Project[] = [
  {
    title: "LoadLink",
    category: "Smart Logistics Platform",
    description: "Solved a real-world logistics problem by enabling smart matching of trucks and loads to reduce empty return journeys.",
    features: ["Real-time Matching", "Live Location Tracking", "Automated Billing & Invoices", "Interactive Chat Support"],
    challenges: "Optimizing the matching algorithm to consider geographical routes dynamically while reducing database write overhead from live location polling.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com/Denil980",
    live: "https://load-link-tdyw.vercel.app",
    tags: ["MERN", "Socket.io", "MongoDB"],
    accent: "from-blue-600 to-indigo-600"
  },
  {
    title: "Event Management System",
    category: "Web Application",
    description: "A smart event scheduler with notification support for managing and tracking upcoming events.",
    features: ["OAuth Authentication", "Google Calendar Sync", "Automated Email Reminders", "Dynamic Dashboard Analytics"],
    challenges: "Implementing synchronized task scheduling across multiple user timezone configurations without server drift.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com/Denil980",
    live: "https://example.com",
    tags: ["MERN", "Tailwind", "Node"],
    accent: "from-purple-600 to-pink-600"
  },
  {
    title: "LandLedger+",
    category: "Digital Land Document Manager",
    description: "Created a digital system to store and retrieve land documents, replacing paper-based processes and reducing manual effort.",
    features: ["Document Encryption", "IPFS Decentralized Storage", "Audit Logging", "Quick QR Verification"],
    challenges: "Maintaining instant read retrieval speeds for high-resolution scanned document files stored on a distributed peer network.",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com/Denil980",
    live: "https://land-ledgerind.vercel.app/",
    tags: ["HTML", "CSS", "JavaScript"],
    accent: "from-emerald-600 to-teal-600"
  },
  {
    title: "Casa Design",
    category: "Cinematic 3D Experience",
    description: "A premium, cinematic digital experience designed for a luxury architectural studio, blending immersive 3D ThreeJS/R3F scenes, fluid scroll-motion GSAP timelines, and a local Retrieval-Augmented Generation (RAG) AI chatbot.",
    features: [
      "Interactive preloader showcasing 3D chair and floating dust particle simulations",
      "Locked viewport GSAP timeline (120fps scroll camera & typography animations)",
      "Contextual RAG chatbot powered by Groq API (Llama 3.1) and custom PDF parsing",
      "Secure Resend API email dispatch with honeypot spam protection & form validation"
    ],
    challenges: "Synchronizing 120fps GSAP narrative scroll timelines with React Three Fiber WebGL canvas renders, and designing a secure local Node/Express server for PDF parsing, text chunking, and keyword RAG search.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800",
    github: "https://github.com/Denil980",
    live: "https://casadesignluxury.vercel.app/",
    tags: ["React 19", "Three.js (R3F)", "GSAP", "Groq API", "Node.js", "Resend API"],
    accent: "from-[#A68A64] to-amber-700",
    teamContributions: [
      {
        name: "Denil (Me)",
        role: "Intelligent AI Systems & Backend Engineering",
        pitch: "Developed the local backend server, setting up the custom AI Concierge chatbot using Groq API (Llama 3.1) and building the secure Resend email dispatch integration.",
        achievements: [
          "Contextual RAG Chatbot: Developed a Retrieval-Augmented Generation (RAG) system that loads local PDF documents, breaks them into searchable text chunks, and feeds relevant context to the LLM to answer user queries with 100% precision.",
          "API Server Architecture: Engineered a Node.js Express server to handle real-time chat requests and serve secure inquiries.",
          "Secure Inquiry Delivery: Integrated the third-party Resend API to capture contact form inquiries, format them in rich HTML, and deliver them to the studio email inbox.",
          "System Security & Anti-Spam: Integrated a secure honeypot form field to instantly block bot-generated spam submissions and managed environment variables securely."
        ],
        tech: ["Node.js", "Express.js", "Groq API (Llama 3.1)", "Resend API", "PDF-Parse"]
      },
      {
        name: "Mathew",
        role: "UX/UI Motion & 3D WebGL Engineering",
        pitch: "Built the high-performance visual engine, bringing the website to life with smooth scroll-motion timelines and interactive 3D WebGL canvases.",
        achievements: [
          "3D WebGL Integration: Created React Three Fiber (R3F) scenes to render and control high-quality 3D assets (the floating chair, the flying sofa, and particle background simulations) at high frame rates.",
          "Cinematic Timeline Systems: Engineered a synchronized 120fps GSAP narrative timeline that controls 3D camera angles and typography reveal sequences as the user scrolls.",
          "Fluid Smooth Scrolling: Integrated Lenis smooth scroll controls and synchronized them directly with GSAP's requestAnimationFrame (rAF) ticker loop.",
          "Premium Micro-interactions: Built custom shaders, liquid-image hover transitions, custom cursors, and magnet-snapping stabilizers."
        ],
        tech: ["React 19", "Three.js", "React Three Fiber (R3F)", "GSAP (GreenSock)", "Lenis Scroll"]
      },
      {
        name: "Emil",
        role: "UX/UI Design Architecture & Interactive Prototyping",
        pitch: "Designed the structural blueprint, wireframes, and design guidelines, ensuring the site is accessible, mobile-responsive, optimized for search engines, and lightning-fast.",
        achievements: [
          "Design System & Typography: Standardized deep neutral charcoal backdrops, luxury warm bronze/gold accents (#A68A64), and premium fonts (Playfair Display and Inter) inside CSS variables.",
          "Information Architecture & User Flow: Paced the sections structurally (Hero ➔ Vision/Mission ➔ Stats ➔ Services ➔ Portfolio ➔ AI Chatbot ➔ Contact) to ensure an intuitive and engaging user experience.",
          "Accessibility & Responsiveness: Built responsive layout parameters to ensure perfect display on smartphones and implemented WCAG contrast controls, focus trapping, and semantic HTML elements.",
          "SEO & Performance Optimization: Configured metadata tags, JSON-LD schemas, Vite bundle-splitting, and asset lazy-loading, securing a near-perfect Google Lighthouse audit score."
        ],
        tech: ["CSS Variables", "Semantic HTML5", "ARIA Standards", "Vite/Rollup", "Lighthouse"]
      }
    ]
  }
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-20 md:py-40">
      <div className="container-custom">
        <div className="flex flex-col items-center mb-16 md:mb-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 mb-6"
          >
            <FolderKanban size={24} />
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-black tracking-tight"
          >
            Featured Work
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {projects.map((project, index) => {
            const glowColor = index === 0 
              ? 'rgba(59, 130, 246, 0.2)' 
              : index === 1 
                ? 'rgba(168, 85, 247, 0.2)' 
                : index === 2
                  ? 'rgba(16, 185, 129, 0.2)'
                  : 'rgba(245, 158, 11, 0.2)';

            return (
              <TiltCard
                key={project.title}
                className="rounded-[2.5rem] flex flex-col h-full"
                glowColor={glowColor}
              >
                <motion.div 
                  layoutId={`project-card-${project.title}`}
                  onClick={() => setSelectedProject(project)}
                  data-cursor-text="VIEW"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative flex flex-col rounded-[2.5rem] overflow-hidden glass border-white/10 hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700 h-full cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <motion.img
                      layoutId={`project-image-${project.title}`}
                      src={project.image}
                      alt={project.title}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Visual Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 transition-opacity duration-700"></div>

                    {/* Floating Tags */}
                    <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[9px] font-black tracking-widest text-white uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-10 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-blue-500 text-[10px] font-black uppercase tracking-[0.3em]">{project.category}</span>
                      <div className={`w-10 h-1.5 rounded-full bg-gradient-to-r ${project.accent}`}></div>
                    </div>
                    <h4 className="text-3xl font-black mb-3 tracking-tight group-hover:text-blue-600 transition-colors">{project.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg mb-0 leading-relaxed font-medium flex-grow">{project.description}</p>
                  </div>
                </motion.div>
              </TiltCard>
            );
          })}
        </div>
      </div>

      {/* Expansion Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-[150] pointer-events-auto"
            />

            {/* Scrollable Container */}
            <div className="fixed inset-0 z-[151] flex items-center justify-center p-4 md:p-10 pointer-events-none overflow-y-auto">
              <motion.div
                layoutId={`project-card-${selectedProject.title}`}
                className="w-full max-w-4xl bg-slate-50 dark:bg-[#090d16] rounded-[2.5rem] overflow-hidden shadow-2xl pointer-events-auto relative max-h-[90vh] overflow-y-auto border border-slate-200/50 dark:border-white/5 text-slate-950 dark:text-white"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-3 rounded-full bg-black/40 text-white backdrop-blur-md hover:bg-black/60 transition-colors z-30 cursor-pointer"
                >
                  <X size={20} />
                </button>

                {/* Shared Image Section */}
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <motion.img
                    layoutId={`project-image-${selectedProject.title}`}
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  
                  <div className="absolute bottom-8 left-8 md:left-12">
                    <motion.span
                      layoutId={`project-category-${selectedProject.title}`}
                      className="text-blue-400 text-xs md:text-sm font-black uppercase tracking-[0.3em] mb-2 block"
                    >
                      {selectedProject.category}
                    </motion.span>
                    <motion.h4
                      layoutId={`project-title-${selectedProject.title}`}
                      className="text-4xl md:text-6xl font-black text-white tracking-tight"
                    >
                      {selectedProject.title}
                    </motion.h4>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left/Main Column */}
                    <div className="md:col-span-2 space-y-8">
                      <div>
                        <h5 className="text-xs uppercase tracking-[0.3em] text-slate-400 font-black mb-3">Overview</h5>
                        <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
                          {selectedProject.description}
                        </p>
                      </div>

                      <div>
                        <h5 className="text-xs uppercase tracking-[0.3em] text-slate-400 font-black mb-4">Key Features</h5>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {selectedProject.features.map((feat) => (
                            <li key={feat} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-bold text-base">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 animate-pulse" />
                              {feat}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-xs uppercase tracking-[0.3em] text-slate-400 font-black mb-3">Technical Challenge</h5>
                        <p className="text-slate-600 dark:text-slate-400 text-base font-semibold leading-relaxed">
                          {selectedProject.challenges}
                        </p>
                      </div>
                    </div>

                    {/* Right Column / Metadata */}
                    <div className="space-y-8">
                      <div>
                        <h5 className="text-xs uppercase tracking-[0.3em] text-slate-400 font-black mb-4">Tech Stack</h5>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tags.map((tag) => (
                            <span key={tag} className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 border-t border-slate-200 dark:border-white/5 flex flex-col gap-4">
                        <Magnetic>
                          <a
                            href={selectedProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-slate-200/50 dark:bg-white/5 text-slate-900 dark:text-white font-black hover:bg-slate-200 dark:hover:bg-white/10 transition-colors border border-slate-300 dark:border-white/10 text-sm"
                          >
                            <Code size={18} />
                            Code Repository
                          </a>
                        </Magnetic>
                        <Magnetic>
                          <a
                            href={selectedProject.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-blue-600 text-white font-black hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 text-sm"
                          >
                            <ExternalLink size={18} />
                            Launch Live Site
                          </a>
                        </Magnetic>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
