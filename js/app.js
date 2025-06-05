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

// scroll widget ------------------------------------------------------------------------------------
document.querySelectorAll('body.main-page, body.alt-page, div.background-container').forEach(page => {
  page.addEventListener('scroll', () => {
    const documentHeight = page.scrollHeight; // Full document height
    const viewportHeight = page.clientHeight; // Viewport height
    const scrollPosition = page.scrollTop; // Current scroll position

    // Update the --scroll property based on the current scroll position
    document.body.style.setProperty('--scroll', scrollPosition / (documentHeight - viewportHeight));
  });
});



// on load -------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  
  // Apply the fade-in class immediately
  // navbar.classList.add('fade-in');
  
  navbar.innerHTML = `
      <a href="index.html">Home</a>
      <a href="art-portfolio.html">Art</a>
      <a href="data-portfolio.html">Projects</a>
      <a href="images/2025 Resume.pdf">CV</a>
      <div class="dot"></div>
  `;

  // dot animation -----------------------------------------------------------------------

  let dot = document.querySelector(".dot");
  let links = document.querySelectorAll("#navbar a");
  
  // Function to update the dot position
  function updateDotPosition() {
      let navbarRect = navbar.getBoundingClientRect(); // Get the navbar's position
      let firstLinkRect = links[0].getBoundingClientRect(); // Get the first link's position
      dot.style.left = `${firstLinkRect.left - navbarRect.left}px`; // Set initial position of the dot
  }
  
  // Initialize the dot position when the page loads
  updateDotPosition();
  
  // Recalculate dot position on window resize
  window.addEventListener('resize', updateDotPosition);
  
  // Add mouseenter event listeners to each link
  links.forEach((link) => {
      link.addEventListener("mouseenter", function () {
          let linkRect = link.getBoundingClientRect();
          let navbarRect = navbar.getBoundingClientRect(); // Get navbar position
          let newX = linkRect.left - navbarRect.left; // Calculate X position relative to navbar
          dot.style.transform = `translateX(${newX}px)`; // Move the dot to the new position
          dot.style.opacity = '1'; // Set opacity to 1 to make the dot visible
        });
  });
  
  // Reset the dot when mouse leaves the navbar
  navbar.addEventListener("mouseleave", function () {
      updateDotPosition(); // Reset to the first link when mouse leaves
      dot.style.opacity = '0'; // Fade out the dot
    });

  // rest ---------------------------------------------------------------------------------------

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

const scrollarrow = document.querySelector('.scroll-arrow')
if(scrollarrow){
  scrollarrow.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default link behavior

    // Scroll smoothly to the intro container
    document.querySelector('.black-space').scrollIntoView({ behavior: 'smooth', block: 'start' });
});
}
   

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
      // Initially set to hidden, then will be revealed after appending
      article.classList.add('article-fade', 'hidden');

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
      heading.style.fontFamily = 'Inter, sans-serif'; // Apply the Syne font


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

      // Add delay only after the element is added
      setTimeout(() => {
        article.classList.remove('hidden'); // Remove the hidden class to reveal the element
        article.classList.add('visible'); // Trigger the transition
      }, index * 200); // Add a small delay between articles for staggered effect
    });
}


export function renderArt(projects, containerElement, headingLevel = 'h2') {
  if (!containerElement) {
    console.error('Container element is null or undefined.');
    return;
  }

  containerElement.innerHTML = '';

  if (!Array.isArray(projects) || projects.length === 0) {
    const placeholder = document.createElement('p');
    placeholder.textContent = 'No projects available.';
    containerElement.appendChild(placeholder);
    return;
  }

  projects.forEach((project, index) => {
    const title = project.name || 'Untitled Project';
    const description = project.description || 'No description available.';
    const src = project.src || '#';
    const tags = project.tags || [];

    const article = document.createElement('article');
    article.classList.add('art-card', 'article-fade');

    const card = document.createElement('div');
    card.classList.add('flip-card');

    const inner = document.createElement('div');
    inner.classList.add('flip-card-inner');

    // FRONT
    const front = document.createElement('div');
    front.classList.add('flip-card-front');
    const img = document.createElement('img');
    img.src = src;
    img.alt = title;
    front.appendChild(img);

    // BACK
    const back = document.createElement('div');
    back.classList.add('flip-card-back');

    const heading = document.createElement(headingLevel);
    heading.textContent = title;
    heading.style.fontFamily = 'Inter, sans-serif';

    const desc = document.createElement('p');
    desc.textContent = description;

    const tagsContainer = document.createElement('div');
    tagsContainer.classList.add('tags-container');
    tags.forEach(tag => {
      const tagSpan = document.createElement('span');
      tagSpan.classList.add('art-tag');
      tagSpan.textContent = tag;
      tagsContainer.appendChild(tagSpan);
    });

    back.appendChild(heading);
    back.appendChild(desc);
    back.appendChild(tagsContainer);

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);
    article.appendChild(card);

    // Append directly to container (no columns)
    containerElement.appendChild(article);

    // Reveal after delay for stagger effect
    setTimeout(() => {
      article.classList.add('visible');
    }, index * 150);
  });
  

  // Flip functionality on click
  containerElement.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flipped');
    });
  });
}
