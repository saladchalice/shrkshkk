import React, { useState, useEffect } from "react";

export default function ArtCard({ project, index, onClick }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, index * 10); // stagger by 150ms per card

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`art-card ${visible ? "visible" : ""}`}
      onClick={() => onClick(index)}
      style={{ cursor: "pointer" }}
    >
      <img
        src={project.src}
        alt={project.name}
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
      />
    </div>
  );
}
