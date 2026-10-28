import gitHubIcon from "../../assets/github.png";
import linkedInIcon from "../../assets/LinkedIn.png";
import "./Footer.css";

function Footer() {
  return (
    <section className="footer">
      <p className="footer__copyright">
        {" "}
        &copy; {new Date().getFullYear()} Supersite, Powered by News API
      </p>

      <nav className="footer__nav">
        <ul className="footer__list">
          <li className="footer__item">
            <a href="/" className="footer__link">
              Home
            </a>
          </li>
          <li className="footer__item">
            <a href="https://tripleten.com" className="footer__link">
              TripleTen
            </a>
          </li>
          <li className="footer__item">
            <a href="https://github.com/srulapaugh" className="footer__link">
              <img src={gitHubIcon} alt="GitHub" className="footer__icon" />
            </a>
          </li>
          <li className="footer__item">
            <a
              href="https://linkedin.com/samrulapaugh"
              className="footer__link"
            >
              <img src={linkedInIcon} alt="LinkedIn" className="footer__icon" />
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default Footer;
