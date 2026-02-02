import { useEffect, useState, type ReactNode } from "react";
import "./App.css";

const resume = {
  name: "Raina Huang",
  hero: {
    greeting: "Hi, I'm",
    accent: "Raina",
    summary:
      "This is my personal space online. At the moment, you’ll find a few projects I’ve worked on and a little introduction about me. I’m planning to keep building it up—slowly adding more learning notes and hands-on practice as I grow.",
  },
  contact: {
    github: "https://github.com/Zhong220",
    linkedin: "https://www.linkedin.com/in/容-黃-a549713a9/",
    email: "hrrong422@example.com",
    resumePdfHref: `${import.meta.env.BASE_URL}resume2.pdf`,
  },
  about: {
    education: [
      {
        school: "National Chengchi University (NCCU)",
        degree: "B.S. in Computer Science",
        time: "Sep 2021 — Jan 2026 (Expected)",
        coursework: [
          "Distributed Systems",
          "Cloud-Native System Development & Operations",
          "Operating Systems",
          "Database Systems",
          "Computer Networks",
          "Data Structures & Algorithms",
          "Object-Oriented Programming",
          "Computer Structure and Organization",
        ],
      },
    ],
  },
  experience: [
    {
      title: "Part-time Assistant",
      org: "NCCU Maker Space",
      time: " Jul 2023 — Oct 2025",
      desc:
        "Supported daily operations and helped with equipment training (laser cutting / heat press / 3D printing). Also assisted workshops and troubleshooting.",
    },
    {
      title: "Project Assistant",
      org: "Taiwan United University System (NCCU Office)",
      time: "Mar 2025 — Aug 2025",
    },
    {
      title: "Project Assistant",
      org: "Inclusive Wenshan Community Co-creation Program (NCCU College of Social Sciences)",
      time: "Aug 2025 - Oct 2025",
    },
  ],
  projects: [
    {
      name: "Carbon Manager",
      stack: "React/TypeScript · Flask · DB Design",
      overview:
        "Built a full-stack prototype for managing carbon footprint records, including a web UI, REST APIs, and a relational schema. Implemented core CRUD and validated end-to-end integration across frontend, backend, and database.",
    },
    {
      name: "Microservices + etcd 3-node cluster",
      stack: " Flask · PostgreSQL · etcd · Docker",
      overview:
        "Deployed multiple Flask microservices with PostgreSQL using Docker Compose and a dedicated service network. Implemented service registration and centralized configuration via an etcd 3-node cluster with watch-based updates, and improved reliability with health checks and dependency ordering.",
    },
    {
      name: "Mixed Han Character Translation",
      stack: "Prompting · Fine-tuning · Evaluation",
      overview:
        "Built and tested a dictionary-assisted translation workflow for Chinese/Japanese/Taiwanese code-mixed text. Reduced incorrect dictionary replacements using negative samples and evaluated outputs with sentence-embedding similarity.",
    },
    {
      name: "CI Automation Demo — Resume Website",
      stack: "GitHub Actions · JavaScript · Bash",
      overview:
        "Built a resume website and set up a lightweight CI workflow in GitHub Actions. Automated lint/build checks on each push to keep the project deploy-ready.",
    },
  ],
  skills: [
    "Python",
    "JavaScript",
    "TypeScript",
    "Bash/Shell",
    "HTML/CSS",
    "C/C++",
    "Git",
    "Linux",
    "Docker",
    "Flask",
    "PostgreSQL",
    "etcd",
    "Docker Compose",
    "Kubernetes (K3s)",
    "k6",
    "React",
    "Vite",
    "styled-components",
  ],
};

function FieldCard(props: { title: string; subtitle: string; onClick: () => void }) {
  return (
    <button className="card" onClick={props.onClick} type="button">
      <div className="cardTitle">{props.title}</div>
      <div className="cardSub">{props.subtitle}</div>
      <div className="cardHint">Click to expand →</div>
    </button>
  );
}

function Modal(props: { open: boolean; title: string; children: ReactNode; onClose: () => void }) {
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
    <div
      className="modalOverlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) props.onClose();
      }}
    >
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
        <header className="hero">
          <div className="heroLeft">
            <div className="avatar" aria-label="Profile photo">
              <img src={`${import.meta.env.BASE_URL}zhong.jpg`} alt={resume.name} />
            </div>
          </div>

          <div className="heroRight">
            <h1 className="headline">
              {resume.hero.greeting} <span className="accent">{resume.hero.accent}</span>
            </h1>

            <p className="subhead">{resume.hero.summary}</p>

            <div className="ctaRow">
              <a className="btn primary" href={resume.contact.resumePdfHref} target="_blank" rel="noreferrer">
                Resume
              </a>

              <button
                className="btn ghost"
                type="button"
                onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
              >
                See Experience
              </button>
            </div>
          </div>
        </header>

        <main className="cards">
          <FieldCard title="About" subtitle="Education" onClick={() => setOpenId("about")} />
          <FieldCard title="Projects" subtitle="Overview" onClick={() => setOpenId("projects")} />
          <FieldCard title="Skills" subtitle="Toolbox" onClick={() => setOpenId("skills")} />
        </main>

        <section className="section" id="experience">
          <h2 className="sectionTitle">Experience</h2>
          <div className="timeline">
            {resume.experience.map((item, idx) => (
              <div className="timelineItem" key={`${item.title}-${item.time}-${idx}`}>
                <div className="dot" />
                <div className="timelineContent">
                  <div className="timelineTop">
                    <strong>
                      {item.title}
                      {item.org ? <span className="muted"> · {item.org}</span> : null}
                    </strong>
                    <span className="muted">{item.time}</span>
                  </div>
                  {item.desc ? <p className="muted">{item.desc}</p> : null}
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="footer">
          <div className="contactRow">
            <a className="contactBtn" href={resume.contact.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="contactBtn" href={resume.contact.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="contactBtn" href={`mailto:${resume.contact.email}`}>
              Email
            </a>
            <a className="contactBtn" href={resume.contact.resumePdfHref} target="_blank" rel="noreferrer">
              Resume
            </a>
          </div>
          <div className="copyright muted">
            © {new Date().getFullYear()} {resume.name}
          </div>
        </footer>
      </div>

      <Modal open={openId !== null} title={modalTitle} onClose={() => setOpenId(null)}>
        {openId === "about" ? (
          <div>
            <p className="muted" style={{ marginTop: 0 }}>
              Education
            </p>

            <ul style={{ marginTop: 0 }}>
              {resume.about.education.map((e) => (
                <li key={`${e.school}-${e.time}`}>
                  <strong>{e.school}</strong> — {e.degree} <span className="muted">{e.time}</span>
                </li>
              ))}
            </ul>

            {resume.about.education[0]?.coursework?.length ? (
              <>
                <p className="muted" style={{ marginTop: 12 }}>
                  Relevant Coursework
                </p>
                <ul style={{ marginTop: 0 }}>
                  {resume.about.education[0].coursework.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        ) : openId === "projects" ? (
          <div>
            {resume.projects.map((p) => (
              <div key={p.name} style={{ marginBottom: 14 }}>
                <div className="timelineTop" style={{ marginBottom: 6 }}>
                  <strong>{p.name}</strong>
                  <span className="muted">{p.stack}</span>
                </div>
                <p className="muted" style={{ marginTop: 0 }}>
                  {p.overview}
                </p>
              </div>
            ))}
          </div>
        ) : openId === "skills" ? (
          <div className="chipGrid">
            {resume.skills.map((s) => (
              <span className="chip" key={s}>
                {s}
              </span>
            ))}
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
