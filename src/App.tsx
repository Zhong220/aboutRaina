import { useEffect, useState } from "react";
import "./App.css";

function FieldCard(props: {
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button className="card" onClick={props.onClick} type="button">
      <div className="cardTitle">{props.title}</div>
      <div className="cardSub">{props.subtitle}</div>
      <div className="cardHint">Click to expand →</div>
    </button>
  );
}

function Modal(props: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!props.open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") props.onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [props.open, props.onClose]);

  if (!props.open) return null;

  return (
    <div className="modalOverlay" onMouseDown={props.onClose}>
      <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <h2 className="modalTitle">{props.title}</h2>
          <button className="iconBtn" onClick={props.onClose} type="button">
            ✕
          </button>
        </div>
        <div className="modalBody">{props.children}</div>
      </div>
    </div>
  );
}

export default function App() {
  const [openId, setOpenId] = useState<"about" | "projects" | "skills" | null>(null);

  const modalTitle =
    openId === "about" ? "About" : openId === "projects" ? "Projects" : openId === "skills" ? "Skills" : "";

  return (
    <div className="page">
      <div className="container">
        {/* Top / Hero */}
        <header className="hero">
          <div className="heroLeft">
            <div className="avatar" aria-label="Profile photo">
              <img src={`${import.meta.env.BASE_URL}avatar.jpg`} alt="Raina Huang" />
            </div>
          </div>

          <div className="heroRight">
            <h1 className="headline">
              Hi, I’m <span className="accent">Raina</span>
            </h1>

            <p className="subhead">
              我在做前端與全端專案，喜歡把需求拆成可交付的小步驟，並用 CI/CD 把部署自動化。
              目前專注：React / TypeScript、API 串接、Docker、GitHub Actions。
            </p>

            <div className="ctaRow">
              <button className="btn primary" type="button" onClick={() => setOpenId("projects")}>
                View Projects
              </button>
              <button className="btn ghost" type="button" onClick={() => setOpenId("about")}>
                Read About
              </button>
            </div>
          </div>
        </header>

        {/* Cards */}
        <main className="cards">
          <FieldCard title="About" subtitle="我是誰 · 我的定位" onClick={() => setOpenId("about")} />
          <FieldCard title="Projects" subtitle="作品集" onClick={() => setOpenId("projects")} />
          <FieldCard title="Skills" subtitle="技能" onClick={() => setOpenId("skills")} />
        </main>

        {/* Sections (可選：之後你可以用更完整內容取代) */}
        <section className="section">
          <h2 className="sectionTitle">Experience</h2>
          <div className="timeline">
            <div className="timelineItem">
              <div className="dot" />
              <div className="timelineContent">
                <div className="timelineTop">
                  <strong>Project / Internship Title</strong>
                  <span className="muted">2025 — Present</span>
                </div>
                <p className="muted">
                  用一句話描述你做了什麼（例如：負責前端頁面與 API 串接，並建立 GitHub Actions 自動部署）。
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="contactRow">
            <a className="contactBtn" href="https://github.com/Zhong220" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="contactBtn" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="contactBtn" href="mailto:YOUR_EMAIL@example.com">
              Email
            </a>
            <a className="contactBtn" href={`${import.meta.env.BASE_URL}resume.pdf`} target="_blank" rel="noreferrer">
              Resume
            </a>
          </div>
          <div className="copyright muted">© {new Date().getFullYear()} Raina Huang</div>
        </footer>
      </div>

      <Modal open={openId !== null} title={modalTitle} onClose={() => setOpenId(null)}>
        {openId === "about" ? (
          <div>
            <p>我是一位資工系學生，喜歡做 UI/UX 乾淨、可維護的前端架構，並且能把部署流程自動化。</p>
            <ul>
              <li>關注：React + TypeScript、元件化、狀態管理</li>
              <li>習慣：寫 README、分支管理、把需求拆成可交付的 commit</li>
            </ul>
          </div>
        ) : openId === "projects" ? (
          <ul>
            <li>Project A：一句話亮點（技術 / 你負責的部分 / 成果）</li>
            <li>Project B：一句話亮點（技術 / 你負責的部分 / 成果）</li>
          </ul>
        ) : openId === "skills" ? (
          <div className="chipGrid">
            <span className="chip">React</span>
            <span className="chip">TypeScript</span>
            <span className="chip">Git</span>
            <span className="chip">GitHub Actions</span>
            <span className="chip">Docker</span>
            <span className="chip">REST API</span>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

