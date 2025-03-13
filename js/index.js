import { fetchJSON, renderProjects } from '../js/app.js';

// only include first 3 projects
const baseURL = window.location.origin.includes('github.io')
  ? '/shrkshkk'
  : ''; // Adjust if needed for local dev



window.addEventListener('load', function() {
  
  // Add the 'visible' class to the compass container to trigger the animation
  document.querySelector('.compass-container').classList.add('visible');
});


document.querySelectorAll("div").forEach(div => {
  div.addEventListener("scroll", function () {
      console.log(`Scrolling detected in: ${this.id || "Unnamed div"}`);
  });
});