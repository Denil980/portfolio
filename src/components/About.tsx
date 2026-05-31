import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen, User, Sparkles } from 'lucide-react';
import TiltCard from './TiltCard';

const About = () => {
  return (
    <section id="about" className="py-20 md:py-40 relative">
      <div className="container-custom">
        <div className="flex flex-col items-center mb-16 md:mb-32">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase border border-blue-500/10"
          >
            <Sparkles size={14} />
            About Me
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-black text-center tracking-tight"
          >
            Behind the Code
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10">
          {/* Main Bio Card */}
          <TiltCard className="md:col-span-2 rounded-[2rem] md:rounded-[3rem]" glowColor="rgba(59, 130, 246, 0.15)">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] glass relative overflow-hidden group border-white/10 h-full"
            >
              <div className="absolute -top-10 -right-10 p-12 opacity-5 group-hover:opacity-10 transition-all duration-1000 group-hover:rotate-12 group-hover:scale-150">
                <User size={250} />
              </div>
              <h4 className="text-3xl md:text-4xl font-black mb-8 flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
                  <BookOpen size={24} />
                </div>
                My Story
              </h4>
              <div className="space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed text-base md:text-xl font-medium">
                <p>
                  I am a <span className="text-slate-950 dark:text-white font-black">B.Tech Computer Science student</span> (class of 2026) with hands-on MERN stack experience, two web development internships, and multiple full-stack projects.
                </p>
                <p>
                  I am eager to contribute my technical skills and grow as a professional software developer, building digital solutions that merge efficiency with clean code.
                </p>
              </div>
            </motion.div>
          </TiltCard>

          {/* Education Card */}
          <TiltCard className="md:col-span-2 rounded-[2rem] md:rounded-[3rem]" glowColor="rgba(192, 132, 252, 0.2)">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white relative overflow-hidden group shadow-2xl shadow-indigo-500/20 h-full"
            >
              <div className="absolute -bottom-10 -right-10 opacity-20 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-1000">
                <GraduationCap size={300} />
              </div>
              <h4 className="text-3xl md:text-4xl font-black mb-10 flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-white/10 text-white backdrop-blur-md">
                  <GraduationCap size={24} />
                </div>
                Academic
              </h4>
              <div className="space-y-12 relative z-10">
                {[
                  { title: "B.Tech in CS & Business Systems", school: "St. Vincent Pallotti College of Engineering & Technology, Nagpur", year: "2022 – 2026" }
                ].map((item, idx) => (
                  <div key={idx} className="relative pl-8 border-l-2 border-white/20">
                    <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-white shadow-lg shadow-blue-500/50"></div>
                    <p className="font-black text-xl md:text-2xl mb-1 leading-tight">{item.title}</p>
                    <p className="text-blue-100/70 font-semibold text-xs leading-normal mt-2">{item.school}</p>
                    <p className="text-blue-200/90 font-bold uppercase tracking-widest text-[10px] mt-1">{item.year}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </TiltCard>

          {/* Certifications Card */}
          <TiltCard className="md:col-span-4 rounded-[2rem] md:rounded-[3rem]" glowColor="rgba(99, 102, 241, 0.15)">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] glass border-white/10 overflow-hidden h-full"
            >
              <h4 className="text-3xl md:text-4xl font-black mb-12 flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-500">
                  <Award size={24} />
                </div>
                Validated Skills & Certifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[
                  'MERN Stack App Dev – TechSaksham (Microsoft & SAP)',
                  'AI in Marketing – Coursera (Univ. of Virginia)',
                  'Programming Foundations: Fundamentals – LinkedIn Learning',
                  'Programming Foundations: Beyond Fundamentals – LinkedIn',
                  'Microsoft Copilot for Productivity – LinkedIn Learning'
                ].map((cert) => (
                  <motion.div 
                    key={cert}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="flex items-center gap-4 p-6 rounded-3xl bg-slate-100/30 dark:bg-white/5 border border-slate-200/50 dark:border-white/5 backdrop-blur-sm group cursor-pointer"
                  >
                    <div className="w-2 h-10 rounded-full bg-indigo-500 group-hover:h-12 transition-all shrink-0"></div>
                    <span className="text-sm md:text-base font-black tracking-tight leading-snug">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};

export default About;
