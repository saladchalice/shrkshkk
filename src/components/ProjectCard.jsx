import { useState, useEffect } from "react";

export default function ProjectCard({ project, index }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, index * 150); // stagger by 150ms per card

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <article className={`article-fade ${visible ? "visible" : "hidden"}`}>
      <h2>{project.title || "Untitled Project"}</h2>
      <a
        href={project.link || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="project-link"
      >
        <img
          src={project.image}
          alt={project.title}
          className="article-image"
        />
        <div className="project-description">
          <p>{project.description || "No description available."}</p>
          <div className="tags-container">
            {(project.tags || []).map((tag, i) => (
              <span key={i} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </a>
    </article>
  );
}
