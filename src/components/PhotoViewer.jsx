import { useState, useEffect } from "react";
import "../css/PhotoViewer.css";

export default function PhotoViewer({ photos, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // close on escape and lock scroll
   useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (!photos || photos.length === 0) return null;

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const currentPhoto = photos[currentIndex];

  return (
    <div
      className="photo-viewer-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <button className="close-btn" onClick={onClose}>
        <svg viewBox="0 0 24 24" width="18" height="18">
          <line
            x1="6"
            y1="6"
            x2="18"
            y2="18"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="18"
            y1="6"
            x2="6"
            y2="18"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div className="photo-viewer-content">
        <img
          src={currentPhoto.src}
          alt={currentPhoto.name}
          className="photo-viewer-image"
        />

        <div className="photo-viewer-description">
          <h3>{currentPhoto.name}</h3>
          <p>{currentPhoto.description || "No description available."}</p>
          <div className="photo-viewer-tags">
            {(currentPhoto.tags || []).map((tag, i) => (
              <span key={i} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="photo-viewer-nav">
        <button className="prev-btn" onClick={prevPhoto}>‹</button>
        <button className="next-btn" onClick={nextPhoto}>›</button>
      </div>
    </div>
  );
}
