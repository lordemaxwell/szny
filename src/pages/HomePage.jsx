import { Link, useOutletContext } from "react-router-dom";
import bookCodeDoodle from "../assets/doodles/book-code.svg";

export default function HomePage() {
  const { text: siteText } = useOutletContext();
  const text = siteText.home;
  const focus = siteText.about.facts.find(([label]) => label === "Focus");

  return (
    <section className="page page-home" aria-labelledby="home-title">
      <div className="home-copy">
        <p className="kicker">{text.kicker}</p>
        <h1 id="home-title">{text.title}</h1>
        <p className="standfirst">{text.intro}</p>

        {focus && (
          <dl className="focus-line">
            <dt>{focus[0]}</dt>
            <dd>{focus[1]}</dd>
          </dl>
        )}

        <div className="text-links" aria-label="Primary links">
          <Link to="/works">{text.primary}</Link>
          <Link to="/contact">{text.secondary}</Link>
        </div>
      </div>

      <figure className="doodle-frame doodle-home">
        <img src={bookCodeDoodle} alt="" />
        <figcaption>{text.visual}</figcaption>
      </figure>

      <div className="home-contact" aria-label={siteText.contact.kicker}>
        {siteText.contact.links.slice(0, 2).map(([label, , href]) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
          >
            {label}
          </a>
        ))}
      </div>
    </section>
  );
}
