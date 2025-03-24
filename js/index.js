console.clear();

window.addEventListener('load', function() {
  
  // Add the 'visible' class to the compass container to trigger the animation
  document.querySelector('.compass-container').classList.add('visible');
});


document.querySelectorAll("div").forEach(div => {
  div.addEventListener("scroll", function () {
      console.log(`Scrolling detected in: ${this.id || "Unnamed div"}`);
  });
});


// compass scroll rotate animation -----------------------------------------------------------------
gsap.registerPlugin(ScrollTrigger);



window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});

window.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});

// // Refresh ScrollTrigger when the user scrolls using any method
let lastUpdate = 0;
gsap.ticker.add(() => {
    let now = Date.now();
    if (now - lastUpdate > 100) { // Adjust 50ms for smoother performance
        ScrollTrigger.update();
        lastUpdate = now;
    }
});

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

//gsap animate lnos lines ------------------------------------------------------------------------

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

// animate lnos text ---------------------------------------------------------------
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

document.addEventListener('DOMContentLoaded', async () => {
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
});




// lnos wrapper move ----------------------------------------------------------------------------

let loop = horizontalLoop(".scroll-header", {
  speed: 1, 
  repeat: -1, 
  paddingRight: window.innerWidth, 
});

ScrollTrigger.create({
  trigger: ".scroll-container",
  start: "top 90%",
  end: "bottom top",
  scrub: 1,
  onUpdate: (self) => {
    loop.timeScale(self.direction); // Reverse on scroll up
  }
});

// gsap scrolltext helper function ---------------------------------------------------
function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({repeat: config.repeat, paused: config.paused, defaults: {ease: "none"}}),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
    totalWidth, curX, distanceToStart, distanceToLoop, item, i;
  gsap.set(items, { // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
    xPercent: (i, el) => {
      let w = widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
      xPercents[i] = snap(parseFloat(gsap.getProperty(el, "x", "px")) / w * 100 + gsap.getProperty(el, "xPercent"));
      return xPercents[i];
    }
  });
  gsap.set(items, {x: 0});
  totalWidth = items[length-1].offsetLeft + xPercents[length-1] / 100 * widths[length-1] - startX + items[length-1].offsetWidth * gsap.getProperty(items[length-1], "scaleX") + (parseFloat(config.paddingRight) || 0);
  for (i = 0; i < length; i++) {
    item = items[i];
    curX = xPercents[i] / 100 * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(item, {xPercent: snap((curX - distanceToLoop) / widths[i] * 100), duration: distanceToLoop / pixelsPerSecond}, 0)
      .fromTo(item, {xPercent: snap((curX - distanceToLoop + totalWidth) / widths[i] * 100)}, {xPercent: xPercents[i], duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond, immediateRender: false}, distanceToLoop / pixelsPerSecond)
      .add("label" + i, distanceToStart / pixelsPerSecond);
    times[i] = distanceToStart / pixelsPerSecond;
  }
  function toIndex(index, vars) {
    vars = vars || {};
    (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length); // always go in the shortest direction
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
      vars.modifiers = {time: gsap.utils.wrap(0, tl.duration())};
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }
  tl.next = vars => toIndex(curIndex+1, vars);
  tl.previous = vars => toIndex(curIndex-1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  return tl;
}