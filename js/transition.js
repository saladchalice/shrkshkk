// document.addEventListener("DOMContentLoaded", () => {
//   const ease = "power4.inOut";
//   const wave = document.querySelector(".wave");

//   // Start with wave fully expanded (cover screen)
//   gsap.set(wave, { clipPath: 'circle(150% at 100% 100%)' });

//   // On page load: animate wave shrinking to reveal content
//   gsap.to(wave, {
//     clipPath: 'circle(0% at 100% 100%)',
//     duration: 1,
//     ease: ease,
//   });

//   document.querySelectorAll("a").forEach((link) => {
//     link.addEventListener("click", (event) => {
//       const href = link.getAttribute("href");

//       if (href && !href.startsWith("#") && href !== window.location.pathname) {
//         event.preventDefault();

//         // Animate wave expanding to cover the screen before navigation
//         gsap.to(wave, {
//           clipPath: 'circle(150% at 100% 100%)',
//           duration: 1,
//           ease: ease,
//           onComplete: () => {
//             window.location.href = href;
//           },
//         });
//       }
//     });
//   });
// });
