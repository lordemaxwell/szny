/* SZnY — 双语（中 / En）引擎
   data-i18n 替换文本；data-i18n-attr="attr:key;attr:key" 替换属性。
   英文原文采集自 HTML（单一来源），字典只写中文。
   跟随浏览器语言；手动切换记 localStorage['lang']。

   两条约定（维护者注意）：
   1) render() 用 textContent 改写，故 data-i18n 元素必须只含文本、无子元素
      （要带图标/SVG 时，把 data-i18n 打在内层纯文本 span 上，别打在外层）。
   2) 调用顺序：先 init()（定语言）→ 内容就位 → apply()（先采集英文再渲染）→
      之后才可 setLang()；apply 之前 setLang 会因 enCache 为空而无文可还原。 */
(function () {
  "use strict";

  var ZH = {
    /* home */
    "home.bubbleAria": "联系我",

    /* about 独白 */
    "about.l1": "高中的时候是理科生，后来误入教育学。",
    "about.l2": "没什么兴趣爱好，喜欢睡觉。",
    "about.l3": "好像总是莫名其妙地作出了错误的选择。",
    "about.l4": "想学很多东西，但很难坚持下去。",
    "about.l5": "如果时光能倒退，能重来，我一定要好好做选择，好好学习。",

    /* about 履历 */
    "resume.eduHead": "education 教育经历",
    "resume.internHead": "internship 实习经历",
    "resume.degree1": "教育学学士",
    "resume.school1": "西南大学",
    "resume.degree2": "教育学硕士",
    "resume.school2": "院校待定",
    "resume.role": "暂无",
    "resume.internNote": "以后要努力找一下。",

    /* works */
    "works.huebitBlurb": "一个蒸馏导师学术风格的小型网页 AI 实验",
    "works.huebitMeta": "2026 年 4 月 · 网页 AI",

    /* contact */
    "contact.title": "打个招呼",
    "contact.intro": "邮件是找我最快的方式——或者在网上各个角落也能找到我。",

    /* talks */
    "talks.intro": "这里用来放一些论文动态，也记录偶尔冒出来的想法和感悟。",
    "talks.filterAria": "筛选 talks",
    "talks.papers": "论文动态",
    "talks.ideas": "想法",
    "talks.reflections": "感悟",
    "talks.likeAria": "点个赞",

    /* contact 致谢 */
    "credits.head": "致谢",
    "credits.velour": "网页中的插画在这个账号得到的灵感",
    "credits.warren": "在新版中文适配中使用了这位作者的寒蝉手拙体"
  };

  var GREETINGS = {
    en: [
      "hi there :)", "oh, hey!", "you made it", "psst — leave me a note?",
      "knock knock", "say something?", "what's on your mind?", "drop me a line",
      "hello hello", "tell me something"
    ],
    zh: [
      "你好呀 ：）", "嘿，是你呀", "你来啦", "嘘——给我留句话？",
      "咚咚咚", "说点什么？", "在想什么呢？", "给我留个言吧",
      "哈喽哈喽", "跟我说点什么吧"
    ]
  };

  var enCache = {};      // 采集到的英文原文（文本 key 与 "@attr@key" 属性 key）
  var current = "en";

  function detectLang() {
    try {
      var saved = localStorage.getItem("lang");
      if (saved === "zh" || saved === "en") return saved;
    } catch (_) {}
    var nav = (navigator.language || navigator.userLanguage || "").toLowerCase();
    return nav.indexOf("zh") === 0 ? "zh" : "en";
  }

  function eachAttr(el, fn) {
    el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
      var bits = pair.split(":");
      if (bits.length < 2 || !bits[0].trim()) return;   // 跳过空段 / 漏冒号的写法
      fn(bits[0].trim(), bits[1].trim());
    });
  }

  function harvest(root) {
    root.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!(key in enCache)) enCache[key] = el.textContent;
    });
    root.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      eachAttr(el, function (attr, key) {
        var ck = "@" + attr + "@" + key;
        if (!(ck in enCache)) enCache[ck] = el.getAttribute(attr) || "";
      });
    });
  }

  function render(root) {
    root.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      el.textContent = (current === "zh" && ZH[key] != null)
        ? ZH[key] : (enCache[key] != null ? enCache[key] : el.textContent);
    });
    root.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      eachAttr(el, function (attr, key) {
        var ck = "@" + attr + "@" + key;
        var val = (current === "zh" && ZH[key] != null)
          ? ZH[key] : (enCache[ck] != null ? enCache[ck] : el.getAttribute(attr));
        el.setAttribute(attr, val);
      });
    });
  }

  function updateToggle() {
    document.querySelectorAll(".lang-btn").forEach(function (b) {
      var on = b.getAttribute("data-lang") === current;
      b.classList.toggle("active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  var I18N = {
    get current() { return current; },
    init: function () {
      current = detectLang();
      document.documentElement.lang = current;
    },
    apply: function (root) {
      root = root || document;
      harvest(root);
      render(root);
    },
    setLang: function (lang) {
      if (lang !== "zh" && lang !== "en") return;
      current = lang;
      try { localStorage.setItem("lang", lang); } catch (_) {}
      document.documentElement.lang = lang;
      render(document);
      updateToggle();
      document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: lang } }));
    },
    greetings: function () { return GREETINGS[current] || GREETINGS.en; },
    bindToggle: function (root) {
      (root || document).querySelectorAll(".lang-btn").forEach(function (b) {
        b.addEventListener("click", function () { I18N.setLang(b.getAttribute("data-lang")); });
      });
      updateToggle();
    }
  };

  window.I18N = I18N;
})();
