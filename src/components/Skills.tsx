import { motion } from 'framer-motion';
import { Layout, Database, Cpu, Zap, Star } from 'lucide-react';
import TiltCard from './TiltCard';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Layout className="text-blue-500" />,
      span: "md:col-span-2",
      skills: [
        { name: "React.js", level: "Expert" },
        { name: "Tailwind CSS", level: "Expert" },
        { name: "JavaScript", level: "Expert" },
        { name: "HTML5", level: "Expert" },
        { name: "CSS3", level: "Expert" }
      ]
    },
    {
      title: "Backend & DB",
      icon: <Database className="text-purple-500" />,
      span: "md:col-span-2",
      skills: [
        { name: "MongoDB", level: "Expert" },
        { name: "Node.js", level: "Advanced" },
        { name: "Express.js", level: "Advanced" }
      ]
    },
    {
      title: "Tools",
      icon: <Cpu className="text-emerald-500" />,
      span: "md:col-span-4",
      skills: [
        { name: "Git", level: "Expert" },
        { name: "GitHub", level: "Expert" },
        { name: "VS Code", level: "Expert" },
        { name: "Antigravity", level: "Advanced" }
      ]
    }
  ];

  const categoryVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section id="skills" className="py-20 md:py-40 relative bg-slate-100/30 dark:bg-slate-900/10">
      <div className="container-custom">
        <div className="flex flex-col items-center mb-16 md:mb-20 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-black tracking-widest uppercase border border-emerald-500/10"
          >
            <Zap size={14} fill="currentColor" />
            Capabilities
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-black mb-6 tracking-tight"
          >
            My Tech Arsenal
          </motion.h3>
        </div>

        {/* Infinite Skills Marquee */}
        <div className="w-full overflow-hidden py-8 mb-24 border-y border-slate-200/50 dark:border-white/5 relative bg-white/20 dark:bg-white/[0.01] backdrop-blur-sm rounded-3xl">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 dark:from-[#030712]/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 dark:from-[#030712]/50 to-transparent z-10 pointer-events-none" />
          
          <div className="marquee-container gap-6">
            <div className="marquee-content animate-marquee gap-6">
              {[
                "React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", 
                "JavaScript", "TypeScript", "HTML5", "CSS3", "Git", "GitHub", 
                "Next.js", "Redux", "REST APIs", "SQL", "UI/UX"
              ].map((skill, index) => (
                <div 
                  key={`m1-${index}`}
                  className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 shadow-sm text-slate-800 dark:text-slate-200 text-sm md:text-lg font-black tracking-tight shrink-0 select-none"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  {skill}
                </div>
              ))}
            </div>
            <div className="marquee-content animate-marquee gap-6" aria-hidden="true">
              {[
                "React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", 
                "JavaScript", "TypeScript", "HTML5", "CSS3", "Git", "GitHub", 
                "Next.js", "Redux", "REST APIs", "SQL", "UI/UX"
              ].map((skill, index) => (
                <div 
                  key={`m2-${index}`}
                  className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200/60 dark:border-white/5 shadow-sm text-slate-800 dark:text-slate-200 text-sm md:text-lg font-black tracking-tight shrink-0 select-none"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10">
          {skillCategories.map((category, index) => {
            const glowColor = index === 0 
              ? 'rgba(59, 130, 246, 0.15)' 
              : index === 1 
                ? 'rgba(168, 85, 247, 0.15)' 
                : 'rgba(16, 185, 129, 0.15)';

            return (
              <TiltCard
                key={category.title}
                className={`${category.span} rounded-[2rem] md:rounded-[3rem]`}
                glowColor={glowColor}
              >
                <motion.div
                  variants={categoryVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className={`${category.span} p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] glass border-white/10 group relative h-full`}
                >
                  <div className="flex items-center gap-4 mb-12">
                    <div className="p-5 rounded-[1.5rem] bg-white dark:bg-slate-800 shadow-xl group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                      {category.icon}
                    </div>
                    <h4 className="text-3xl md:text-4xl font-black tracking-tight">{category.title}</h4>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-6">
                    {category.skills.map((skill) => (
                      <motion.div
                        key={skill.name}
                        variants={skillVariants}
                        whileHover={{ scale: 1.05, y: -4, borderColor: 'rgba(59, 130, 246, 0.5)' }}
                        className="flex flex-col p-4 md:p-6 rounded-2xl md:rounded-3xl bg-white/50 dark:bg-white/[0.03] border border-slate-200/50 dark:border-white/5 transition-all cursor-default"
                      >
                        <span className="font-black text-xs md:text-base mb-2">{skill.name}</span>
                        <div className="flex items-center gap-1">
                          <Star size={8} fill="currentColor" className="text-blue-500" />
                          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{skill.level}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
