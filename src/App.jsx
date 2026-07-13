import { useEffect, useMemo, useState } from "react";

const routes = ["home", "about", "works", "profile", "contact"];

const copy = {
  zh: {
    langLabel: "中文",
    switchLabel: "EN",
    brand: "[Name]",
    railNote: "Public site v1",
    nav: {
      home: "首页",
      about: "关于",
      works: "作品",
      profile: "档案",
      contact: "联系",
    },
    home: {
      kicker: "个人网站 / 公开版",
      title: "[你的名字]",
      intro: "[一句公开定位：你正在做什么、关心什么、希望别人如何认识你]",
      primary: "查看作品",
      secondary: "联系我",
      privacy: "这个版本只放公开信息：作品、经历、能力、联系方式。其余内容默认不进入主页。",
      visual: "[原创头像 / 签名图形]",
    },
    about: {
      kicker: "About",
      title: "公开介绍，不写人设。",
      paragraphs: [
        "[第一段：你希望别人如何理解你的专业方向或兴趣方向。建议 80 字以内。]",
        "[第二段：你正在寻找的机会、合作或长期方向。建议 60 字以内。]",
      ],
      facts: [
        ["Name", "[你的中文名 / English Name]"],
        ["Role", "[公开身份描述，例如：产品 / 研究 / 设计 / 数据]"],
        ["Base", "[城市，可不填]"],
        ["Education", "[学校 / 专业 / 学位，可按公开程度填写]"],
        ["Focus", "[3 个公开方向，用逗号分隔]"],
      ],
    },
    works: {
      kicker: "Works",
      title: "作品区可以先空着，但结构要完整。",
      intro: "每个项目只需要说清楚：背景、你做了什么、结果或下一步。没有成果时，用过程型项目或公开实验占位。",
      image: "[4:3 项目图]",
      cta: "稍后补充详情",
      items: [
        {
          type: "Project 01",
          title: "[项目标题]",
          meta: "[类型 / 时间 / 状态]",
          copy: "[一句话说明它解决了什么问题，避免自夸]",
          palette: "yellow",
        },
        {
          type: "Project 02",
          title: "[课程或研究项目]",
          meta: "[课程 / 研究 / 小组 / 个人]",
          copy: "[你的职责、方法或产出，可留空]",
          palette: "blue",
        },
        {
          type: "Project 03",
          title: "[公开实验]",
          meta: "[prototype / essay / tool]",
          copy: "[一个可以被别人看懂的公开尝试]",
          palette: "green",
        },
        {
          type: "Project 04",
          title: "[未来项目占位]",
          meta: "[coming soon]",
          copy: "[还没准备好时，就保持占位，不编故事]",
          palette: "ink",
        },
      ],
    },
    profile: {
      kicker: "Profile",
      title: "只放可被公开验证的信息。",
      sections: [
        ["Experience", ["[教育经历]", "[实习 / 工作经历]", "[公开活动 / 组织经历]"]],
        ["Capabilities", ["[能力关键词 01]", "[能力关键词 02]", "[能力关键词 03]"]],
        ["Recognition", ["[奖项 / 证书 / 发表，可删除]", "[没有就不放]", "[只保留能被验证的内容]"]],
      ],
    },
    contact: {
      kicker: "Contact",
      title: "让别人知道如何找到你。",
      links: [
        ["Email", "YOUR_EMAIL@example.com", "mailto:YOUR_EMAIL@example.com"],
        ["GitHub", "[github 用户名]", "https://github.com/"],
        ["LinkedIn / Portfolio", "[公开链接，可删除]", "https://www.linkedin.com/"],
      ],
    },
  },
  en: {
    langLabel: "English",
    switchLabel: "中",
    brand: "[Name]",
    railNote: "Public site v1",
    nav: {
      home: "Home",
      about: "About",
      works: "Works",
      profile: "Profile",
      contact: "Contact",
    },
    home: {
      kicker: "Personal Website / Public Version",
      title: "[Your Name]",
      intro: "[One public positioning line: what you do, what you care about, and how people should understand you]",
      primary: "View Works",
      secondary: "Contact",
      privacy: "This version only shows public information: works, experience, capabilities, and contact channels.",
      visual: "[Original portrait / signature graphic]",
    },
    about: {
      kicker: "About",
      title: "A public introduction, not a persona.",
      paragraphs: [
        "[Paragraph 1: how you want people to understand your professional or creative direction. Keep it under 80 words.]",
        "[Paragraph 2: opportunities, collaborations, or long-term directions you are open to. Keep it under 60 words.]",
      ],
      facts: [
        ["Name", "[Chinese Name / English Name]"],
        ["Role", "[Public identity, e.g. product / research / design / data]"],
        ["Base", "[City, optional]"],
        ["Education", "[University / Major / Degree, only if public]"],
        ["Focus", "[3 public directions, comma-separated]"],
      ],
    },
    works: {
      kicker: "Works",
      title: "The work section can be empty, but its structure should be ready.",
      intro: "Each project only needs to explain the context, what you did, and the outcome or next step. Process projects and public experiments are valid placeholders.",
      image: "[4:3 project image]",
      cta: "Details later",
      items: [
        {
          type: "Project 01",
          title: "[Project title]",
          meta: "[Type / Time / Status]",
          copy: "[One sentence about the problem it addresses, without overselling]",
          palette: "yellow",
        },
        {
          type: "Project 02",
          title: "[Course or research project]",
          meta: "[Course / Research / Team / Solo]",
          copy: "[Your role, method, or output; can stay blank]",
          palette: "blue",
        },
        {
          type: "Project 03",
          title: "[Public experiment]",
          meta: "[prototype / essay / tool]",
          copy: "[A public attempt that others can understand]",
          palette: "green",
        },
        {
          type: "Project 04",
          title: "[Future project placeholder]",
          meta: "[coming soon]",
          copy: "[Keep the placeholder when it is not ready. Do not invent a story.]",
          palette: "ink",
        },
      ],
    },
    profile: {
      kicker: "Profile",
      title: "Only show information that can be publicly verified.",
      sections: [
        ["Experience", ["[Education]", "[Internship / Work experience]", "[Public activities / Organizations]"]],
        ["Capabilities", ["[Capability keyword 01]", "[Capability keyword 02]", "[Capability keyword 03]"]],
        ["Recognition", ["[Awards / Certificates / Publications, optional]", "[Remove this section if empty]", "[Keep only verifiable items]"]],
      ],
    },
    contact: {
      kicker: "Contact",
      title: "Make it clear how people can reach you.",
      links: [
        ["Email", "YOUR_EMAIL@example.com", "mailto:YOUR_EMAIL@example.com"],
        ["GitHub", "[github username]", "https://github.com/"],
        ["LinkedIn / Portfolio", "[public link, optional]", "https://www.linkedin.com/"],
      ],
    },
  },
};

function normalizeRoute(value) {
  return routes.includes(value) ? value : "home";
}

function DoodleField({ label }) {
  const dots = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        left: `${(index * 37 + 8) % 88}%`,
        top: `${(index * 53 + 14) % 78}%`,
        animationDelay: `${(index % 5) * 0.18}s`,
      })),
    []
  );

  return (
    <div className="doodle-field" aria-label={label}>
      <div className="doodle-paper">
        <span className="doodle-label">{label}</span>
        <div className="doodle-line one" />
        <div className="doodle-line two" />
        <div className="doodle-line three" />
        {dots.map((dot, index) => (
          <i key={index} style={dot} />
        ))}
      </div>
    </div>
  );
}

function HomePage({ text, setPage }) {
  return (
    <section className="page page-home" aria-labelledby="home-title">
      <div className="hero-copy">
        <p className="kicker">{text.kicker}</p>
        <h1 id="home-title">{text.title}</h1>
        <p className="standfirst">{text.intro}</p>
        <div className="hero-actions">
          <button type="button" onClick={() => setPage("works")}>
            {text.primary}
          </button>
          <button type="button" className="ghost" onClick={() => setPage("contact")}>
            {text.secondary}
          </button>
        </div>
      </div>
      <DoodleField label={text.visual} />
      <p className="privacy-line">{text.privacy}</p>
    </section>
  );
}

function AboutPage({ text }) {
  return (
    <section className="page page-split" aria-labelledby="about-title">
      <div>
        <p className="kicker">{text.kicker}</p>
        <h2 id="about-title">{text.title}</h2>
      </div>
      <div className="about-copy">
        {text.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <ul className="fact-list">
          {text.facts.map(([label, value]) => (
            <li key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function WorksPage({ text, setPage }) {
  return (
    <section className="page page-works" aria-labelledby="works-title">
      <div className="section-head">
        <p className="kicker">{text.kicker}</p>
        <h2 id="works-title">{text.title}</h2>
        <p>{text.intro}</p>
      </div>
      <div className="work-grid">
        {text.items.map((work) => (
          <article className={`work-card ${work.palette}`} key={work.type}>
            <div className="work-image">
              <span>{text.image}</span>
            </div>
            <div className="work-meta">
              <span>{work.type}</span>
              <span>{work.meta}</span>
            </div>
            <h3>{work.title}</h3>
            <p>{work.copy}</p>
            <button type="button" onClick={() => setPage("contact")}>
              {text.cta}
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProfilePage({ text }) {
  return (
    <section className="page page-profile" aria-labelledby="profile-title">
      <div className="profile-title">
        <p className="kicker">{text.kicker}</p>
        <h2 id="profile-title">{text.title}</h2>
      </div>
      <div className="profile-columns">
        {text.sections.map(([title, items]) => (
          <article key={title}>
            <h3>{title}</h3>
            <ul>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function ContactPage({ text }) {
  return (
    <section className="page page-contact" aria-labelledby="contact-title">
      <p className="kicker">{text.kicker}</p>
      <h2 id="contact-title">{text.title}</h2>
      <div className="contact-grid">
        {text.links.map(([label, value, href]) => (
          <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>
            <span>{label}</span>
            <strong>{value}</strong>
          </a>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [language, setLanguage] = useState("zh");
  const [page, setPageState] = useState(() => {
    if (typeof window === "undefined") return "home";
    return normalizeRoute(window.location.hash.replace("#", ""));
  });

  const text = copy[language];

  useEffect(() => {
    document.documentElement.dataset.nav = navOpen ? "open" : "closed";
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [navOpen, language]);

  useEffect(() => {
    const onHashChange = () => setPageState(normalizeRoute(window.location.hash.replace("#", "")));
    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("popstate", onHashChange);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("popstate", onHashChange);
    };
  }, []);

  function setPage(nextPage) {
    const normalized = normalizeRoute(nextPage);
    setPageState(normalized);
    setNavOpen(false);
    if (window.location.hash !== `#${normalized}`) {
      window.history.pushState(null, "", `#${normalized}`);
    }
  }

  function renderPage() {
    if (page === "about") return <AboutPage text={text.about} />;
    if (page === "works") return <WorksPage text={text.works} setPage={setPage} />;
    if (page === "profile") return <ProfilePage text={text.profile} />;
    if (page === "contact") return <ContactPage text={text.contact} />;
    return <HomePage text={text.home} setPage={setPage} />;
  }

  return (
    <main className="site-shell">
      <aside className="side-rail" aria-label="Site navigation">
        <button className="brand" type="button" onClick={() => setPage("home")}>
          <span className="brand-mark" />
          <span>{text.brand}</span>
        </button>
        <div className="mobile-actions">
          <button className="lang-toggle" type="button" onClick={() => setLanguage(language === "zh" ? "en" : "zh")}>
            {text.switchLabel}
          </button>
          <button className="menu-toggle" type="button" onClick={() => setNavOpen((value) => !value)}>
            {navOpen ? "Close" : "Menu"}
          </button>
        </div>
        <nav className="nav-list">
          {routes.map((route) => (
            <button
              key={route}
              type="button"
              className={page === route ? "active" : ""}
              aria-current={page === route ? "page" : undefined}
              onClick={() => setPage(route)}
            >
              <span>{text.nav[route]}</span>
              <small>{route}</small>
            </button>
          ))}
        </nav>
        <button className="rail-lang" type="button" onClick={() => setLanguage(language === "zh" ? "en" : "zh")}>
          <span>{text.langLabel}</span>
          <strong>{text.switchLabel}</strong>
        </button>
        <p className="rail-note">{text.railNote}</p>
      </aside>

      <div className="page-stage" key={`${language}-${page}`}>
        {renderPage()}
      </div>
    </main>
  );
}
