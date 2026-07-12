"use client";

import { useEffect, useMemo, useState } from "react";

const prompts = [
  "什么事情即使没人催，我也愿意一直做下去？",
  "如果不怕做得不够好，我今晚会开始什么？",
  "五年后的我，会感谢现在的我保留了什么？",
  "我想成为一个怎样可靠、又有趣的大人？",
];

const drawers = [
  {
    number: "01",
    title: "关于思考",
    label: "正在建立自己的坐标系",
    text: "我喜欢把模糊的问题拆开，寻找它真正卡住的地方。比起快速拥有答案，我更在意问题是否值得追下去。",
  },
  {
    number: "02",
    title: "关于制作",
    label: "把想法做成看得见的东西",
    text: "文字、网页、影像或一个小工具都可以。作品未必要宏大，它首先应该诚实，然后比昨天多解决一点问题。",
  },
  {
    number: "03",
    title: "关于生活",
    label: "认真收集不起眼的瞬间",
    text: "散步时听到的对话、一本书里折起的页角、凌晨突然想通的事——它们构成了我理解世界的隐秘索引。",
  },
];

function StarField() {
  const stars = useMemo(
    () => Array.from({ length: 22 }, (_, i) => ({
      left: `${(i * 43 + 11) % 97}%`,
      top: `${(i * 67 + 7) % 92}%`,
      delay: `${(i % 7) * 0.45}s`,
      size: `${i % 4 === 0 ? 3 : 2}px`,
    })),
    []
  );

  return (
    <div className="stars" aria-hidden="true">
      {stars.map((star, index) => (
        <i key={index} style={{ ...star, width: star.size, height: star.size }} />
      ))}
    </div>
  );
}

export default function Home() {
  const [night, setNight] = useState(false);
  const [quiet, setQuiet] = useState(false);
  const [promptIndex, setPromptIndex] = useState(0);
  const [note, setNote] = useState("");
  const [savedNote, setSavedNote] = useState("");
  const [tweaksOpen, setTweaksOpen] = useState(false);

  useEffect(() => {
    setNight(new Date().getHours() >= 18 || new Date().getHours() < 6);
    setSavedNote(window.localStorage.getItem("future-note") || "");
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = night ? "night" : "day";
    document.documentElement.dataset.motion = quiet ? "quiet" : "full";
  }, [night, quiet]);

  function saveNote(event) {
    event.preventDefault();
    const clean = note.trim();
    if (!clean) return;
    window.localStorage.setItem("future-note", clean);
    setSavedNote(clean);
    setNote("");
  }

  return (
    <main>
      <StarField />
      <div className="cursor-glow" aria-hidden="true" />

      <nav className="nav" aria-label="主导航">
        <a className="wordmark" href="#top" aria-label="返回顶部">
          <span className="mark" />
          STILL BECOMING
        </a>
        <div className="nav-links">
          <a href="#now">此刻</a>
          <a href="#drawers">抽屉</a>
          <a href="#hello">联系</a>
        </div>
        <button className="theme-button" onClick={() => setNight((value) => !value)}>
          {night ? "开灯" : "入夜"}
        </button>
      </nav>

      <header className="hero" id="top">
        <div className="eyebrow reveal">2026 · A NEW GRADUATE</div>
        <h1 className="reveal delay-one">
          你好，我刚毕业<span className="punctuation">。</span>
        </h1>
        <div className="hero-bottom reveal delay-two">
          <p className="hero-copy">
            简历还不长，<br />
            人生刚刚开始变得具体。
          </p>
          <div className="identity-ticket" aria-label="待填写的个人信息">
            <div className="ticket-top">
              <span>IDENTITY / 001</span>
              <span className="live-dot">LIVE</span>
            </div>
            <strong>你的名字</strong>
            <p>毕业于「你的学校 · 你的专业」</p>
            <small>这里暂时空着，等真实的你来填写。</small>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden="true"><span />继续往下</div>
      </header>

      <section className="manifesto" id="now">
        <p className="section-label">此刻 / NOW</p>
        <p className="manifesto-text">
          我现在没有一长串奖项，也没有一个已经讲得很圆满的故事。
          我有的是<strong>刚刚展开的时间</strong>，还没被磨平的好奇心，
          以及把小事做好的耐心。
        </p>
        <div className="status-strip" role="list" aria-label="当前状态">
          <span role="listitem">刚从大学毕业</span>
          <span role="listitem">正在寻找长期方向</span>
          <span role="listitem">对未知保持开放</span>
        </div>
      </section>

      <section className="drawers-section" id="drawers">
        <div className="section-heading">
          <div>
            <p className="section-label">三个抽屉 / THREE DRAWERS</p>
            <h2>现在值得<br />认真对待的事</h2>
          </div>
          <p>它们还算不上“成果”，更像是我愿意持续靠近的方向。</p>
        </div>
        <div className="drawers">
          {drawers.map((drawer) => (
            <article className="drawer" key={drawer.number} tabIndex="0">
              <div className="drawer-number">{drawer.number}</div>
              <div className="drawer-main">
                <p>{drawer.label}</p>
                <h3>{drawer.title}</h3>
              </div>
              <p className="drawer-detail">{drawer.text}</p>
              <span className="drawer-action" aria-hidden="true">展开阅读 ↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="question-room" aria-labelledby="question-title">
        <div className="question-index">Q / {String(promptIndex + 1).padStart(2, "0")}</div>
        <p className="section-label">最近在想 / A QUESTION TO KEEP</p>
        <h2 id="question-title">{prompts[promptIndex]}</h2>
        <button
          className="next-question"
          onClick={() => setPromptIndex((value) => (value + 1) % prompts.length)}
        >
          换一个问题 <span>→</span>
        </button>
      </section>

      <section className="note-section" id="hello">
        <div className="note-intro">
          <p className="section-label">给未来 / A SMALL TIME CAPSULE</p>
          <h2>留一句话，<br />给一年后的自己。</h2>
          <p>它只会保存在你现在使用的浏览器里。没有账号，也不会被发送到任何地方。</p>
        </div>
        <div className="note-card">
          {savedNote ? (
            <div className="saved-note" aria-live="polite">
              <p>“{savedNote}”</p>
              <small>留于今天 · 等未来重读</small>
              <button onClick={() => { window.localStorage.removeItem("future-note"); setSavedNote(""); }}>
                重新写一句
              </button>
            </div>
          ) : (
            <form onSubmit={saveNote}>
              <label htmlFor="future-note">亲爱的一年后的我：</label>
              <textarea
                id="future-note"
                value={note}
                maxLength={120}
                onChange={(event) => setNote(event.target.value)}
                placeholder="希望那时的你，仍然……"
              />
              <div className="form-bottom">
                <span>{note.length} / 120</span>
                <button type="submit" disabled={!note.trim()}>封存这句话</button>
              </div>
            </form>
          )}
        </div>
      </section>

      <footer>
        <div>
          <p className="section-label">保持联系 / SAY HELLO</p>
          <a className="email" href="mailto:YOUR_EMAIL@example.com">YOUR_EMAIL@example.com</a>
        </div>
        <div className="footer-meta">
          <p>你的城市 · CHINA</p>
          <p>DESIGNED WHILE BECOMING</p>
        </div>
        <p className="footer-line">没有完成的人生，也值得拥有一个漂亮的首页。</p>
      </footer>

      <div className={`tweaks ${tweaksOpen ? "open" : ""}`}>
        {tweaksOpen && (
          <div className="tweaks-panel">
            <strong>Tweaks</strong>
            <label>
              <span>夜间气氛</span>
              <input type="checkbox" checked={night} onChange={() => setNight((value) => !value)} />
            </label>
            <label>
              <span>安静模式</span>
              <input type="checkbox" checked={quiet} onChange={() => setQuiet((value) => !value)} />
            </label>
          </div>
        )}
        <button className="tweaks-toggle" onClick={() => setTweaksOpen((value) => !value)} aria-expanded={tweaksOpen}>
          {tweaksOpen ? "关闭" : "Tweak"}
        </button>
      </div>
    </main>
  );
}
