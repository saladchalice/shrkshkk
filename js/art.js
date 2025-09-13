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

// pick from traditional or digital
const tagButtons = document.querySelectorAll('.tag-buttons button');
const container = document.querySelector('.art-gallery'); 
let selectedTag = null;

tagButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tag = button.dataset.tag.toLowerCase();

    if (selectedTag === tag) {
      button.classList.remove('active');
      selectedTag = null;
      renderArt(projects, container, 'h3'); 
      return;
    }
    // Clear other active states
    tagButtons.forEach(btn => btn.classList.remove('active'));
    // Activate current button
    button.classList.add('active');
    selectedTag = tag;

    let filtered = [];

    if (tag === 'all') {
      filtered = projects;
    } else {
      filtered = projects.filter(project =>
        (project.tags || []).map(t => t.toLowerCase()).includes(tag)
      );
    }

    renderArt(filtered, container, 'h3'); // or 'h3', based on your setup
  });
});