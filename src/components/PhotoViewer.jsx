import { useState, useEffect } from "react";
import "../css/PhotoViewer.css";

export default function PhotoViewer({ photos, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  if (!photos || photos.length === 0) return null;

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const currentPhoto = photos[currentIndex];

  return (
    <div className="photo-viewer-overlay">
      <button className="close-btn" onClick={onClose}>×</button>
      <div className="photo-viewer-content">
        <img 
          src={currentPhoto.src} 
          alt={currentPhoto.name} 
          className="photo-viewer-image" 
        />
      </div>

      <div className="photo-viewer-nav">
        <button className="prev-btn" onClick={prevPhoto}>‹</button>
        <button className="next-btn" onClick={nextPhoto}>›</button>
      </div>

        <div className="photo-viewer-caption">
          <h2>{photos[currentIndex].name}</h2>
          <div className="photo-viewer-tags">
            {(photos[currentIndex].tags || []).map((tag, i) => (
              <span key={i} className="tag">{tag}</span>
            ))}
          </div>
      </div>
    </div>
  );
}
