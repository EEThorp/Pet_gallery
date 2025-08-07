console.log('Script starting...');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    const displayedImage = document.getElementById('displayedImage');
    console.log('displayedImage:', displayedImage);
    
    const pullRope = document.getElementById('pullRope');
    console.log('pullRope:', pullRope);
    
    const pullRopeContainer = document.getElementById('pullRopeContainer');
    console.log('pullRopeContainer:', pullRopeContainer);
    
    const crowds = Array.from({ length: 6 }, (_, i) => document.getElementById(`crowd${i + 1}`));
    
    // Get list of all images in the nepetaImages folder
    const imageCount = 22; // Total number of images in nepetaImages folder
    let currentImageIndex = Math.floor(Math.random() * imageCount) + 1;
    
    // Set initial image
    displayedImage.src = `nepetaImages/${currentImageIndex}.png`;

    function animateCrowds() {
        crowds.forEach((crowd, index) => {
            setTimeout(() => {
                crowd.classList.remove('bouncing');
                crowd.offsetHeight; // Force reflow
                
                // Set a random animation duration between 1s and 1.4s
                const duration = 1 + (Math.random() * 0.4);
                crowd.style.animationDuration = `${duration}s`;
                
                crowd.classList.add('bouncing');
            }, index * 150); // Increased delay between each crowd member
        });
    }

    function changePicture() {
        // Get new random image index (different from current)
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * imageCount) + 1;
        } while (newIndex === currentImageIndex);
        
        currentImageIndex = newIndex;
        displayedImage.src = `nepetaImages/${currentImageIndex}.png`;
        
        // Animate pull rope
        pullRopeContainer.classList.remove('pulled');
        pullRopeContainer.offsetHeight; // Force reflow
        pullRopeContainer.classList.add('pulled');
        
        // Remove the animation class after it completes
        setTimeout(() => {
            pullRopeContainer.classList.remove('pulled');
        }, 500); // Match this to the animation duration in CSS
        
        // Animate crowds with slight delay
        setTimeout(animateCrowds, 100);
    }

    // Add click handler
    function handleClick(e) {
        console.log('Click event:', e);
        console.log('Clicked element:', e.target);
        console.log('Current element:', this);
        e.preventDefault();
        changePicture();
    }

    console.log('Adding click handlers...');
    
    // Add click handlers directly with inline functions to verify they're being added
    pullRopeContainer.onclick = function(e) {
        console.log('Container clicked');
        handleClick(e);
    };
    
    pullRope.onclick = function(e) {
        console.log('Rope clicked');
        handleClick(e);
    };
    
    console.log('Click handlers added');
});