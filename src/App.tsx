import { useEffect, useState } from "react";
import { projects, skills } from "./content/site";
import issueData from "./data/issues.json";
import type { Issue, Project } from "./types";

type View = "home" | "projects" | "blog" | "about";
const issues = issueData as Issue[];

function Arrow() { return <span className="arrow" aria-hidden="true">↗</span>; }
function formatDate(value: string) { return new Date(value).toLocaleDateString("zh-CN", { year: "numeric", month: "short", day: "numeric" }); }

function Header({ view, navigate }: { view: View; navigate: (view: View) => void }) {
  const [open, setOpen] = useState(false);
  const items: Array<[View, string]> = [["home", "首页"], ["projects", "项目"], ...(issues.length ? [["blog", "博客"] as [View, string]] : []), ["about", "技术栈"]];
  return <header className="site-header"><nav className={open ? "open" : ""}>{items.map(([key, label]) => <button key={key} className={view === key ? "active" : ""} onClick={() => { navigate(key); setOpen(false); }}>{label}</button>)}</nav><button className="menu" onClick={() => setOpen(!open)} aria-label="打开导航">☰</button></header>;
}

function Hero({ navigate }: { navigate: (view: View) => void }) {
  return <section className="hero figma-section"><div className="hero-title"><h1>杨智雄</h1><p>// 后端 / AI / DevOps 工程师</p></div><p className="hero-copy">专注高并发服务、低延迟数据链路和 LLM Agent 系统，使用自动化云部署把可靠的工程方案交付到线上。</p><div className="hero-links"><a className="github-link" href="https://github.com/yanlong832-source" target="_blank" rel="noreferrer" aria-label="打开 GitHub 主页" title="GitHub 主页"><svg className="github-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.54-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.76.84 1.23 1.91 1.23 3.22 0 4.62-2.81 5.64-5.48 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" /></svg></a><i></i><a className="qq-link" href="mailto:2907145367@qq.com" aria-label="发送 QQ 邮箱" title="QQ 邮箱"><svg className="qq-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg></a></div></section>;
}

function SkillsSection() {
  return <section className="figma-section skills-section" id="tech-stack"><div className="section-heading"><p>工程能力</p><h2>核心技术栈</h2></div><div className="skills-grid">{Object.entries(skills).map(([category, rows]) => <article className="skill-card" key={category}><h3>{category}</h3><div className="skill-rows">{rows.map((skill) => <div className="skill-row" key={skill.name}><div className="skill-row-title"><span>{skill.name}</span><b>{skill.level}</b></div><p>{skill.details}</p></div>)}</div></article>)}</div></section>;
}

function ProjectCard({ project }: { project: Project }) {
  const status = project.status === "online" ? "运行中" : project.status === "building" ? "开发中" : "已归档";
  return <article className={`project-card project-card--${project.accent}`}><div className="project-visual">{project.image ? <img className="project-preview" src={project.image} alt={`${project.name} 项目预览`} loading="lazy" /> : <div className="project-placeholder" aria-label={`${project.name} 项目预览`}><span>{project.name.slice(0, 2).toUpperCase()}</span><small>项目预览</small></div>}<div className="project-visual-top"><span className="project-number">{String(projects.indexOf(project) + 1).padStart(2, "0")}</span><span className={`project-status ${project.status}`}>● {status}</span></div><div className="project-visual-bottom"><span className="project-kicker">{project.tags[0] || "项目"}</span><span className="project-open" aria-hidden="true">↗</span></div></div><div className="project-card-body"><div className="project-card-head"><h3>{project.name}</h3></div><p>{project.description}</p><div className="stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div><div className="project-card-links">{project.url && <a href={project.url} target="_blank" rel="noreferrer">在线预览 <Arrow /></a>}{project.repository && <a href={project.repository} target="_blank" rel="noreferrer">源代码 <span className="source-icon">◈</span></a>}</div></div></article>;
}

function ProjectsSection({ navigate }: { navigate: (view: View) => void }) {
  return <section className="figma-section projects-section"><div className="section-heading split"><div><p>项目作品</p><h2>精选项目</h2></div><button onClick={() => navigate("projects")}>全部项目 <Arrow /></button></div><div className="projects-grid">{projects.slice(0, 3).map((project) => <ProjectCard key={project.name} project={project} />)}</div></section>;
}

function IssueStats({ issue }: { issue: Issue }) { return <div className="blog-stats"><span>♥ {issue.likes}</span><span>评论 {issue.comments}</span></div>; }

function BlogSection({ onOpen, navigate, full = false }: { onOpen: (issue: Issue) => void; navigate: (view: View) => void; full?: boolean }) {
  if (!issues.length) return null;
  const items = full ? issues : issues.slice(0, 3);
  return <section className={`figma-section blog-section ${full ? "blog-section--full" : ""}`}><div className="section-heading split"><div><p>公开日志</p><h2>{full ? "博客流水" : "最新文章"}</h2></div>{!full && <button onClick={() => navigate("blog")}>进入博客 <Arrow /></button>}</div><div className="blog-flow">{items.map((issue, index) => <button className="blog-card" key={issue.number} onClick={() => onOpen(issue)}><div className="blog-rail"><strong>{String(index + 1).padStart(2, "0")}</strong><span>{formatDate(issue.updated_at)}</span></div><div className="blog-card-main"><div className="blog-card-top"><span>ISSUE #{String(issue.number).padStart(3, "0")}</span><IssueStats issue={issue} /></div><h3>{issue.title}</h3><p>{issue.body || "这篇文章还没有正文，点击进入 GitHub Issue 查看详情。"}</p><div className="tag-list">{issue.labels.length ? issue.labels.slice(0, 3).map((label) => <span key={label}>● {label}</span>) : <span>● 未分类</span>}</div></div><span className="blog-card-arrow" aria-hidden="true">↗</span></button>)}</div></section>;
}

function IssueDetail({ issue, onBack }: { issue: Issue; onBack: () => void }) {
  return <section className="article"><button className="back" onClick={onBack}>← 返回博客</button><p className="eyebrow">ISSUE #{String(issue.number).padStart(3, "0")} · {issue.labels.join(" / ") || "公开日志"}</p><h1>{issue.title}</h1><div className="article-date"><span>更新于 {formatDate(issue.updated_at)}</span><IssueStats issue={issue} /></div><div className="article-body">{(issue.body || "这篇 Issue 还没有正文。").split(/\n\n+/).map((part, index) => <p key={index}>{part}</p>)}</div><div className="comments"><div className="comments-head"><span>讨论与互动</span><a href={issue.html_url} target="_blank" rel="noreferrer">在 GitHub 查看 <Arrow /></a></div><p>点赞和评论会同步自这个 GitHub Issue。</p></div></section>;
}

export default function App() {
  const [view, setView] = useState<View>("home");
  const [activeIssue, setActiveIssue] = useState<Issue | null>(null);
  const navigate = (next: View) => { setView(next); setActiveIssue(null); window.scrollTo({ top: 0, behavior: "smooth" }); };
  useEffect(() => { document.title = `${view === "home" ? "杨智雄" : view === "projects" ? "项目" : view === "blog" ? "博客" : "技术栈"} / 后端 · AI · DevOps`; }, [view]);
  return <div className="app"><Header view={view} navigate={navigate} /><main>{activeIssue ? <IssueDetail issue={activeIssue} onBack={() => setActiveIssue(null)} /> : view === "home" ? <Hero navigate={navigate} /> : view === "projects" ? <section className="figma-section page-section"><div className="section-heading"><p>项目 / 作品</p><h2>精选项目</h2></div><div className="projects-grid projects-masonry">{projects.map((project) => <ProjectCard key={project.name} project={project} />)}</div></section> : view === "blog" && issues.length ? <BlogSection onOpen={setActiveIssue} navigate={navigate} full /> : <SkillsSection />}</main></div>;
}
