import { useOutletContext } from "react-router-dom";

export default function ContactPage() {
  const { text: siteText } = useOutletContext();
  const text = siteText.contact;

  return (
    <section className="page page-contact" aria-labelledby="contact-title">
      <header className="page-header contact-header">
        <div>
          <p className="kicker">{text.kicker}</p>
          <h1 id="contact-title">{text.title}</h1>
        </div>
      </header>

      <div className="contact-list">
        {text.links.map(([label, value, href]) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
          >
            <span>{label}</span>
            <strong>{value}</strong>
            <i aria-hidden="true">↗</i>
          </a>
        ))}
      </div>
    </section>
  );
}
