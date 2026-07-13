import { useOutletContext } from "react-router-dom";
import nodesPencilDoodle from "../assets/doodles/nodes-pencil.svg";

export default function AboutPage() {
  const { text: siteText } = useOutletContext();
  const text = siteText.about;

  return (
    <section className="page page-about" aria-labelledby="about-title">
      <header className="page-header">
        <div>
          <p className="kicker">{text.kicker}</p>
          <h1 id="about-title">{text.title}</h1>
        </div>
        <img className="header-doodle" src={nodesPencilDoodle} alt="" />
      </header>

      <div className="about-copy readable-copy">
        {text.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <dl className="fact-list">
        {text.facts.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
