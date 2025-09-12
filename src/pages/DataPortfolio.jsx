import { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard"; // adjust path if needed

export default function DataPortfolio() {
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState("");

  // Fetch JSON data on mount
  useEffect(() => {
    fetch("/lib/projects.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch projects");
        return res.json();
      })
      .then((data) => {
        setProjects(data);
      })
      .catch((err) => console.error("Error loading projects:", err));
  }, []);

    // Filter projects based on search query
  const filteredProjects = projects.filter((project) =>
    Object.values(project).join(" ").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="alt-page">

      <div className="content">
        <div className="background-container" id="projects">
          <div id="navbar"></div>
          <img src="images/shrkshkk.png" alt="Logo" className="logo" />
          {/* <img src="images/star.svg" className="scroll-widget" /> */}

          <div id="projects-container">
            <h2 className="page-heading">my projects</h2>
          </div>

          <input
            className="searchBar"
            type="search"
            aria-label="Search projects"
            placeholder="Search projects…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="projects">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectCard key={project.id || index} project={project} />
              ))
            ) : (
              <p>No projects available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}