const Footer = () => {
  return (
    <footer className="py-12 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-xl font-black text-gradient">DD</div>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          © {new Date().getFullYear()} Denil Daby. Built with React & Tailwind CSS.
        </p>
        <div className="flex gap-8 text-sm font-bold text-slate-500 dark:text-slate-400">
          <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
