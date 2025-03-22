document.addEventListener("DOMContentLoaded", () => {
    const ease = "power4.inOut";

    // Ensure .block elements are visible
    gsap.set(".block", { visibility: "visible", minHeight: "50px" });

    document.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");

            if (href && !href.startsWith("#") && href !== window.location.pathname) {
                // Trigger the transition and then navigate
                animateTransition().then(() => {
                    // Delay navigation to ensure the transition completes
                    setTimeout(() => {
                        window.location.href = href;
                    }, 100); // Adjust the delay as needed
                });
            }
        });
    });

    // Initial reveal transition
    revealTransition().then(() => {
        gsap.set(".block", { visibility: "hidden" });
    });

    function revealTransition() {
        return new Promise((resolve) => {
            gsap.set(".block", { scaleY: 1 });
            gsap.to(".block", {
                scaleY: 0,
                duration: 1,
                stagger: {
                    each: 0.1,
                    from: "start",
                    grid: "auto",
                    axis: "x",
                },
                ease: ease,
                onComplete: resolve,
            });
        });
    }

    function animateTransition() {
        return new Promise((resolve) => {
            gsap.set(".block", { visibility: "visible", scaleY: 0 });
            gsap.to(".block", {
                scaleY: 1,
                duration: 1,
                stagger: {
                    each: 0.1,
                    from: "start",
                    grid: { rows: 2, columns: 5 },
                    axis: "x",
                },
                ease: ease,
                onComplete: resolve,
            });
        });
    }
});
