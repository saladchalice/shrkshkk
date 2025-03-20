// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    const rows = document.querySelectorAll('.row');
    
    // Fade in rows first
    rows.forEach((row, index) => {
        setTimeout(() => {
            row.classList.add('visible'); // Make the row visible
            // Now, fade in images within the row
            const images = row.querySelectorAll('.column img');
            images.forEach((image, imgIndex) => {
                setTimeout(() => {
                    image.classList.add('visible'); // Make image visible
                }, imgIndex * 300); // Delay each image's fade-in by 300ms
            });
        }, index * 10); // Delay each row's fade-in by 500ms
    });

    // scroll
    const aboutOption = document.querySelector('.scroll-to-intro');
    const introContainer = document.getElementById('intro-container');

    // Ensure the element exists before adding an event listener
    if (aboutOption && introContainer) {
        aboutOption.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior

            // Scroll smoothly to the intro container
            introContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    
});
