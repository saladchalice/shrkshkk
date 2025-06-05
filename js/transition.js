// document.addEventListener("DOMContentLoaded", () => {
//   const ease = "power4.inOut";
//   const wave = document.querySelector(".wave");
//   const content = document.querySelector(".content");

//   // Start with wave fully expanded (covers screen)
//   gsap.set(wave, { clipPath: 'circle(150% at 100% 100%)' });

//   // Shrink wave to reveal content
//   gsap.to(wave, {
//     clipPath: 'circle(0% at 100% 100%)',
//     duration: 1,
//     ease: ease,
//     onComplete: () => {
//       // Fade in content AFTER wave reveals it
//       gsap.to(content, { opacity: 1, duration: 0.3 });
//     }
//   });

//   // On link click, expand wave then navigate
//   document.querySelectorAll("a").forEach(link => {
//     const href = link.getAttribute("href");
//     if (href && !href.startsWith("#") && href !== window.location.pathname) {
//       link.addEventListener("click", event => {
//         event.preventDefault();

//         // Fade out content
//         gsap.to(content, { opacity: 0, duration: 0.2 });

//         // Expand wave
//         gsap.to(wave, {
//           clipPath: 'circle(150% at 100% 100%)',
//           duration: 1,
//           ease: ease,
//           onComplete: () => {
//             window.location.href = href;
//           }
//         });
//       });
//     }
//   });
// });
