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
        <a href="images/2025 Resume.pdf">CV</a>
    `;
    const aboutOption = document.querySelector('.scroll-to-intro');
    const introContainer = document.getElementById('intro-container');
      // Ensure the element exists before adding an event listener
      if (aboutOption && introContainer) {
        aboutOption.addEventListener('click', (event) => {
          event.preventDefault(); // Prevent default link behavior
      
          // Scroll smoothly to the intro container with a slight offset
          introContainer.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
          });
      
          // Adjust for any fixed headers (if you have one)
          window.scrollBy(0, -80); // Adjust the number (e.g., 80px) to the height of the fixed header
      });
      
    }
    
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

// render projects function
// we need project and containerElemenet as parameters because we 
// must locate a specific project, then a container element to put them in

const baseURL = window.location.origin.includes('github.io')
  ? '/shrkshkk'
  : ''; // Adjust if needed for local dev

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
    projects.forEach((project, index) => {
      const article = document.createElement('article');
      // Add initial class to trigger fade and dr op
      article.classList.add('article-fade');

      // Use default values if properties are missing
      const title = project.title || 'Untitled Project';
      const image = project.image || 'default-image.png';
      const description = project.description || 'No description available.';
      const style = project.style || '';
      const year = project.year || 'Year unknown';
      const link = project.link || '#'; // Default link if not provided
      const tags = project.tags || []; // Default to empty array if no tags
      
      // Create heading element dynamically based on headingLevel
      const heading = document.createElement(headingLevel);
      heading.textContent = title;
      // Create tags container
      const tagsContainer = document.createElement('div');
      tagsContainer.classList.add('tags-container');
      tags.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.classList.add('tag');
        tagSpan.textContent = tag;
        tagsContainer.appendChild(tagSpan);
      });
      
      article.innerHTML = ` 
      <a href="${link}" target="_blank" class="project-link">
        <img src="${image}" alt="${title}" class="article-image">
        <div class="project-description">
          <p>${description}</p>
          <div class="tags-wrapper"></div>
        </div>
        ${link !== '#' ? `<img src="../images/link.png" alt="External Link" class="link-icon">` : ''}
      </a>
    `;
    
        
      article.prepend(heading);
      article.querySelector('.tags-wrapper').appendChild(tagsContainer); 
  

      containerElement.appendChild(article);
  
      // Use setTimeout to delay the class that triggers the transition
      setTimeout(() => {
        article.classList.add('visible');
      }, index * 200); // Add a small delay between articles for staggered effect
    });
  }
    

