let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');
let seeMoreButtons = document.querySelectorAll('.seeMore');
let backButton = document.getElementById('back');

nextButton.onclick = function(){
    showSlider('next');
}
prevButton.onclick = function(){
    showSlider('prev');
}

// Function to hide the arrow buttons
function hideArrowButtons() {
    nextButton.style.display = 'none';
    prevButton.style.display = 'none';
}

// Function to show the arrow buttons
function showArrowButtons() {
    nextButton.style.display = 'block';  // Or 'inline' depending on your original CSS
    prevButton.style.display = 'block';
}

seeMoreButtons.forEach(button => {
    button.addEventListener('click', hideArrowButtons);
});

backButton.addEventListener('click', showArrowButtons);

let unAcceppClick;
const showSlider = (type) => {
    // nextButton.style.pointerEvents = 'none';
    // prevButton.style.pointerEvents = 'none';

    carousel.classList.remove('next', 'prev');
    let items = document.querySelectorAll('.carousel .list .item');
    if(type === 'next'){
        listHTML.appendChild(items[0]);
        carousel.classList.add('next');
    }else{
        listHTML.prepend(items[items.length - 1]);
        carousel.classList.add('prev');
    }
    clearTimeout(unAcceppClick);
    unAcceppClick = setTimeout(()=>{
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    }, 2000)
}
seeMoreButtons.forEach((button) => {
    button.onclick = function(){
        carousel.classList.remove('next', 'prev');
        carousel.classList.add('showDetail');
        backButton.style.opacity = '1'; // Show the 'See All' button
        backButton.style.pointerEvents = 'auto'; // Make it clickable
    }
});
backButton.onclick = function(){
    carousel.classList.remove('showDetail');
    backButton.style.opacity = '0'; // Hide the 'See All' button
    backButton.style.pointerEvents = 'none'; // Make it non-clickable
}

let lastTouchEnd = 0;

function handleTouchStart(event) {
    event.preventDefault(); // Always prevent default to stop any double-tap zoom
}

function handleTouchEnd(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) { // Check if the touches are close in time
        event.preventDefault();  // Prevent the default action to stop zoom
    } else {
        // If it's not a double-tap, let the button function proceed
        lastTouchEnd = now; // Update last touch end time
        // Simulate a click for functionality
        event.target.click();
    }
}

// Apply touch event handlers to your buttons
nextButton.addEventListener('touchstart', handleTouchStart, false);
nextButton.addEventListener('touchend', handleTouchEnd, false);
prevButton.addEventListener('touchstart', handleTouchStart, false);
prevButton.addEventListener('touchend', handleTouchEnd, false);


document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.querySelector('.navbar');

    // Throttle function to limit the rate at which a function can fire.
    const throttle = (func, limit) => {
        let lastFunc;
        let lastRan;
        return function() {
            const context = this;
            const args = arguments;
            if (!lastRan) {
                func.apply(context, args);
                lastRan = Date.now();
            } else {
                clearTimeout(lastFunc);
                lastFunc = setTimeout(function() {
                    if ((Date.now() - lastRan) >= limit) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                }, limit - (Date.now() - lastRan));
            }
        }
    };

    // Function to adjust navbar based on scroll position
    const adjustNavbar = throttle(function() {
        var scrollPosition = window.scrollY;
        if (scrollPosition > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    }, 100); // Update '100' to increase or decrease the throttle limit as needed

    // Initial check and setup scroll event listener
    adjustNavbar();
    window.addEventListener('scroll', adjustNavbar);
});

