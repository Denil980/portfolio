import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Globe, Send, Sparkles, Mail, Check } from 'lucide-react';
import Magnetic from './Magnetic';

const Contact = () => {
  const [connectionState, setConnectionState] = useState<'idle' | 'sending' | 'connected'>('idle');
  const [sectionEntered, setSectionEntered] = useState(false);
  const [isSectionLoading, setIsSectionLoading] = useState(true);
  const [logIndex, setLogIndex] = useState(0);
  const [emailForm, setEmailForm] = useState({ name: '', email: '', message: '' });

  const logs = [
    "Establishing secure communication link...",
    "Routing connection via portfolio gateway...",
    "Performing handshake protocols (RTT: 38ms)...",
    "Line encrypted. Secure communication node ready."
  ];

  useEffect(() => {
    if (sectionEntered && isSectionLoading) {
      const interval = setInterval(() => {
        setLogIndex(prev => {
          if (prev < logs.length - 1) return prev + 1;
          clearInterval(interval);
          setTimeout(() => {
            setIsSectionLoading(false);
          }, 800);
          return prev;
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [sectionEntered, isSectionLoading]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setConnectionState('sending');
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE",
          name: emailForm.name,
          email: emailForm.email,
          message: emailForm.message,
          subject: `Portfolio Message from ${emailForm.name}`
        })
      });
      
      const result = await response.json();
      if (result.success) {
        setConnectionState('connected');
        setTimeout(() => {
          setConnectionState('idle');
          setEmailForm({ name: '', email: '', message: '' });
        }, 3000);
      } else {
        alert("Failed to send message: " + result.message);
        setConnectionState('idle');
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while sending the message. Please try again.");
      setConnectionState('idle');
    }
  };

  return (
    <motion.section 
      id="contact" 
      className="py-40 relative overflow-hidden"
      onViewportEnter={() => {
        if (!sectionEntered) {
          setSectionEntered(true);
        }
      }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="container mx-auto px-6 text-center relative z-10 min-h-[520px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {isSectionLoading ? (
            <motion.div 
              key="loading-terminal"
              initial={{ opacity: 1, scale: 0.95 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-xl bg-slate-950/95 border border-emerald-500/20 text-emerald-500 font-mono text-left p-6 rounded-2xl shadow-[0_0_50px_rgba(16,185,129,0.15)] relative overflow-hidden pointer-events-auto"
            >
              {/* Terminal header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-emerald-500/10 text-xs text-slate-400 select-none">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                  <span className="ml-1 font-black">secure_connect.sh</span>
                </span>
                <span>v1.0.4</span>
              </div>

              {/* Logs */}
              <div className="space-y-2.5 text-xs sm:text-sm min-h-[120px] select-none">
                {logs.slice(0, sectionEntered ? logIndex + 1 : 1).map((log, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-slate-500">➜</span>
                    <span className={idx === logIndex && sectionEntered ? "text-emerald-400 animate-pulse" : "text-emerald-600/80"}>
                      {log}
                    </span>
                  </div>
                ))}
                {(!sectionEntered || logIndex < logs.length - 1) && (
                  <motion.span 
                    animate={{ opacity: [1, 0, 1] }} 
                    transition={{ repeat: Infinity, duration: 0.8 }} 
                    className="inline-block w-2 h-4 bg-emerald-400 ml-1 align-middle"
                  />
                )}
              </div>

              {/* Loading progress bar */}
              <div className="mt-8 select-none">
                <div className="flex justify-between text-[10px] text-slate-400 mb-2">
                  <span>SYSTEM STATUS:</span>
                  <span>{sectionEntered ? Math.round(((logIndex + 1) / logs.length) * 100) : 0}% READY</span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-emerald-500/10">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: sectionEntered ? `${((logIndex + 1) / logs.length) * 100}%` : "0%" }}
                    transition={{ duration: 0.3 }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                  />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 18 }}
              className="flex flex-col items-center w-full"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 mb-10 text-xs font-black tracking-widest uppercase"
              >
                <Sparkles size={14} />
                Get In Touch
              </motion.div>

              <h3 className="text-6xl md:text-8xl font-black mb-16 tracking-tighter">
                Have a project in mind? <br />
                <span className="text-gradient">Let's build it together.</span>
              </h3>

              <div className="max-w-4xl mx-auto flex flex-col items-center w-full">
                {/* Interactive Connection Widget Card */}
                <div className="w-full max-w-2xl bg-white/60 dark:bg-white/[0.02] border border-slate-200/50 dark:border-white/10 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 mb-20 relative z-10 overflow-hidden shadow-2xl min-h-[240px] flex items-center justify-center transition-all duration-500 hover:shadow-[0_30px_60px_rgba(59,130,246,0.08)]">
                  {/* Internal background glow blur orbs */}
                  <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[80px] pointer-events-none"></div>

                  <AnimatePresence mode="wait">
                    {connectionState === 'idle' ? (
                      <motion.form 
                        key="email-form"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        onSubmit={handleEmailSubmit}
                        className="flex flex-col gap-4 w-full text-left z-10"
                      >
                        <h4 className="text-xl font-black mb-1 text-slate-800 dark:text-white uppercase tracking-wider">Send a Message</h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Your Name</label>
                            <input 
                              type="text" 
                              required
                              value={emailForm.name}
                              onChange={(e) => setEmailForm({ ...emailForm, name: e.target.value })}
                              placeholder="John Doe"
                              className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-semibold text-sm focus:border-blue-500 focus:outline-none transition-colors"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Your Email</label>
                            <input 
                              type="email" 
                              required
                              value={emailForm.email}
                              onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                              placeholder="john@example.com"
                              className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-semibold text-sm focus:border-blue-500 focus:outline-none transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Message</label>
                          <textarea 
                            required
                            rows={3}
                            value={emailForm.message}
                            onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                            placeholder="Hi Denil, I'd love to work on a project with you..."
                            className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white font-semibold text-sm focus:border-blue-500 focus:outline-none transition-colors resize-none"
                          />
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2 pt-4 border-t border-slate-200/50 dark:border-white/5">
                          <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
                            Or dial directly: <a href="tel:+919497213784" className="text-blue-500 hover:text-blue-600 transition-colors underline decoration-blue-500/20 font-black">+91 94972 13784</a>
                          </p>
                          <button
                            type="submit"
                            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black tracking-widest uppercase text-[10px] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                          >
                            <Send size={12} />
                            Send Message
                          </button>
                        </div>
                      </motion.form>
                    ) : (
                      <motion.div 
                        key="mailing-sending"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex flex-col items-center text-center w-full z-10"
                      >
                        <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
                          <motion.div
                            animate={{
                              y: [-5, 5, -5],
                              rotate: [0, 5, -5, 0]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-xl shadow-purple-500/30 relative z-10"
                          >
                            <motion.div
                              animate={connectionState === 'sending' ? {
                                x: [0, 40, -40, 0],
                                y: [0, -40, 40, 0],
                                scale: [1, 0, 0, 1]
                              } : {}}
                              transition={{ duration: 1.5, repeat: connectionState === 'sending' ? 1 : 0 }}
                            >
                              <Mail size={28} />
                            </motion.div>
                          </motion.div>
                        </div>

                        <h4 className="text-2xl font-black mb-1">
                          {connectionState === 'sending' ? 'Sending Message...' : 'MESSAGE SENT!'}
                        </h4>

                        <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-[10px] flex items-center gap-1.5 justify-center mb-6">
                          {connectionState === 'sending' ? (
                            <>
                              <Send size={12} className="animate-pulse" />
                              Connecting to secure mail servers...
                            </>
                          ) : (
                            <>
                              <Check size={12} className="text-emerald-500" />
                              Thank you, I'll get back to you shortly.
                            </>
                          )}
                        </p>

                        <button
                          type="button"
                          onClick={() => {
                            setConnectionState('idle');
                            setEmailForm({ name: '', email: '', message: '' });
                          }}
                          className="px-6 py-2.5 rounded-full bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 font-black tracking-widest uppercase text-[10px] transition-all cursor-pointer flex items-center gap-2"
                        >
                          Cancel
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex flex-wrap justify-center gap-8">
                  {[
                    { icon: <Code size={32} />, label: "GitHub", href: "https://github.com/Denil980", color: "hover:text-blue-500" },
                    { icon: <Globe size={32} />, label: "LinkedIn", href: "https://linkedin.com", color: "hover:text-blue-500" },
                    { icon: <Send size={32} />, label: "Twitter", href: "https://twitter.com", color: "hover:text-blue-500" }
                  ].map((social) => (
                    <Magnetic key={social.label}>
                      <motion.a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -8, scale: 1.1 }}
                        className={`flex flex-col items-center gap-3 p-6 rounded-3xl glass transition-all border-white/10 ${social.color} cursor-pointer`}
                      >
                        {social.icon}
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-50">{social.label}</span>
                      </motion.a>
                    </Magnetic>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default Contact;
