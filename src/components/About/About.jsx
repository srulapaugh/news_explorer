import authorImage from "../../assets/avatarplaceholder.png";

import "./About.css";

function About() {
  return (
    <section className="about">
      <img src="{authorImage}" alt="Author Image" className="about__image" />
      <div className="about__content">
        <h2 className="about__title">About the author</h2>
        <p className="about__text">*Info about myself eventually*</p>
        <p className="about__text">*Experience with TripleTen</p>
      </div>
    </section>
  );
}

export default About;
