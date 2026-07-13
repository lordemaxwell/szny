import { Link, NavLink } from "react-router-dom";

const navigation = [
  { key: "home", path: "/" },
  { key: "about", path: "/about" },
  { key: "works", path: "/works" },
  { key: "profile", path: "/profile" },
  { key: "contact", path: "/contact" },
];

export default function Navigation({ navOpen, onToggleMenu, onToggleLanguage, text }) {
  return (
    <aside className="side-rail" aria-label="Site navigation">
      <Link className="brand" to="/" aria-label={text.nav.home}>
        <span className="brand-mark" aria-hidden="true" />
        <span>{text.brand}</span>
      </Link>

      <div className="mobile-actions">
        <button className="lang-toggle" type="button" onClick={onToggleLanguage}>
          {text.switchLabel}
        </button>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={navOpen}
          aria-controls="site-navigation"
          onClick={onToggleMenu}
        >
          {navOpen ? "Close" : "Menu"}
        </button>
      </div>

      <nav className="nav-list" id="site-navigation">
        {navigation.map(({ key, path }, index) => (
          <NavLink
            key={key}
            to={path}
            end={path === "/"}
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <small>{String(index + 1).padStart(2, "0")}</small>
            <span>{text.nav[key]}</span>
          </NavLink>
        ))}
      </nav>

      <button className="rail-lang" type="button" onClick={onToggleLanguage}>
        <span>{text.langLabel}</span>
        <strong>{text.switchLabel}</strong>
      </button>
      <p className="rail-note">{text.railNote}</p>
    </aside>
  );
}
