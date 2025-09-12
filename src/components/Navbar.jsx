import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/art", label: "Art" },
  { path: "/photos", label: "Photos" },
  { path: "/data", label: "Projects" },
  { path: "/resume.pdf", label: "CV", external: true }
];

export default function Navbar() {
  const location = useLocation();
  const [hovered, setHovered] = useState(null);

  return (
    <nav id="navbar" className="relative flex gap-6">
      {navItems.map((item, i) =>
        item.external ? (
          <a
            key={i}
            href={item.path}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="relative"
          >
            {item.label}
            {hovered === i && (
              <motion.div
                layoutId="dot"
                className="absolute bottom-[-6px] left-0 w-2 h-2 rounded-full bg-black"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}
          </a>
        ) : (
          <Link
            key={i}
            to={item.path}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="relative"
          >
            {item.label}
            {(hovered === i || location.pathname === item.path) && (
              <motion.div
                layoutId="dot"
                className="absolute bottom-[-6px] left-0 w-2 h-2 rounded-full bg-black"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            )}
          </Link>
        )
      )}
    </nav>
  );
}
