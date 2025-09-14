import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect } from "react";

// icons
import { Home as HomeIcon, Palette, Camera, FolderGit2, FileText } from "lucide-react";


import DataPortfolio from "./pages/DataPortfolio";
import PhotoPortfolio from "./pages/PhotoPortfolio";
import ArtPortfolio from "./pages/ArtPortfolio";
import Home from "./pages/Home";
import './css/App.css';

function Navigation() {
  return (
    <div id="topbar">
      <img 
        src={`${import.meta.env.BASE_URL}images/shrkshkk.png`} 
        alt="Logo" 
        className="logo" 
      />
        <nav id="navbar">
          <Link to="/">
            <HomeIcon size={16} style={{ marginRight: "6px" }} />
            Home
          </Link>
          <Link to="/art">
            <Palette size={16} style={{ marginRight: "6px" }} />
            Art
          </Link>
          <Link to="/photos">
            <Camera size={16} style={{ marginRight: "6px" }} />
            Photos
          </Link>
          <Link to="/projects">
            <FolderGit2 size={16} style={{ marginRight: "6px" }} />
            Projects
          </Link>
          <a 
            href="/images/2025 Resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <FileText size={16} style={{ marginRight: "6px" }} />
            CV
          </a>
      </nav>
    </div>
  );
}


function App() {
  const location = useLocation();

  useEffect(() => {
    const scrollContainers = document.querySelectorAll(
      "div.background-container, .main-page, body, body.alt-page"
    );

    const handleScroll = (e) => {
      const page = e.target;
      const scrollPosition = page.scrollTop;
      const documentHeight = page.scrollHeight;
      const viewportHeight = page.clientHeight;
      const scrollFraction = (documentHeight - viewportHeight) > 0 ? scrollPosition / (documentHeight - viewportHeight) : 0;

      document.body.style.setProperty("--scroll", scrollFraction);

      // Rotate spinner if present
      const spinner = document.querySelector('.scroll-widget');
      if (spinner) {
        spinner.style.transform = `rotate(${scrollFraction * 360}deg)`;
      }
    };

    scrollContainers.forEach((container) =>
      container.addEventListener("scroll", handleScroll)
    );

    // Initialize spinner position
    scrollContainers.forEach((container) => handleScroll({ target: container }));

    // Cleanup on unmount or route change
    return () => {
      scrollContainers.forEach((container) =>
        container.removeEventListener("scroll", handleScroll)
      );
    };
  }, [location.pathname]); // Re-run effect on route change

  return (
    <div className="App">
      <div className="content">
        <div className="app">
          <Navigation />
          <img src={`${import.meta.env.BASE_URL}images/star.svg`} className="scroll-widget" alt="scroll" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/art" element={<ArtPortfolio />} />
            <Route path="/photos" element={<PhotoPortfolio />} />
            <Route path="/projects" element={<DataPortfolio />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;