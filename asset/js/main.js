// Vanilla JavaScript - No jQuery dependencies
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing dark mode...');
    
    // Dark mode functionality
    const d = new Date();
    const hours = d.getHours();
    const night = hours >= 18 || hours <= 6;
    const body = document.querySelector('body');
    const html = document.querySelector('html');
    const toggle = document.getElementById('toggle');
    const input = document.getElementById('switch');
    
    console.log('Elements found:', {
        body: !!body,
        html: !!html,
        toggle: !!toggle,
        input: !!input
    });
    
    if (night) {
        input.checked = true;
        body.classList.add('night');
        html.classList.add('night');
    }
    
    if (toggle) {
        console.log('Adding click listener to toggle...');
        toggle.addEventListener('click', function() {
            console.log('Toggle clicked!');
            const isChecked = input.checked;
            console.log('Current checked state:', isChecked);
            if (isChecked) {
                body.classList.remove('night');
                html.classList.remove('night');
                console.log('Switched to light mode');
            } else {
                body.classList.add('night');
                html.classList.add('night');
                console.log('Switched to dark mode');
            }
        });
    } else {
        console.error('Toggle element not found!');
    }
    
    // Scroll to top functionality
    const introHeight = document.querySelector('.intro').offsetHeight;
    const topButton = document.getElementById('top-button');
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > introHeight) {
            topButton.style.display = 'block';
            topButton.style.opacity = '1';
        } else {
            topButton.style.display = 'none';
            topButton.style.opacity = '0';
        }
    }, false);
    
    // Smooth scroll to top
    topButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Wave animation
    const hand = document.querySelector('.emoji.wave-hand');
    function waveOnLoad() {
        hand.classList.add('wave');
        setTimeout(function() {
            hand.classList.remove('wave');
        }, 2000);
    }
    
    setTimeout(function() {
        waveOnLoad();
    }, 1000);
    
    hand.addEventListener('mouseover', function() {
        hand.classList.add('wave');
    });
    
    hand.addEventListener('mouseout', function() {
        hand.classList.remove('wave');
    });
    
    // ScrollReveal animations
    window.sr = ScrollReveal({
        reset: false,
        duration: 600,
        easing: 'cubic-bezier(.694,0,.335,1)',
        scale: 1,
        viewFactor: 0.3,
    });
    
    sr.reveal('.background');
    sr.reveal('.skills');
    sr.reveal('.experience', {viewFactor: 0.2});
    sr.reveal('.featured-projects', {viewFactor: 0.1});
    sr.reveal('.other-projects', {viewFactor: 0.05});
});

// Disable right-click context menu
if (document.addEventListener) {
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    }, false);
} else {
    document.attachEvent('oncontextmenu', function() {
        window.event.returnValue = false;
    });
}