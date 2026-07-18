/* talks. — 列表 + 详情 + 星星彩蛋
   构建脚本从 content/talks/*.md 生成 posts.json 与双语正文。
   依赖 window.I18N(语言)与 window.marked(详情页 markdown)。 */
(function () {
  "use strict";

  /* talks 专属动态文案(页面外壳走 i18n;这里只放列表/详情里 JS 生成的少量字) */
  var STR = {
    en: { empty: "nothing here yet." },
    zh: { empty: "这里还什么都没有。" }
  };
  var talkConfig = { intro: {}, tags: {} };
  function lang() { return (window.I18N && window.I18N.current) || "en"; }
  function t(k) { return (STR[lang()] || STR.en)[k]; }
  function localized(value) {
    if (window.SiteContent) return window.SiteContent.localized(value, lang());
    if (typeof value === "string") return value;
    return (value && (value[lang()] || value.zh || value.en)) || "";
  }
  function tagLabel(tag) {
    return localized(talkConfig.tags && talkConfig.tags[tag]) || tag;
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c];
    });
  }

  function fetchPosts() {
    return fetch("/talks/posts.json").then(function (r) {
      if (!r.ok) throw new Error("posts.json " + r.status);
      return r.json();
    });
  }

  function byDateDesc(a, b) {
    return a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
  }

  function fmtDate(iso, l) {
    var d = new Date(iso + "T00:00:00");
    if (l === "zh") {
      return d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日";
    }
    var m = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
             "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return m[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
  }

  /* ---------- 列表页 ---------- */
  var listState = { posts: [], filter: null };

  function matches(post) {
    if (!listState.filter) return true;
    return (post.tags || []).indexOf(listState.filter) !== -1;
  }

  function renderList(listEl) {
    var l = lang();
    var items = listState.posts.filter(matches);
    if (!items.length) {
      listEl.innerHTML = '<li class="talks-empty">' + esc(t("empty")) + "</li>";
      return;
    }
    listEl.innerHTML = items.map(function (p) {
      var tags = (p.tags || []).map(function (tg) {
        return '<span class="talks-tag">' + esc(tagLabel(tg)) + "</span>";
      }).join("");
      var summary = (p.summary && (p.summary[l] || p.summary.en)) || "";
      var titleObj = p.title || {};
      return '<li class="talks-item"><a class="talks-item-link" href="/talks/detail.html?p='
        + encodeURIComponent(p.slug) + '">'
        + '<span class="talks-item-date">' + esc(fmtDate(p.date, l)) + "</span>"
        + '<span class="talks-item-title">' + esc(titleObj[l] || titleObj.en || "") + "</span>"
        + '<span class="talks-item-summary">' + esc(summary) + "</span>"
        + '<span class="talks-item-tags">' + tags + "</span>"
        + "</a></li>";
    }).join("");
  }

  function renderTalkControls(listEl) {
    var intro = document.querySelector("[data-talks-intro]");
    var filters = document.querySelector("[data-talks-filters]");
    if (intro) intro.textContent = localized(talkConfig.intro);
    if (!filters) return;
    filters.setAttribute("aria-label", lang() === "zh" ? "筛选 talks" : "filter talks");
    filters.textContent = "";
    Object.keys(talkConfig.tags || {}).forEach(function (tag) {
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "talks-chip";
      chip.setAttribute("data-tag", tag);
      chip.textContent = tagLabel(tag);
      chip.classList.toggle("active", tag === listState.filter);
      chip.setAttribute("aria-pressed", tag === listState.filter ? "true" : "false");
      chip.addEventListener("click", function () {
        listState.filter = (listState.filter === tag) ? null : tag;
        renderTalkControls(listEl);
        renderList(listEl);
      });
      filters.appendChild(chip);
    });
  }

  function initList(listEl) {
    var configPromise = window.SiteContent
      ? window.SiteContent.load().then(function (site) { return site.talks || {}; })
      : Promise.resolve(talkConfig);
    Promise.all([fetchPosts(), configPromise]).then(function (result) {
      listState.posts = result[0].slice().sort(byDateDesc);
      talkConfig = result[1];
      renderTalkControls(listEl);
      renderList(listEl);
      document.addEventListener("langchange", function () {
        renderTalkControls(listEl);
        renderList(listEl);
      });
    }).catch(function (err) {
      console.error("[talks] failed to load posts:", err);
      listEl.innerHTML = '<li class="talks-empty">' + esc(t("empty")) + "</li>";
    });
  }

  /* ---------- 详情页 ---------- */
  function setupStars(scope) {
    (scope || document).querySelectorAll(".talks-detail-doodles .star").forEach(function (star) {
      var dragging = false, grabX = 0, grabY = 0;

      star.addEventListener("pointerdown", function (e) {
        e.preventDefault();
        var r = star.getBoundingClientRect();
        if (!star.classList.contains("loose")) {
          star.classList.add("loose");
          star.style.position = "fixed";
          star.style.margin = "0";
          star.style.right = "auto";
        }
        star.style.left = r.left + "px";
        star.style.top = r.top + "px";
        star.classList.add("dragging");
        grabX = e.clientX - r.left;
        grabY = e.clientY - r.top;
        dragging = true;
        try { star.setPointerCapture(e.pointerId); } catch (_) {}
      });

      star.addEventListener("pointermove", function (e) {
        if (!dragging) return;
        star.style.left = (e.clientX - grabX) + "px";
        star.style.top = (e.clientY - grabY) + "px";
      });

      function end(e) {
        if (!dragging) return;
        dragging = false;
        star.classList.remove("dragging");
        try { star.releasePointerCapture(e.pointerId); } catch (_) {}
      }
      star.addEventListener("pointerup", end);
      star.addEventListener("pointercancel", end);
    });
  }
  var CAL_MON = ["jan", "feb", "mar", "apr", "may", "jun",
                 "jul", "aug", "sep", "oct", "nov", "dec"];

  function renderHead(post, root) {
    var l = lang();
    var titleObj = post.title || {};
    var dEl = root.querySelector("[data-talks-date]");
    var tEl = root.querySelector("[data-talks-title]");
    var mEl = root.querySelector("[data-talks-month]");
    var dayEl = root.querySelector("[data-talks-day]");
    var cd = new Date(post.date + "T00:00:00");
    if (mEl) mEl.textContent = CAL_MON[cd.getMonth()];     /* 日历上侧:月份简写 jan/feb… */
    if (dayEl) dayEl.textContent = cd.getDate();           /* 日历下侧:日期数字 */
    if (dEl) dEl.textContent = fmtDate(post.date, l);
    if (tEl) tEl.textContent = titleObj[l] || titleObj.en || "";
    document.title = (titleObj[l] || titleObj.en || "talks") + " — SZnY";
  }

  function loadBody(post, root) {
    var bodyEl = root.querySelector("[data-talks-body]");
    if (!bodyEl) return;
    fetch("/talks/" + encodeURIComponent(post.slug) + "." + lang() + ".md")
      .then(function (r) { return r.ok ? r.text() : Promise.reject(new Error("md " + r.status)); })
      .then(function (md) {
        bodyEl.innerHTML = window.marked ? window.marked.parse(md) : esc(md);
      })
      .catch(function (err) { console.error("[talks] failed to load body:", err); bodyEl.textContent = t("empty"); });
  }

  function initDetail(root) {
    var slug = new URLSearchParams(location.search).get("p");
    if (!slug) {
      var last = location.pathname.split("/").pop() || "";
      if (last && last !== "detail.html") slug = decodeURIComponent(last);
    }
    fetchPosts().then(function (posts) {
      var post = posts.filter(function (p) { return p.slug === slug; })[0];
      if (!post) {
        var tEl = root.querySelector("[data-talks-title]");
        if (tEl) tEl.textContent = t("empty");
        return;
      }
      renderHead(post, root);
      loadBody(post, root);
      setupStars(document);
      document.addEventListener("langchange", function () {
        renderHead(post, root);
        loadBody(post, root);
      });
    }).catch(function (err) {
      console.error("[talks] failed to load post:", err);
      var tEl = root.querySelector("[data-talks-title]");
      if (tEl) tEl.textContent = t("empty");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var listEl = document.querySelector("[data-talks-list]");
    var detailEl = document.querySelector("[data-talks-detail]");
    if (listEl) initList(listEl);
    if (detailEl) initDetail(detailEl);
  });
})();
