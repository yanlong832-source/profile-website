import { useEffect, useState, type ReactNode } from "react";
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
  return <header className="site-header"><button className="brand" onClick={() => navigate("home")}><span className="brand-mark">Y</span><span>杨泽鑫</span></button><nav className={open ? "open" : ""}>{items.map(([key, label]) => <button key={key} className={view === key ? "active" : ""} onClick={() => { navigate(key); setOpen(false); }}>{label}</button>)}</nav><button className="menu" onClick={() => setOpen(!open)} aria-label="打开导航">☰</button></header>;
}

function Hero({ navigate }: { navigate: (view: View) => void }) {
  return <section className="hero figma-section"><div className="status-row"><span className="status-badge">● 开放合作机会</span><span className="status-badge">● 正在持续构建</span></div><div className="hero-title"><h1>杨泽鑫</h1><p>// 后端 / AI / DevOps 工程师</p></div><p className="hero-copy">专注高并发微服务、低延迟数据链路和 LLM Agent 系统，使用自动化云部署把可靠的工程方案交付到线上。</p><div className="hero-links"><a className="button-dark" href="mailto:2907145367@qq.com">✉ <span>邮件联系</span></a><a href="https://github.com/yanlong832-source" target="_blank" rel="noreferrer">GitHub</a><i></i><a href="mailto:2907145367@qq.com">QQ 邮箱</a><i></i><button onClick={() => navigate("projects")}>查看项目 <Arrow /></button></div></section>;
}

function SkillsSection() {
  return <section className="figma-section skills-section" id="tech-stack"><div className="section-heading"><p>工程能力</p><h2>核心技术栈</h2></div><div className="skills-grid">{Object.entries(skills).map(([category, rows]) => <article className="skill-card" key={category}><h3>{category === "Languages" ? "编程语言" : category === "Infrastructure" ? "基础设施" : "AI 与大模型"}</h3><div className="skill-rows">{rows.map(([name, value]) => <div className="skill-row" key={name}><div><span>{name}</span><b>{value}%</b></div><div className="progress"><i style={{ width: `${value}%` }} /></div></div>)}</div></article>)}</div></section>;
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

function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: ReactNode; text: string }) { return <section className="page-intro figma-section"><p>{eyebrow}</p><h1>{title}</h1><span>{text}</span></section>; }

export default function App() {
  const [view, setView] = useState<View>("home");
  const [activeIssue, setActiveIssue] = useState<Issue | null>(null);
  const navigate = (next: View) => { setView(next); setActiveIssue(null); window.scrollTo({ top: 0, behavior: "smooth" }); };
  useEffect(() => { document.title = `${view === "home" ? "杨泽鑫" : view === "projects" ? "项目" : view === "blog" ? "博客" : "技术栈"} / 后端 · AI · DevOps`; }, [view]);
  return <div className="app"><Header view={view} navigate={navigate} /><main>{activeIssue ? <IssueDetail issue={activeIssue} onBack={() => setActiveIssue(null)} /> : view === "home" ? <><Hero navigate={navigate} /><SkillsSection /><ProjectsSection navigate={navigate} /><BlogSection onOpen={setActiveIssue} navigate={navigate} /></> : view === "projects" ? <><PageIntro eyebrow="项目 / 作品" title={<>我正在<br /><em>构建和维护的系统。</em></>} text="围绕可靠后端基础设施打造的产品、工具和实验。" /><section className="figma-section page-section"><div className="projects-grid">{projects.map((project) => <ProjectCard key={project.name} project={project} />)}</div></section></> : view === "blog" && issues.length ? <><PageIntro eyebrow="博客 / 公开日志" title={<>把实践<br /><em>写成可复用的经验。</em></>} text="文章来自 GitHub Issues，按时间顺序记录正在探索的问题。" /><BlogSection onOpen={setActiveIssue} navigate={navigate} full /></> : <><PageIntro eyebrow="关于 / 技术栈" title={<>系统思考，<br /><em>务实交付。</em></>} text="我设计后端系统、AI 集成和部署流程，重视清晰度、稳定性与可度量的结果。" /><SkillsSection /></>}</main><footer><div><strong><i /> 杨泽鑫</strong><p>专注后端、AI 与 DevOps 工程实践。</p></div><nav><a href="https://github.com/yanlong832-source" target="_blank" rel="noreferrer">GitHub</a></nav></footer></div>;
}
