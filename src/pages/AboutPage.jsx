import { useOutletContext } from "react-router-dom";

export default function AboutPage() {
  const { text: siteText } = useOutletContext();
  const text = siteText.about;

  return (
    <section className="page page-split" aria-labelledby="about-title">
      <div>
        <p className="kicker">{text.kicker}</p>
        <h2 id="about-title">{text.title}</h2>
      </div>
      <div className="about-copy">
        {text.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <ul className="fact-list">
          {text.facts.map(([label, value]) => (
            <li key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
