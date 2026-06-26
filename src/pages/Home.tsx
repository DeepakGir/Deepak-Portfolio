import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import { SiGithub } from "react-icons/si";
import {
  Mail, Phone, MapPin, ExternalLink, Download,
  Code2, Database, Globe, Briefcase, GraduationCap,
  Award, ChevronRight, Linkedin, Menu, X, Terminal,
  Layers, Cpu, Server, ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ── animation variants ── */
const fadeUp: Variants = {
  hidden: { y: 32, opacity: 0 },
  visible: (i = 0) => ({
    y: 0, opacity: 1,
    transition: { duration: 0.55, ease: "easeOut", delay: i * 0.08 }
  })
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

/* ── sub-components ── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="font-mono text-[11px] tracking-[0.22em] uppercase text-primary">{children}</span>
      <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
    </div>
  );
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let n = 0;
    const step = Math.max(1, Math.ceil(target / 40));
    const t = setInterval(() => {
      n += step;
      if (n >= target) { setCount(target); clearInterval(t); } else setCount(n);
    }, 28);
    return () => clearInterval(t);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* typing effect */
const roles = ["Java Developer", "Backend Engineer", "Spring Boot Dev", "Problem Solver"];
function TypingRole() {
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = roles[idx];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && sub.length < word.length) {
      timeout = setTimeout(() => setSub(word.slice(0, sub.length + 1)), 80);
    } else if (!deleting && sub.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && sub.length > 0) {
      timeout = setTimeout(() => setSub(sub.slice(0, -1)), 45);
    } else {
      setDeleting(false);
      setIdx((idx + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [sub, deleting, idx]);
  return (
    <span className="text-primary">
      {sub}<span className="animate-pulse">|</span>
    </span>
  );
}

export default function Home() {
  const [active, setActive] = useState("hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = ["hero", "about", "skills", "projects", "experience", "education", "contact"];
      const pos = window.scrollY + 130;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && pos >= el.offsetTop && pos < el.offsetTop + el.offsetHeight) setActive(id);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goto = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const navItems = ["About", "Skills", "Projects", "Experience", "Education", "Contact"];

  const skills = [
    { cat: "Languages", icon: Code2, accent: "blue", items: ["Java", "JavaScript", "C", "C#"] },
    { cat: "Backend", icon: Server, accent: "emerald", items: ["Spring Boot", "Hibernate", "JSP", "Servlets", "JDBC"] },
    { cat: "Frontend", icon: Globe, accent: "violet", items: ["HTML5", "CSS3"] },
    { cat: "Databases", icon: Database, accent: "orange", items: ["MySQL"] },
    { cat: "Tools", icon: Terminal, accent: "pink", items: ["Git", "GitHub", "Apache Tomcat", "Netlify"] },
    { cat: "Concepts", icon: Cpu, accent: "cyan", items: ["OOP", "MVC Architecture", "REST APIs", "CRUD"] },
  ];

  const accentMap: Record<string, string> = {
    blue:    "from-blue-500/15 to-cyan-500/10 border-blue-500/25 hover:border-blue-400/50",
    emerald: "from-emerald-500/15 to-teal-500/10 border-emerald-500/25 hover:border-emerald-400/50",
    violet:  "from-violet-500/15 to-purple-500/10 border-violet-500/25 hover:border-violet-400/50",
    orange:  "from-orange-500/15 to-amber-500/10 border-orange-500/25 hover:border-orange-400/50",
    pink:    "from-pink-500/15 to-rose-500/10 border-pink-500/25 hover:border-pink-400/50",
    cyan:    "from-cyan-500/15 to-sky-500/10 border-cyan-500/25 hover:border-cyan-400/50",
  };
  const iconColorMap: Record<string, string> = {
    blue: "text-blue-400", emerald: "text-emerald-400", violet: "text-violet-400",
    orange: "text-orange-400", pink: "text-pink-400", cyan: "text-cyan-400",
  };
  const tagColorMap: Record<string, string> = {
    blue: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    emerald: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    violet: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    orange: "bg-orange-500/10 text-orange-300 border-orange-500/20",
    pink: "bg-pink-500/10 text-pink-300 border-pink-500/20",
    cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  };

  const projects = [
    {
      num: "01", title: "User Management Web App", sub: "Full-Stack Java Application",
      tech: ["Java", "JDBC", "JSP", "Servlets", "MySQL"],
      desc: "Web-based application to manage user records with full CRUD operations. Built on MVC architecture with form validation, search functionality, and MySQL database integration via JDBC.",
      github: "https://github.com/DeepakGir/User-Managment-Web-Application",
      grad: "from-blue-600 to-cyan-500"
    },
    {
      num: "02", title: "Student Management System", sub: "Academic Record Manager",
      tech: ["Java", "JDBC",  "MySQL"],
      desc: "Comprehensive student record management with CRUD operations, MySQL integration via JDBC, and MVC design with advanced form validation and search.",
      github: "https://github.com/DeepakGir/Student-Management-System-",
      grad: "from-emerald-600 to-teal-500"
    },
    {
      num: "03", title: "Hotel Room Booking", sub: "Booking Management System",
      tech: ["Java", "JDBC", "MySQL"],
      desc: "Java-based hotel booking system featuring booking creation, updates, cancellations, and record viewing. Efficient data storage and retrieval via JDBC.",
      github: "https://github.com/DeepakGir/Hotel-Managment-System.git",
      grad: "from-violet-600 to-purple-500"
    },
    {
      num: "04", title: "Portfolio Website", sub: "Personal Brand Site",
      tech: ["HTML", "CSS", "JavaScript"],
      desc: "Responsive personal portfolio showcasing projects and skills. Mobile-first responsive design deployed on Netlify.",
      github: "https://github.com/DeepakGir/Deepak-Portfolio.git",
      grad: "from-orange-600 to-amber-500"
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">

      {/* ── animated grid background ── */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(217_32%_17%_/_0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(217_32%_17%_/_0.3)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      {/* ── Nav ── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border/40 shadow-xl shadow-black/30" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => goto("hero")} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-black text-background text-sm transition-transform group-hover:scale-105">DG</div>
            <span className="font-bold text-lg tracking-tight hidden sm:block">Deepak<span className="text-primary">.</span></span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button key={item} onClick={() => goto(item.toLowerCase())}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${active === item.toLowerCase() ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-white/5"}`}>
                {item}
              </button>
            ))}
            <a href="/Deepak_Gir_Resume.pdf" download target="_blank" rel="noopener noreferrer"
              className="ml-3 inline-flex items-center gap-1.5 bg-primary text-background text-sm font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 active:scale-95 transition-all">
              <Download className="w-3.5 h-3.5" /> Resume
            </a>
          </div>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden bg-card/95 backdrop-blur-xl border-b border-border/40">
              <div className="px-6 pb-4 flex flex-col gap-1 pt-2">
                {navItems.map(item => (
                  <button key={item} onClick={() => goto(item.toLowerCase())}
                    className="text-left py-2.5 text-muted-foreground hover:text-primary border-b border-border/20 last:border-0 transition-colors text-sm">
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="min-h-screen flex items-center pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left — text */}
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 text-xs font-mono text-primary mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Available for opportunities
              </motion.div>

              <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-4">
                Hi, I'm<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-300 to-primary bg-[length:200%_auto] animate-shimmer">
                  Deepak Gir
                </span>
              </motion.h1>

              <motion.div variants={fadeUp} className="text-xl sm:text-2xl font-light text-muted-foreground mb-6 h-8">
                <TypingRole />
              </motion.div>

              <motion.p variants={fadeUp} className="text-base text-muted-foreground leading-relaxed mb-10 max-w-lg">
                Motivated Java Developer building <span className="text-foreground font-medium">backend-driven web applications</span> with Spring Boot, Hibernate & MySQL. Passionate about clean, scalable code.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-12">
                <Button size="lg" onClick={() => goto("projects")}
                  className="bg-primary text-background hover:bg-primary/90 active:scale-95 font-semibold gap-2 transition-all">
                  View My Work <ChevronRight className="w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline"
                  className="border-border/60 hover:border-primary hover:bg-primary/5 gap-2 transition-all active:scale-95" asChild>
                  <a href="/Deepak_Gir_Resume.pdf" download target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4" /> Download CV
                  </a>
                </Button>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-5">
                <a href="https://github.com/DeepakGir" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <SiGithub className="w-5 h-5" /> GitHub
                </a>
                <div className="w-px h-4 bg-border" />
                <a href="https://www.linkedin.com/in/deepak-gir-5575733b5" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="w-5 h-5" /> LinkedIn
                </a>
                <div className="w-px h-4 bg-border" />
                <a href="mailto:deepakgir2026@gmail.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-5 h-5" /> Email
                </a>
              </motion.div>
            </motion.div>

            {/* Right — profile + floating badges */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative flex items-center justify-center lg:justify-end">

              {/* Glow rings */}
              <div className="absolute w-72 h-72 rounded-full border border-primary/10 animate-spin-slow" />
              <div className="absolute w-64 h-64 rounded-full border border-primary/15" />

              {/* Profile photo */}
              <div className="relative z-10">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                <div className="relative w-52 h-52 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-2 border-primary/30 shadow-2xl shadow-primary/20">
                  <img src="/deepak.png" alt="Deepak Gir" className="w-full h-full object-cover"
                    onError={e => { (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Deepak+Gir&background=020817&color=0ea5e9&size=256"; }} />
                </div>

                {/* Floating badge — Java */}
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="absolute -left-12 top-8 bg-card border border-border/60 rounded-xl px-3 py-2 shadow-xl text-xs font-mono text-primary backdrop-blur-sm">
                  ☕ Java Developer
                </motion.div>

                {/* Floating badge — Spring Boot */}
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -right-12 bottom-12 bg-card border border-border/60 rounded-xl px-3 py-2 shadow-xl text-xs font-mono text-emerald-400 backdrop-blur-sm">
                  🌱 Spring Boot
                </motion.div>

                {/* Floating badge — MySQL */}
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut", delay: 1 }}
                  className="absolute -right-10 top-6 bg-card border border-border/60 rounded-xl px-3 py-2 shadow-xl text-xs font-mono text-orange-400 backdrop-blur-sm">
                  🗄 MySQL
                </motion.div>

                {/* Available dot */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Open to Work
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div initial="hidden" animate="visible" variants={stagger}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-20 pt-10 border-t border-border/40">
            {[
              { n: 4, s: "+", l: "Projects Built" },
              { n: 8, s: "+", l: "Technologies" },
              { n: 2, s: "", l: "Certifications" },
              { n: 1, s: "+", l: "Year Experience" },
            ].map(stat => (
              <motion.div key={stat.l} variants={fadeUp}
                className="text-center p-5 rounded-2xl bg-card/60 border border-border/50 hover:border-primary/40 hover:bg-card transition-all cursor-default">
                <div className="text-3xl font-black text-primary mb-1">
                  <AnimatedCounter target={stat.n} suffix={stat.s} />
                </div>
                <div className="text-xs text-muted-foreground tracking-wide">{stat.l}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 space-y-28 pb-32">

        {/* ── About ── */}
        <motion.section id="about" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.div variants={fadeUp} className="mb-10">
            <SectionLabel>About Me</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-bold">Who I Am</h2>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-10">
            <motion.div variants={fadeUp} className="md:col-span-3 space-y-5">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a motivated and detail-oriented <span className="text-foreground font-semibold">Java Developer</span> with hands-on experience building backend-driven web applications using Java, JDBC, JSP, Servlets, Spring Boot, Hibernate, and MySQL.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Strong knowledge of <span className="text-foreground font-semibold">OOP, MVC architecture, RESTful APIs</span>, and database integration. Passionate about learning new technologies and building <span className="text-foreground font-semibold">scalable, high-quality solutions</span>.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a href="https://github.com/DeepakGir" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border/50 hover:border-primary/50 hover:text-primary rounded-xl text-sm transition-all">
                  <SiGithub className="w-4 h-4" /> GitHub Profile
                </a>
                <a href="https://www.linkedin.com/in/deepak-gir-5575733b5" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border/50 hover:border-primary/50 hover:text-primary rounded-xl text-sm transition-all">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="md:col-span-2 space-y-3">
              {[
                { k: "Degree", v: "B.Sc. Computer Science" },
                { k: "University", v: "SMIU Karachi" },
                { k: "Graduation", v: "2027 (Expected)" },
                { k: "Location", v: "Karachi, Pakistan" },
                { k: "Status", v: "Open to Work", highlight: true },
              ].map(({ k, v, highlight }) => (
                <div key={k} className="flex items-center justify-between px-4 py-3 bg-card border border-border/50 rounded-xl hover:border-primary/30 transition-colors">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">{k}</span>
                  <span className={`text-sm font-medium ${highlight ? "text-emerald-400" : "text-foreground"}`}>{v}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* ── Skills ── */}
        <motion.section id="skills" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.div variants={fadeUp} className="mb-10">
            <SectionLabel>Technical Skills</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-bold">My Toolkit</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skills.map((cat, i) => (
              <motion.div key={cat.cat} custom={i} variants={fadeUp}
                className={`group relative rounded-2xl bg-gradient-to-br border p-6 transition-all duration-300 cursor-default hover:scale-[1.02] hover:shadow-lg hover:shadow-black/30 ${accentMap[cat.accent]}`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-background/50 rounded-xl backdrop-blur-sm">
                    <cat.icon className={`w-5 h-5 ${iconColorMap[cat.accent]}`} />
                  </div>
                  <h3 className="font-semibold text-foreground">{cat.cat}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map(skill => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.08 }}
                      onMouseEnter={() => setHoveredSkill(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border cursor-default transition-all ${hoveredSkill === skill ? "scale-110 shadow-md" : ""} ${tagColorMap[cat.accent]}`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Projects ── */}
        <motion.section id="projects" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.div variants={fadeUp} className="mb-10">
            <SectionLabel>Projects</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-bold">Featured Work</h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {projects.map((p, i) => (
              <motion.div key={p.title} custom={i} variants={fadeUp}
                whileHover={{ y: -4 }}
                className="group relative bg-card border border-border/50 rounded-2xl p-7 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 cursor-default"
              >
                {/* faded number watermark */}
                <div className={`absolute top-6 right-6 text-6xl font-black font-mono bg-gradient-to-br ${p.grad} text-transparent bg-clip-text opacity-10 group-hover:opacity-20 transition-opacity select-none`}>
                  {p.num}
                </div>

                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.grad} flex items-center justify-center mb-5 shadow-lg`}>
                  <Layers className="w-5 h-5 text-white" />
                </div>

                <h3 className="text-xl font-bold mb-1 pr-12">{p.title}</h3>
                <p className="text-xs text-primary font-mono mb-4">{p.sub}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tech.map(t => (
                    <span key={t} className="px-2.5 py-1 text-xs font-mono bg-muted text-muted-foreground rounded-lg border border-border/50">
                      {t}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{p.desc}</p>

                <a href={p.github} target="_blank" rel="noopener noreferrer"
                  data-testid={`link-github-${p.title.replace(/\s+/g, '-').toLowerCase()}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 group/link transition-colors">
                  <SiGithub className="w-4 h-4" />
                  View on GitHub
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-100 translate-x-0 group-hover/link:translate-x-0.5 -translate-y-0 group-hover/link:-translate-y-0.5 transition-all" />
                </a>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Experience ── */}
        <motion.section id="experience" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.div variants={fadeUp} className="mb-10">
            <SectionLabel>Experience</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-bold">Work History</h2>
          </motion.div>

          <motion.div variants={fadeUp}
            className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-px before:bg-gradient-to-b before:from-primary before:to-transparent">
            <div className="absolute left-0 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20 ring-offset-2 ring-offset-background" />

            <div className="bg-card border border-border/50 rounded-2xl p-7 hover:border-primary/40 transition-colors">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold">Web Development Intern</h3>
                  <p className="text-primary font-medium mt-1 flex items-center gap-2 text-sm">
                    <Briefcase className="w-3.5 h-3.5" />
                    Digital Empowerment Network
                    <span className="text-muted-foreground font-normal">• Virtual</span>
                  </p>
                </div>
                <span className="text-xs font-mono bg-primary/10 text-primary px-3 py-1.5 rounded-full border border-primary/20">
                  1 Month
                </span>
              </div>
              <ul className="space-y-3 text-muted-foreground text-sm">
                {[
                  "Developed responsive web pages using HTML, CSS, and JavaScript",
                  "Assisted in backend integration and database connectivity",
                  "Collaborated with team members to enhance application functionality",
                  "Improved problem-solving and teamwork skills through real-world tasks",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.section>

        {/* ── Education & Certs ── */}
        <motion.section id="education" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.div variants={fadeUp} className="mb-10">
            <SectionLabel>Education & Certifications</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-bold">Qualifications</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            <motion.div variants={fadeUp}
              className="bg-card border border-border/50 rounded-2xl p-7 hover:border-primary/40 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Education</h3>
              </div>
              <h4 className="text-xl font-bold mb-1">B.Sc. Computer Science</h4>
              <p className="text-primary font-medium mb-1">Sindh Madressatul Islam University</p>
              <p className="text-muted-foreground text-sm mb-5">Karachi, Pakistan</p>
              <div className="flex items-center justify-between pt-4 border-t border-border/40">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">Duration</span>
                <span className="font-mono font-semibold text-primary text-sm">2023 – 2027</span>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-4">
              {[
                { name: "Java Language", org: "PITP NED Academy", year: "2024", emoji: "☕" },
                { name: "Certificate in Information Technology", org: "NAVTC Viper Academy", year: "2025", emoji: "💻" },
              ].map(cert => (
                <div key={cert.name}
                  className="bg-card border border-border/50 rounded-2xl p-6 hover:border-primary/40 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl shrink-0">
                      {cert.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-bold text-sm mb-0.5">{cert.name}</h4>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Award className="w-3 h-3 text-primary shrink-0" />{cert.org}
                          </p>
                        </div>
                        <span className="text-xs font-mono bg-primary/10 text-primary px-2.5 py-1 rounded-full shrink-0 border border-primary/20">
                          {cert.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* ── Contact ── */}
        <motion.section id="contact" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.div variants={fadeUp} className="text-center mb-12">
            <SectionLabel>Contact</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Open to new opportunities. Have a role in mind or just want to connect? Feel free to reach out.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { Icon: Mail, label: "Email", value: "deepakgir2026@gmail.com", href: "mailto:deepakgir2026@gmail.com", color: "text-blue-400" },
              { Icon: Phone, label: "Phone", value: "+92 349-1826472", href: "tel:+923491826472", color: "text-emerald-400" },
              { Icon: MapPin, label: "Location", value: "Karachi, Pakistan", href: null, color: "text-orange-400" },
              { Icon: SiGithub, label: "GitHub", value: "DeepakGir", href: "https://github.com/DeepakGir", color: "text-purple-400" },
            ].map(({ Icon, label, value, href, color }) => {
              const inner = (
                <div className="flex flex-col items-center text-center p-6 bg-card border border-border/50 rounded-2xl hover:border-primary/40 hover:bg-primary/5 transition-all group h-full">
                  <div className="p-3 bg-card-foreground/5 rounded-xl mb-3 group-hover:bg-primary/10 transition-colors">
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{label}</span>
                  <span className="text-sm font-medium text-foreground break-all">{value}</span>
                </div>
              );
              return (
                <motion.div key={label} variants={fadeUp} className="h-full">
                  {href
                    ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block h-full">{inner}</a>
                    : inner
                  }
                </motion.div>
              );
            })}
          </div>

          <motion.div variants={fadeUp} className="flex justify-center gap-4">
            <a href="https://github.com/DeepakGir" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-card border border-border/50 rounded-xl hover:border-primary/50 hover:text-primary text-sm font-medium transition-all">
              <SiGithub className="w-4 h-4" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/deepak-gir-5575733b5" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-card border border-border/50 rounded-xl hover:border-primary/50 hover:text-primary text-sm font-medium transition-all">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </motion.div>
        </motion.section>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-border/40 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center text-background font-black text-xs">DG</div>
            <span>© 2025 Deepak Gir. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/DeepakGir" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <SiGithub className="w-4 h-4" /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/deepak-gir-5575733b5" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
