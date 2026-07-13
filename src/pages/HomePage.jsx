import { useMemo } from "react";
import { Link, useOutletContext } from "react-router-dom";

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

export default function HomePage() {
  const { text: siteText } = useOutletContext();
  const text = siteText.home;

  return (
    <section className="page page-home" aria-labelledby="home-title">
      <div className="hero-copy">
        <p className="kicker">{text.kicker}</p>
        <h1 id="home-title">{text.title}</h1>
        <p className="standfirst">{text.intro}</p>
        <div className="hero-actions">
          <Link className="route-button" to="/works">
            {text.primary}
          </Link>
          <Link className="route-button ghost" to="/contact">
            {text.secondary}
          </Link>
        </div>
      </div>
      <DoodleField label={text.visual} />
      <p className="privacy-line">{text.privacy}</p>
    </section>
  );
}
