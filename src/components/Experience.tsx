import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Calendar, History } from 'lucide-react';
import TiltCard from './TiltCard';

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const experiences = [
    {
      title: "Web Developer Intern",
      company: "Madweb",
      duration: "3 Months",
      description: "Built and maintained web application features in a production environment; debugged frontend issues and improved UI components. Contributed to project structure, code quality, and UI improvements on real-world client projects.",
      skills: ["React.js", "JavaScript", "HTML5", "CSS3", "Git"],
      type: "Internship"
    },
    {
      title: "Web Developer Intern",
      company: "Oasis Infobyte",
      duration: "1 Month",
      description: "Developed responsive web pages using HTML, CSS, and JavaScript with a focus on cross-browser compatibility and clean UI.",
      skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      type: "Internship"
    }
  ];

  return (
    <section id="experience" className="py-20 md:py-40 relative">
      <div className="container-custom">
        <div className="flex flex-col items-center mb-16 md:mb-32 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-600 mb-6"
          >
            <History size={24} />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-black mb-4 tracking-tight"
          >
            Professional Path
          </motion.h2>
        </div>

        <div ref={containerRef} className="max-w-6xl mx-auto relative px-4 md:px-0">
          {/* Animated Vertical Timeline Line */}
          <motion.div 
            style={{ scaleY }}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-indigo-600 to-purple-600 transform md:-translate-x-1/2 origin-top z-0"
          />
          {/* Faint Background Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-800 transform md:-translate-x-1/2 pointer-events-none opacity-20" />

          <div className="space-y-20 md:space-y-40">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-10 md:gap-24 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Visual Connector Dot with spring animation */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                  className="absolute left-[30px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-white dark:bg-[#030712] border-4 border-indigo-600 z-10 shadow-[0_0_20px_rgba(79,70,229,0.6)]"
                />

                {/* Content Card with tilt and hover glow */}
                <div className="w-full md:w-[45%] group pl-16 md:pl-0 z-10">
                  <TiltCard className="rounded-[2rem] md:rounded-[3rem]" glowColor="rgba(99, 102, 241, 0.15)">
                    <div className="p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] glass border-white/10 transition-all duration-700 shadow-xl">
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest border border-indigo-500/20">
                          <Calendar size={14} />
                          {exp.duration}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">{exp.type}</span>
                      </div>
                      
                      <h4 className="text-3xl md:text-4xl font-black mb-3 tracking-tight leading-tight">{exp.title}</h4>
                      <p className="text-blue-600 dark:text-blue-400 font-black mb-8 text-lg">{exp.company}</p>
                      
                      <p className="text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-medium text-lg">
                        {exp.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <span key={skill} className="text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-transparent group-hover:border-indigo-500/20 transition-all">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </div>
                
                {/* Year tag for large screens */}
                <div className="hidden md:block md:w-[45%] text-center">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="text-[120px] font-black text-slate-200/50 dark:text-white/[0.03] select-none pointer-events-none"
                  >
                    {exp.duration.split(' ').pop()}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
