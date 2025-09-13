import { Link } from "react-router-dom";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.refresh();

    // ========================== Fade in the scroll arrow ==============================
    gsap.fromTo(
      "#scrollArrow",
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#main",
          start: "top top",
          scroller: window,
        },
      }
    );
  }, []);

  // =========================== About Scroller ================================= //
  useEffect(() => {
    const aboutOption = document.querySelector(".scroll-to-intro");
    const introContainer = document.getElementById("intro-container");
    if (aboutOption && introContainer) {
      aboutOption.addEventListener("click", (event) => {
        event.preventDefault();
        introContainer.scrollIntoView({ behavior: "smooth", block: "start" });
        window.scrollBy(0, -80); // Adjust for fixed header if needed
      });
    }
    return () => {
      if (aboutOption) aboutOption.removeEventListener("click", () => {});
    };
  }, []);

  useEffect(() => {
  const scrollArrow = document.getElementById("scrollArrow");
  const targetElement = document.getElementById("what-page-container");

  if (scrollArrow && targetElement) {
    const handleScroll = (event) => {
      event.preventDefault();
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      window.scrollBy(0, -80); // Adjust if you have a fixed header
    };

    scrollArrow.addEventListener("click", handleScroll);

    return () => {
      scrollArrow.removeEventListener("click", handleScroll);
    };
  }
}, []);

  // ========================== Animation for Text =================================
  useEffect(() => {
    const hiddenElements = document.querySelectorAll(
      ".animate-lnos-text, .animate-lnos-text-2, .animate-lnos-text-3, .animate-about, .animate-about-2"
    );
    hiddenElements.forEach((el) => el.classList.add("hidden"));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        requestAnimationFrame(() => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      });
    });

    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="main-page">
      {/* Background container */}
      <div className="background-container" id="main">
        {/* Compass Navigation */}
        <div className="compass-container">
          <div className="center-logo">
            <img
              src={`${import.meta.env.BASE_URL}images/spin.gif`}
              alt="My Logo"
            />
          </div>
          <div className="option option-north">
            <Link to="/art">
              <img
                src={`${import.meta.env.BASE_URL}images/art/lake.jpg`}
                alt="ART"
              />
              <span>art</span>
            </Link>
          </div>
          <div className="option option-south">
            <Link to="/projects">
              <img
                src={`${import.meta.env.BASE_URL}images/shark.png`}
                alt="PROJECTS"
              />
              <span>projects</span>
            </Link>
          </div>
          <div className="option option-east">
            <a
              href={`${import.meta.env.BASE_URL}images/2025 Resume.pdf`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`${import.meta.env.BASE_URL}images/dumpling.png`}
                alt="CV"
              />
              <span>cv</span>
            </a>
          </div>
          <div className="option option-west">
            <a href="#about" className="scroll-to-intro">
              <img
                src={`${import.meta.env.BASE_URL}images/krab.png`}
                alt="ABOUT"
              />
              <span>about</span>
            </a>
          </div>
        </div>

        {/* Scroll Arrow */}
        <div className="scroll-arrow" id="scrollArrow">
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* Black space section */}
      <div className="black-space" id="black-space">
        <img
          src={`${import.meta.env.BASE_URL}images/halftone gradient.png`}
          alt="halftone gradient"
          className="halftone-gradient"
        />

        {/* What Page */}
        <div id="what-page-container">
          <div id="what-heading-background"></div>
          <img
            src={`${import.meta.env.BASE_URL}images/whatisthisplace.png`}
            id="what-handwritten"
            alt="what is this place"
          />
        </div>

        {/* Main page spin grid */}
        <div id="main-page-spin-grid">
          <div className="website-block" id="lnos">
            <section className="text">
              <p className="animate-lnos-text">
                <span id="emphasis">hey there, visitor! </span>
                i made this site to be a centralized location where i can show
                off all of my work, ranging from my{" "}
                <span style={{ color: "#cea535" }}>data science projects</span>{" "}
                to my <span style={{ color: "#d11313" }}>photography</span> to
                my <span style={{ color: "#0279BB" }}>art</span>!
              </p>
              <p>
                <br />
              </p>
              <p className="animate-lnos-text-2">
                and... that's pretty much it, i guess! the site is a work in
                progress and i'm adding new elements every day! i would
                recommend clicking through my art and exploring a few of my web
                projects on my projects page! besides that, you're free to just
                scroll and watch my little starfish cat rotate in the bottom
                corner :D
              </p>
            </section>
          </div>

          <img
            src={`${import.meta.env.BASE_URL}images/welcome.png`}
            alt="welcome"
            id="welcome"
          />
          <img
            src={`${import.meta.env.BASE_URL}images/spiral.svg`}
            alt="bgspinner"
            id="bgspinner"
          />

          <div id="tangyuan-wrapper">
            <img
              src={`${import.meta.env.BASE_URL}images/tangyuan.png`}
              alt="tangyuan"
              id="tangyuan"
            />
          </div>
        </div>

        {/* About Section */}
        <div id="main-page-container">
          <div id="about-heading-background"></div>
          <img
            src={`${import.meta.env.BASE_URL}images/aboutme.png`}
            id="about-handwritten"
            alt="about me"
          />
        </div>

        <section>
          <section id="photo">
            <div id="intro-container">
              <section className="text">
                <p className="animate-about">
                  <span id="emphasis">hi, i'm eddie!</span> i'm a data scientist
                  and artist based out of san diego, california.
                </p>
                <p></p>
                <p className="animate-about-2">
                  i have experience building automated data pipelines and
                  analyzing complex datasets. when i'm not working with data, i
                  enjoy painting portraits, urban sketching, and exploring new
                  languages and cultures. feel free to reach out at any of my
                  socials linked below!
                </p>
              </section>

              <section id="socials">
                <a
                  href="https://www.linkedin.com/in/edward-lu-4833781b4/"
                  id="icon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}images/linkedin-logo.png`}
                    alt="LinkedIn"
                  />
                </a>
                <a
                  href="https://github.com/saladchalice"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}images/git.png`}
                    alt="github"
                  />
                </a>
                <a
                  href="https://open.spotify.com/user/21f25hzcqr3p4lolhuwmpa6jy?si=50be7e3536f14f17"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}images/spotify.png`}
                    alt="spotify"
                  />
                </a>
              </section>
            </div>

            <img
              src={`${import.meta.env.BASE_URL}images/photo.png`}
              alt="me"
              id="me"
            />
          </section>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p>© 2025 Edward Lu. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default Home;
