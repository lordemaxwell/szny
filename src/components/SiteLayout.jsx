import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { copy } from "../content.js";

const navigation = [
  { key: "home", path: "/" },
  { key: "about", path: "/about" },
  { key: "works", path: "/works" },
  { key: "profile", path: "/profile" },
  { key: "contact", path: "/contact" },
];

export default function SiteLayout() {
  const [navOpen, setNavOpen] = useState(false);
  const [language, setLanguage] = useState("zh");
  const location = useLocation();
  const text = copy[language];

  useEffect(() => {
    document.documentElement.dataset.nav = navOpen ? "open" : "closed";
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [navOpen, language]);

  useEffect(() => {
    setNavOpen(false);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname]);

  function toggleLanguage() {
    setLanguage((current) => (current === "zh" ? "en" : "zh"));
  }

  return (
    <main className="site-shell">
      <aside className="side-rail" aria-label="Site navigation">
        <Link className="brand" to="/" aria-label={text.nav.home}>
          <span className="brand-mark" />
          <span>{text.brand}</span>
        </Link>

        <div className="mobile-actions">
          <button className="lang-toggle" type="button" onClick={toggleLanguage}>
            {text.switchLabel}
          </button>
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={navOpen}
            aria-controls="site-navigation"
            onClick={() => setNavOpen((value) => !value)}
          >
            {navOpen ? "Close" : "Menu"}
          </button>
        </div>

        <nav className="nav-list" id="site-navigation">
          {navigation.map(({ key, path }) => (
            <NavLink
              key={key}
              to={path}
              end={path === "/"}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              <span>{text.nav[key]}</span>
              <small>{key}</small>
            </NavLink>
          ))}
        </nav>

        <button className="rail-lang" type="button" onClick={toggleLanguage}>
          <span>{text.langLabel}</span>
          <strong>{text.switchLabel}</strong>
        </button>
        <p className="rail-note">{text.railNote}</p>
      </aside>

      <div className="page-stage" key={`${language}-${location.pathname}`}>
        <Outlet context={{ text }} />
      </div>
    </main>
  );
}
