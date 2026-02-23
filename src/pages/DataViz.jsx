import { useState, useEffect } from "react";
import ArtCard from "../components/ArtCard"; 
import PhotoViewer from "../components/PhotoViewer";

function DataViz() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);

  // Photo Viewer state
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpen = (index) => {
    setCurrentIndex(index);
    setViewerOpen(true);
  };

  const handleClose = () => setViewerOpen(false);

  // Fetch JSON data on mount
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}lib/art.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch art projects");
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setFilteredProjects(data); // start with all
      })
      .catch((err) => console.error("Error loading art projects:", err));
  }, []);

  // Handle filter button clicks
  const handleFilter = (tag) => {
    if (selectedTag === tag) {
      // Toggle off if same tag clicked again
      setSelectedTag(null);
      setFilteredProjects(projects);
      return;
    }

    setSelectedTag(tag);

    if (tag === "all") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter((project) =>
        (project.tags || []).map((t) => t.toLowerCase()).includes(tag)
      );
      setFilteredProjects(filtered);
    }
  };

  return (
    <div className="alt-page">
      <div className="background-container">
        <div id="art-gallery-container">
          <h2 className="page-heading">my artwork</h2>
        </div>

        <div className="page-description">
          <p>
            check out more of my art on instagram{" "}
            <a
              href="https://www.instagram.com/shrkshkk/"
              target="_blank"
              rel="noopener noreferrer"
              id="link"
            >
              @shrkshkk
            </a>
            ! and pro-tip: try clicking the artwork to see more details!
          </p>
        </div>

        {/* Tag filter buttons */}
        <div className="tag-buttons">
          <button
            data-tag="digital"
            onClick={() => handleFilter("digital")}
            className={selectedTag === "digital" ? "active" : ""}
          >
            digital
          </button>
          <button
            data-tag="traditional"
            onClick={() => handleFilter("traditional")}
            className={selectedTag === "traditional" ? "active" : ""}
          >
            traditional
          </button>
          <button
            data-tag="all"
            onClick={() => handleFilter("all")}
            className={selectedTag === "all" ? "active" : ""}
          >
            all
          </button>
        </div>

        {/* Render project cards */}
        <div className="art-gallery">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ArtCard
                key={project.id || index}
                project={project}
                index={index}
                onClick={handleOpen}
              />
            ))
          ) : (
            <p>No projects found.</p>
          )}
        </div>

        {/* Photo Viewer (lightbox) */}
        {viewerOpen && (
          <PhotoViewer
            photos={filteredProjects} // pass filtered projects, so arrows respect filter
            initialIndex={currentIndex}
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  );
}

export default DataViz;
