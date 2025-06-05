gsap.registerPlugin(ScrollTrigger);

import { fetchJSON, renderArt } from '../js/app.js';

const baseURL = window.location.origin.includes('github.io')
  ? '/shrkshkk'
  : ''; // Adjust if needed for local dev

const projects = await fetchJSON(`${baseURL}/lib/art.json`);

// define the project container, class=projects
const projectsContainer = document.querySelector('.art-gallery');



// render
renderArt(projects, projectsContainer, 'h3');
