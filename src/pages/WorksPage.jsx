import { Link, useOutletContext } from "react-router-dom";

export default function WorksPage() {
  const { text: siteText } = useOutletContext();
  const text = siteText.works;

  return (
    <section className="page page-works" aria-labelledby="works-title">
      <div className="section-head">
        <p className="kicker">{text.kicker}</p>
        <h2 id="works-title">{text.title}</h2>
        <p>{text.intro}</p>
      </div>
      <div className="work-grid">
        {text.items.map((work) => (
          <article className={`work-card ${work.palette}`} key={work.type}>
            <div className="work-image">
              <span>{text.image}</span>
            </div>
            <div className="work-meta">
              <span>{work.type}</span>
              <span>{work.meta}</span>
            </div>
            <h3>{work.title}</h3>
            <p>{work.copy}</p>
            <Link className="route-button" to="/contact">
              {text.cta}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
