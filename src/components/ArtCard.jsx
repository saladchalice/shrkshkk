import React from "react";

export default function ArtCard({ project, index, onClick }) {
  
  return (
    <div
      className="art-card"
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
