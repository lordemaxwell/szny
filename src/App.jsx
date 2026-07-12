import { useEffect, useMemo, useState } from "react";

const navItems = [
  ["home", "Home"],
  ["about", "About"],
  ["works", "Works"],
  ["profile", "Profile"],
  ["contact", "Contact"],
];

const profileFacts = [
  ["Name", "[你的中文名 / English Name]"],
  ["Role", "[公开身份描述，例如：产品 / 研究 / 设计 / 数据]"],
  ["Base", "[城市，可不填]"],
  ["Education", "[学校 / 专业 / 学位，可按公开程度填写]"],
  ["Focus", "[3 个公开方向，用逗号分隔]"],
];

const works = [
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
];

const publicSections = [
  {
    title: "Experience",
    items: ["[教育经历]", "[实习 / 工作经历]", "[公开活动 / 组织经历]"],
  },
  {
    title: "Capabilities",
    items: ["[能力关键词 01]", "[能力关键词 02]", "[能力关键词 03]"],
  },
  {
    title: "Recognition",
    items: ["[奖项 / 证书 / 发表，可删除]", "[没有就不放]", "[只保留能被验证的内容]"],
  },
];

function DoodleField() {
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
    <div className="doodle-field" aria-label="原创视觉资产占位">
      <div className="doodle-paper">
        <span className="doodle-label">[原创头像 / 签名图形]</span>
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

export default function App() {
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.nav = navOpen ? "open" : "closed";
  }, [navOpen]);

  return (
    <main className="site-shell">
      <aside className="side-rail" aria-label="站点导航">
        <a className="brand" href="#home" onClick={() => setNavOpen(false)}>
          <span className="brand-mark" />
          <span>[Name]</span>
        </a>
        <button className="menu-toggle" type="button" onClick={() => setNavOpen((value) => !value)}>
          {navOpen ? "Close" : "Menu"}
        </button>
        <nav className="nav-list">
          {navItems.map(([href, label]) => (
            <a key={href} href={`#${href}`} onClick={() => setNavOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <p className="rail-note">Public site v0</p>
      </aside>

      <section className="hero-section" id="home">
        <div className="hero-copy">
          <p className="kicker">Personal Website / Public Version</p>
          <h1>[你的名字]</h1>
          <p className="standfirst">[一句公开定位：你正在做什么、关心什么、希望别人如何认识你]</p>
          <div className="hero-actions">
            <a href="#works">View Works</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <DoodleField />
        <p className="privacy-line">这个版本只放公开信息：作品、经历、能力、联系方式。其余内容默认不进入主页。</p>
      </section>

      <section className="content-section about-grid" id="about">
        <div>
          <p className="kicker">About</p>
          <h2>公开介绍，不写人设。</h2>
        </div>
        <div className="about-copy">
          <p>[第一段：你希望别人如何理解你的专业方向或兴趣方向。建议 80 字以内。]</p>
          <p>[第二段：你正在寻找的机会、合作或长期方向。建议 60 字以内。]</p>
          <ul className="fact-list">
            {profileFacts.map(([label, value]) => (
              <li key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="content-section works-section" id="works">
        <div className="section-head">
          <p className="kicker">Works</p>
          <h2>作品区可以先空着，但结构要完整。</h2>
          <p>每个项目只需要说清楚：背景、你做了什么、结果或下一步。没有成果时，用过程型项目或公开实验占位。</p>
        </div>
        <div className="work-grid">
          {works.map((work) => (
            <article className={`work-card ${work.palette}`} key={work.type}>
              <div className="work-image">
                <span>[4:3 项目图]</span>
              </div>
              <div className="work-meta">
                <span>{work.type}</span>
                <span>{work.meta}</span>
              </div>
              <h3>{work.title}</h3>
              <p>{work.copy}</p>
              <a href="#contact">Details later</a>
            </article>
          ))}
        </div>
      </section>

      <section className="profile-band" id="profile">
        <div className="profile-title">
          <p className="kicker">Profile</p>
          <h2>只放可被公开验证的信息。</h2>
        </div>
        <div className="profile-columns">
          {publicSections.map((section) => (
            <article key={section.title}>
              <h3>{section.title}</h3>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <p className="kicker">Contact</p>
        <h2>让别人知道如何找到你。</h2>
        <div className="contact-grid">
          <a href="mailto:YOUR_EMAIL@example.com">
            <span>Email</span>
            <strong>YOUR_EMAIL@example.com</strong>
          </a>
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            <span>GitHub</span>
            <strong>[github 用户名]</strong>
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
            <span>LinkedIn / Portfolio</span>
            <strong>[公开链接，可删除]</strong>
          </a>
        </div>
      </section>
    </main>
  );
}
