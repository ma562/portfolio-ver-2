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

// Variable to store the timestamp of the last touch end event
let lastTouchTime = 0;

function preventDoubleTapZoom(element) {
    element.addEventListener('touchend', function(e) {
        const now = Date.now();
        if (now - lastTouchTime <= 300) { // If the current tap and the last tap are within 300 milliseconds
            e.preventDefault();  // Prevent the default action (zoom)
        }
        lastTouchTime = now; // Update the lastTouchTime to the current time
    }, false);
}

// Apply the double-tap prevention function to next and previous buttons
preventDoubleTapZoom(nextButton);
preventDoubleTapZoom(prevButton);
