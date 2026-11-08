import authorImage from "../../assets/authorimage.png";

import "./About.css";

function About() {
  return (
    <section className="about">
      <img src={authorImage} alt="Author Image" className="about__image" />
      <div className="about__content">
        <h2 className="about__title">About the author</h2>
        <p className="about__text">
          My name is Samantha Rulapaugh and I am a Software Developer from
          Colorado, with experience working alongside API's and utilizing HTML,
          CSS, JavaScript, React, and many of todays common and important
          technologies.
        </p>
        <p className="about__text">
          As a Student at Tripleten, I learned hands on, becoming well versed in
          highly utilized languages to execute accurate and effective webpages.
          My ability to focus on the importance of detail as well as
          functionality is of the highest value as a Developer.
        </p>
      </div>
    </section>
  );
}

export default About;
