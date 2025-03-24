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


// compass scroll rotate animation 
gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(
    ".option-north",
    { opacity: .9, scale: 1, y: 0, x: "0%" }, 
    { opacity: 1, scale: 1.3, y: -150, x: "-50%", rotation: 50,
      scrollTrigger: {
          trigger: ".compass-container",
          start: "top 100px",
          end: "bottom top",
          scrub: true
      }
    }
);

gsap.fromTo(
    ".option-south",
    { opacity: 1, scale: 1, y: 0, x: "0%" }, 
    { opacity: 1, scale: 1.3, y: 150, x: "-50%", rotation: -50,
      scrollTrigger: {
          trigger: ".compass-container",
          start: "top 100px",
          end: "bottom top",
          scrub: true
      }
    }
);

gsap.fromTo(
    ".option-east",
    { opacity: 1, scale: 1, y: "0", x: 0 }, 
    { opacity: 1, scale: 1.3, y: "-50%", x: 150, rotation: 180,
      scrollTrigger: {
          trigger: ".compass-container",
          start: "top 100px",
          end: "bottom top",
          scrub: true
      }
    }
);

gsap.fromTo(
    ".option-west",
    { opacity: 1, scale: 1, y: "0%", x: 0 }, 
    { opacity: 1, scale: 1.3, y: "-50%", x: -150, rotation: -180,
      scrollTrigger: {
          trigger: ".compass-container",
          start: "top 100px",
          end: "bottom top",
          scrub: true
      }
    }
);

//gsap animate lnos lines

gsap.to('.animate-about', {
  backgroundPositionX: 0,
  ease: "none", 
  scrollTrigger: { 
    trigger: '.animate-about',
    scrub: 1,
    start: "top 80%",
    end: "bottom bottom"
  }   
});

gsap.to('.animate-about-2', {
  backgroundPositionX: 0,
  ease: "none", 
  scrollTrigger: { 
    trigger: '.animate-about-2',
    scrub: 1,
    start: "top 80%",
    end: "bottom bottom"
  }
});

// animate lnos text
gsap.to('.animate-lnos-text', {
  backgroundPositionX: 0,
  ease: "none", 
  scrollTrigger: { 
    trigger: '.animate-lnos-text',
    scrub: 1,
    start: "top 80%",
    end: "bottom bottom"
  }
});

gsap.to('.animate-lnos-text-2', {
  backgroundPositionX: 0,
  ease: "none", 
  scrollTrigger: { 
    trigger: '.animate-lnos-text-2',
    scrub: 1,
    start: "top 80%",
    end: "bottom bottom"
  }
});

gsap.to('.animate-lnos-text-3', {
  backgroundPositionX: 0,
  ease: "none", 
  scrollTrigger: { 
    trigger: '.animate-lnos-text-3',
    scrub: 1,
    start: "top 70%",
    end: "bottom bottom"
  }
});

// GSAP animation for the choropleth chart with class .lnos-chart
// Wait for the SVG to be injected, then run the animation
setTimeout(() => {
  gsap.from('.lnos-chart', {
    opacity: 0,
    y: -200,
    scrollTrigger: {
      trigger: '#lnos-chart',
      scrub: 1,
      start: 'top 80%',
      end: 'bottom bottom',
    }
  });
}, 500); // Adjust delay based on your SVG injection timing
