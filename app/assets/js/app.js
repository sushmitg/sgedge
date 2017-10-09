require('../../../node_modules/waypoints/lib/noframework.waypoints.min');

// Shrink Logo on scroll
// Look for Logo
var header = document.querySelector('header');
var headerPseudo = window.getComputedStyle(document.querySelector('header'), ':after')
           .getPropertyValue('content');
var logo = header.querySelector('.brand-logo');
// Add Scroll Event
document.addEventListener('scroll', function () {
  if (window.scrollY > 100) {
    header.style.boxShadow = "0 3px 5px rgba(57, 63, 72, 0.3)";
    logo.style.width = "100px";
  } else {
    header.style.boxShadow = "";
    logo.style.width = "";
    headerPseudo = "";
  }
});



// Reveal on Scroll Animation -- Waypoints.js
[].forEach.call(document.querySelectorAll('.on-scroll-reveal'), function(el){
    // Add class animated frome Animate.css and
    // opacity to 0 to hide element initially...
    el.className += ' animated';
    el.style.opacity = 0 ;
    // adding on scroll trigger using waypoints.js
    var waypoint = new Waypoint({
      element: el,
      handler: function() {
        this.element.className += ' fadeInUp';
      },
      offset: '80%'
    })
  }
);


// Look for .hamburger
var hamburger = document.querySelector(".hamburger");
var menu = document.querySelector(".menu");
// On click
hamburger.addEventListener("click", function() {
  // Toggle class "is-active"
  hamburger.classList.toggle("is-active");
  // Do something else, like open/close menu
  if (menu.style.display === "none" || menu.style.display === "") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
});
