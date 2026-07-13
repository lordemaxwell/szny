import { useOutletContext } from "react-router-dom";

export default function ContactPage() {
  const { text: siteText } = useOutletContext();
  const text = siteText.contact;

  return (
    <section className="page page-contact" aria-labelledby="contact-title">
      <p className="kicker">{text.kicker}</p>
      <h2 id="contact-title">{text.title}</h2>
      <div className="contact-grid">
        {text.links.map(([label, value, href]) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
          >
            <span>{label}</span>
            <strong>{value}</strong>
          </a>
        ))}
      </div>
    </section>
  );
}
