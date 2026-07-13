import { useOutletContext } from "react-router-dom";

export default function ProfilePage() {
  const { text: siteText } = useOutletContext();
  const text = siteText.profile;

  return (
    <section className="page page-profile" aria-labelledby="profile-title">
      <div className="profile-title">
        <p className="kicker">{text.kicker}</p>
        <h2 id="profile-title">{text.title}</h2>
      </div>
      <div className="profile-columns">
        {text.sections.map(([title, items]) => (
          <article key={title}>
            <h3>{title}</h3>
            <ul>
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
