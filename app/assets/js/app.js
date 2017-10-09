require('../../../node_modules/waypoints/lib/noframework.waypoints.min');

[].forEach.call(document.querySelectorAll('.on-scroll-reveal'),
  function(el){
    el.className += ' animated';
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
