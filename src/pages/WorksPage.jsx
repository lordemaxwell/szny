import { Link, useOutletContext } from "react-router-dom";
import paperTerminalDoodle from "../assets/doodles/paper-terminal.svg";

export default function WorksPage() {
  const { text: siteText } = useOutletContext();
  const text = siteText.works;

  return (
    <section className="page page-works" aria-labelledby="works-title">
      <header className="page-header">
        <div>
          <p className="kicker">{text.kicker}</p>
          <h1 id="works-title">{text.title}</h1>
          <p className="page-intro">{text.intro}</p>
        </div>
        <img className="header-doodle" src={paperTerminalDoodle} alt="" />
      </header>

      <div className="project-list">
        {text.items.map((work, index) => (
          <article className="project-row" key={work.type}>
            <span className="project-index">{String(index + 1).padStart(2, "0")}</span>
            <div className="project-body">
              <div className="project-heading">
                <h2>{work.title}</h2>
                <span>{work.meta}</span>
              </div>
              <p>{work.copy}</p>
              <div className="project-footer">
                <span>{work.type}</span>
                <Link to="/contact">{text.cta}</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
