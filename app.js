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

window.onscroll = function () {
    scrollRotate();
};

function scrollRotate() {
    let image = document.getElementById("scroll-widget");
    
    // Check if the element exists before applying the transformation
    if (image) {
        console.log('Image element:', image);
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
        <a href="data-portfolio.html">Data</a>
        <a href="resume.html">Resume</a>
        <a href="about.html">About</a>
    `;
    
});

