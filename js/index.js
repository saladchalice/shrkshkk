import { fetchJSON, renderProjects } from '../js/app.js';

// only include first 3 projects
const baseURL = window.location.origin.includes('github.io')
  ? '/shrkshkk'
  : ''; // Adjust if needed for local dev

const projects = await fetchJSON(`${baseURL}/lib/projects.json`);
const latestProjects = projects.slice(0, 3);

const projectsContainer = document.querySelector('.projects');
renderProjects(latestProjects, projectsContainer, 'h3');

window.addEventListener('load', function() {
  // Add the 'visible' class to the compass container to trigger the animation
  document.querySelector('.compass-container').classList.add('visible');
});