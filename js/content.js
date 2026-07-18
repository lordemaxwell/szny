/* SZnY — render maintainable page content from content/site.json. */
(function () {
  "use strict";

  var contentPromise = null;

  function load() {
    if (!contentPromise) {
      contentPromise = fetch("/content/site.json?v=1").then(function (response) {
        if (!response.ok) throw new Error("site.json " + response.status);
        return response.json();
      });
    }
    return contentPromise;
  }

  function lang() {
    return (window.I18N && window.I18N.current) || "en";
  }

  function localized(value, requestedLang) {
    if (value == null) return "";
    if (typeof value === "string") return value;
    requestedLang = requestedLang || lang();
    return value[requestedLang] || value.zh || value.en || "";
  }

  function element(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function renderResumeList(root, items, titleKey, orgKey) {
    if (!root) return;
    root.textContent = "";
    (items || []).forEach(function (item) {
      var li = element("li");
      var year = element("span", "resume-year", item.year || "—");
      var body = element("span", "resume-body");
      body.appendChild(element("span", "resume-title", localized(item[titleKey])));
      body.appendChild(element("span", "resume-org", localized(item[orgKey])));
      li.appendChild(year);
      li.appendChild(body);
      root.appendChild(li);
    });
  }

  function renderAbout(data) {
    var copy = document.querySelector("[data-about-copy]");
    if (!copy) return;
    copy.textContent = "";
    var lines = localized(data.about.bio);
    if (!Array.isArray(lines)) lines = [];
    lines.forEach(function (line) {
      copy.appendChild(element("p", "", line));
    });
    renderResumeList(document.querySelector("[data-about-education]"), data.about.education, "degree", "school");
    renderResumeList(document.querySelector("[data-about-internship]"), data.about.internship, "role", "organization");
  }

  function renderWorks(data) {
    var root = document.querySelector("[data-works-list]");
    if (!root) return;
    root.textContent = "";
    (data.works || []).forEach(function (work) {
      var card = element("div", "app-card");
      var link = element("a", "app-title", work.title);
      link.href = work.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      card.appendChild(link);
      card.appendChild(element("p", "app-blurb", localized(work.description)));
      card.appendChild(element("p", "app-meta", localized(work.meta)));
      root.appendChild(card);
    });
  }

  function renderContact(data) {
    var contact = data.contact || {};
    var title = document.querySelector("[data-contact-title]");
    var intro = document.querySelector("[data-contact-intro]");
    var email = document.querySelector("[data-contact-email]");
    var socials = document.querySelector("[data-contact-socials]");
    if (!title) return;
    title.textContent = localized(contact.title);
    intro.textContent = localized(contact.intro);
    email.textContent = contact.email || "";
    email.href = contact.email ? "mailto:" + contact.email : "#";
    socials.textContent = "";
    (contact.socials || []).forEach(function (social) {
      var link = element("a", "social-chip", social.label);
      link.href = social.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      socials.appendChild(link);
    });
  }

  function render(data) {
    renderAbout(data);
    renderWorks(data);
    renderContact(data);
  }

  function renderError() {
    document.querySelectorAll("[data-content-error]").forEach(function (node) {
      node.hidden = false;
      node.textContent = lang() === "zh" ? "内容暂时无法加载。" : "content is temporarily unavailable.";
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    load().then(render).catch(function (error) {
      console.error("[content] failed to load:", error);
      renderError();
    });
    document.addEventListener("langchange", function () {
      load().then(render).catch(renderError);
    });
  });

  window.SiteContent = { load: load, localized: localized };
})();
