import { useEffect, useState, type ReactNode } from "react";
import { projects } from "./content/projects";
import type { Project } from "./types";

type View = "home" | "projects" | "about";

const skills = {
  Languages: [["Go / Golang", 95], ["Java", 90], ["Python", 85], ["Node.js / TS", 80]],
  Infrastructure: [["PostgreSQL", 90], ["Redis", 95], ["Docker / K8s", 85], ["Linux & Nginx", 90]],
  "AI & LLM": [["LLM Integration", 85], ["RAG Architectures", 80], ["LangChain Agents", 75], ["API Gateways", 90]],
};

function Arrow() { return <span className="arrow" aria-hidden="true">↗</span>; }

function Header({ view, navigate }: { view: View; navigate: (view: View) => void }) {
  const [open, setOpen] = useState(false);
  const items: Array<[View, string]> = [["home", "Home"], ["projects", "Projects"], ["about", "Tech Stack"]];
  return <header className="site-header"><button className="brand" onClick={() => navigate("home")}><span className="brand-mark">Y</span><span>yang.zx</span></button><nav className={open ? "open" : ""}>{items.map(([key, label]) => <button key={key} className={view === key ? "active" : ""} onClick={() => { navigate(key); setOpen(false); }}>{label}</button>)}<button className="nav-contact" onClick={() => { navigate("home"); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); setOpen(false); }}>Contact</button></nav><button className="menu" onClick={() => setOpen(!open)} aria-label="打开导航">☰</button></header>;
}

function Hero({ navigate }: { navigate: (view: View) => void }) {
  return <section className="hero figma-section"><div className="status-row"><span className="status-badge">● Open to opportunities</span><span className="status-badge">● Currently building</span></div><div className="hero-title"><h1>Yang Zhixiong</h1><p>// Backend / AI / DevOps Engineer</p></div><p className="hero-copy">Architecting robust high-concurrency microservices, optimizing low-latency data pipelines, and building autonomous LLM agent systems with automated cloud deployments.</p><div className="hero-links"><a className="button-dark" href="mailto:2907145367@qq.com">✉ <span>Email Me</span></a><a href="https://github.com/yanlong832-source" target="_blank" rel="noreferrer">GitHub</a><i></i><a href="mailto:2907145367@qq.com">QQ Mail</a><i></i><button onClick={() => navigate("projects")}>View Projects <Arrow /></button></div></section>;
}

function SkillsSection() {
  return <section className="figma-section skills-section" id="tech-stack"><div className="section-heading"><p>ENGINEERING CAPABILITIES</p><h2>Core Tech Stack</h2></div><div className="skills-grid">{Object.entries(skills).map(([category, rows]) => <article className="skill-card" key={category}><h3>{category}</h3><div className="skill-rows">{rows.map(([name, value]) => <div className="skill-row" key={name}><div><span>{name}</span><b>{value}%</b></div><div className="progress"><i style={{ width: `${value}%` }} /></div></div>)}</div></article>)}</div></section>;
}

function ProjectCard({ project }: { project: Project }) {
  return <article className="project-card"><div className="project-card-head"><h3>{project.name}</h3><span className={`project-status ${project.status}`}>● {project.status === "online" ? "online" : "building"}</span></div><p>{project.description}</p><div className="stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div><div className="project-card-links">{project.url && <a href={project.url} target="_blank" rel="noreferrer">Live Demo <Arrow /></a>}{project.repository && <a href={project.repository} target="_blank" rel="noreferrer">Source Code <span className="source-icon">◈</span></a>}</div></article>;
}

function ProjectsSection({ navigate }: { navigate: (view: View) => void }) {
  return <section className="figma-section projects-section"><div className="section-heading split"><div><p>PORTFOLIO</p><h2>Featured Projects</h2></div><button onClick={() => navigate("projects")}>All Projects <Arrow /></button></div><div className="projects-grid">{projects.slice(0, 3).map((project) => <ProjectCard key={project.name} project={project} />)}</div></section>;
}

function Contributions() {
  const cells = Array.from({ length: 18 * 7 }, (_, index) => (index * 17 + 3) % 5);
  return <section className="figma-section contributions"><div className="section-heading split"><div><p>OPEN SOURCE ACTIVITY</p><h2>Contribution History</h2></div><a className="contrib-count" href="https://github.com/yanlong832-source" target="_blank" rel="noreferrer">View current activity on GitHub ↗</a></div><div className="heatmap" aria-label="GitHub activity preview">{Array.from({ length: 18 }, (_, column) => <div className="heat-column" key={column}>{Array.from({ length: 7 }, (_, row) => <i className={`level-${cells[column * 7 + row]}`} key={row} />)}</div>)}</div><div className="contrib-footer"><span>Projects and experiments are documented in the repository.</span><span>Less <i className="level-0" /><i className="level-1" /><i className="level-2" /><i className="level-3" /><i className="level-4" /> More</span></div></section>;
}

function Contact() {
  return <section className="figma-section contact-section" id="contact"><div className="section-heading"><p>GET IN TOUCH</p><h2>Start a Conversation</h2></div><div className="contact-layout"><div className="contact-intro"><p>Have a technical challenge, a backend performance bottleneck, or an LLM integration project you would like to discuss? Let's talk system design.</p><div className="contact-details"><span>⌖ Guangzhou, China</span><a href="mailto:2907145367@qq.com">✉ 2907145367@qq.com</a></div></div><form onSubmit={(event) => { event.preventDefault(); window.location.href = "mailto:2907145367@qq.com"; }}><div className="form-row"><label>NAME<input placeholder="Your name" required /></label><label>EMAIL<input type="email" placeholder="you@example.com" required /></label></div><label>MESSAGE<textarea placeholder="Project requirements or discussion points..." required /></label><button className="button-dark" type="submit">Send Message</button></form></div></section>;
}

function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text: string }) { return <section className="page-intro figma-section"><p>{eyebrow}</p><h1>{title}</h1><span>{text}</span></section>; }

export default function App() {
  const [view, setView] = useState<View>("home");
  const navigate = (next: View) => { setView(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
  useEffect(() => { document.title = `${view === "home" ? "Yang Zhixiong" : view} / Backend · AI · DevOps`; }, [view]);
  return <div className="app"><Header view={view} navigate={navigate} /><main>{view === "home" ? <><Hero navigate={navigate} /><SkillsSection /><ProjectsSection navigate={navigate} /><Contributions /><Contact /></> : view === "projects" ? <><PageIntro eyebrow="PORTFOLIO / PROJECTS" title={<>All the things I<br /><em>ship and maintain.</em></>} text="Selected systems, products and experiments built around reliable backend infrastructure." /><section className="figma-section page-section"><div className="projects-grid">{projects.map((project) => <ProjectCard key={project.name} project={project} />)}</div></section></> : <><PageIntro eyebrow="ABOUT / TECH STACK" title={<>Systems thinking,<br /><em>practical delivery.</em></>} text="I design backend systems, AI integrations and deployment workflows with a bias toward clarity and measurable outcomes." /><SkillsSection /><Contact /></>}</main><footer><div><strong><i /> yang.zx</strong><p>Backend / AI / DevOps engineering with deterministic precision.</p></div><nav><a href="https://github.com/yanlong832-source" target="_blank" rel="noreferrer">GitHub</a><a href="#contact">Contact</a></nav></footer></div>;
}
