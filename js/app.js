const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        requestAnimationFrame(() => {
            console.log(entry);
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

//scroller
window.onscroll = function () {
    scrollRotate(); 
};

function scrollRotate() {
  const image = document.querySelector(".scroll-widget img");
  
  if (image) {
      let rotationValue = window.scrollY / 2; // Adjust the rotation speed here
      image.style.transform = `rotate(${rotationValue}deg)`;
  } else {
      console.log("Scroll widget element not found!");
  }
}

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    navbar.innerHTML = `
        <a href="index.html">Home</a>
        <a href="art-portfolio.html">Art</a>
        <a href="data-portfolio.html">Projects</a>
        <a href="resume.html">Resume</a>
        <a href="about.html">About</a>
    `;
    
});


// dsc 106 code
function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
  }

// fetch json
// fetch json from url and return data
export async function fetchJSON(url) {
  try {
      // Fetch the JSON file from the given URL
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.statusText}`);
      }
      // console.log(response);
      const data = await response.json();
      return data; 


  } catch (error) {
      console.error('Error fetching or parsing JSON data:', error);
  }
}

console.log(fetchJSON('../lib/projects.json'));

// render projects function
// we need project and containerElemenet as parameters because we 
// must locate a specific project, then a container element to put them in

export function renderProjects(projects, containerElement, headingLevel = 'h2') {
  // Check if containerElement is null or undefined
  if (!containerElement) {
    console.error('Container element is null or undefined.');
    return;
  }

  // Validate headingLevel
  const validHeadingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  if (!validHeadingLevels.includes(headingLevel)) {
    console.error('Invalid heading level:', headingLevel);
    headingLevel = 'h2'; // Fallback to default heading level
  }

  // Clear the containerElement to make sure no duplicates
  containerElement.innerHTML = '';

  // Check if projects array is empty
  if (projects.length === 0) {
    const placeholder = document.createElement('p');
    placeholder.textContent = 'No projects available.';
    containerElement.appendChild(placeholder);
    return;
  }

  // Iterate over each project in the projects array
  projects.forEach(project => {
    const article = document.createElement('article');
    
    // Use default values if properties are missing
    const title = project.title || 'Untitled Project';
    const image = project.image || 'default-image.png';
    const description = project.description || 'No description available.';
    const style = project.style || '';
    const year = project.year || 'Year unknown';
    const link = project.link || '#'; // Default link if not provided
    
    // Create heading element dynamically based on headingLevel
    const heading = document.createElement(headingLevel);
    heading.textContent = title;
    
    article.innerHTML = `
      <img src="${image}" alt="${title}" style="width: 100%; max-width: 100%; height: auto;">
      <div>
      <p>${description}</p>
      <h4>c. ${year}</h4>
      <a href="${link}" target="_blank">
      <img src="../images/link.png" alt="Link" class="link">
      </a>
      </div>`
      ;
    
    article.prepend(heading);
    containerElement.appendChild(article);
  });
}