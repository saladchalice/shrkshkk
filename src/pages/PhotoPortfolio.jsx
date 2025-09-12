import { useState, useEffect } from "react";
import ArtCard from "../components/ArtCard"; 
import PhotoViewer from "../components/PhotoViewer";

function PhotoPortfolio() {
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
    fetch("/lib/photos.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch photo projects");
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setFilteredProjects(data); // start with all
      })
      .catch((err) => console.error("Error loading photo projects:", err));
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
        <div id="photo-gallery-container">
          <h2 className="page-heading">my photography</h2>
        </div>

        <div className="page-description">
          <p>
            check out more of my photos on instagram{" "}
            <a
              href="https://www.instagram.com/shrkshkk/"
              target="_blank"
              rel="noopener noreferrer"
              id="link"
            >
              @shrkshkk
            </a>
            ! and pro-tip: try clicking the photos to view them larger!
          </p>
        </div>

        {/* Tag filter buttons */}
        <div className="tag-buttons">
          {["2019", "2022", "2023", "2024", "2025", "all"].map((year) => (
            <button
              key={year}
              data-tag={year}
              onClick={() => handleFilter(year)}
              className={selectedTag === year ? "active" : ""}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Render photo cards */}
        <div className="art-gallery">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ArtCard
                key={project.id || index}
                project={project}
                index={index}
                onClick={handleOpen} // ✅ pass lightbox open handler
              />
            ))
          ) : (
            <p>No projects found.</p>
          )}
        </div>

        {/* Photo Viewer (lightbox) */}
        {viewerOpen && (
          <PhotoViewer
            photos={filteredProjects} // only show filtered photos
            initialIndex={currentIndex}
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  );
}

export default PhotoPortfolio;
