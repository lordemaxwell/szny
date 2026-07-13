import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { copy } from "../content.js";
import Navigation from "./Navigation.jsx";

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
      <Navigation
        navOpen={navOpen}
        onToggleLanguage={toggleLanguage}
        onToggleMenu={() => setNavOpen((value) => !value)}
        text={text}
      />

      <div className="page-stage" key={`${language}-${location.pathname}`}>
        <Outlet context={{ language, text }} />
      </div>
    </main>
  );
}
