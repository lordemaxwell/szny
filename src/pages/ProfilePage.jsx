import { useOutletContext } from "react-router-dom";
import deskStudyDoodle from "../assets/doodles/desk-study.svg";

export default function ProfilePage() {
  const { text: siteText } = useOutletContext();
  const text = siteText.profile;

  return (
    <section className="page page-profile" aria-labelledby="profile-title">
      <header className="page-header">
        <div>
          <p className="kicker">{text.kicker}</p>
          <h1 id="profile-title">{text.title}</h1>
        </div>
        <img className="header-doodle" src={deskStudyDoodle} alt="" />
      </header>

      <div className="profile-groups">
        {text.sections.map(([title, items], index) => (
          <section className="profile-group" key={title}>
            <div className="profile-label">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{title}</h2>
            </div>
            <ul>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
