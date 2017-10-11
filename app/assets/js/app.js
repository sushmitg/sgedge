require('../../../node_modules/waypoints/lib/noframework.waypoints.min');


function attach(element, listener, ev, tf) {

  if (element.attachEvent) {

    element.attachEvent("on" + listener, ev);

  } else {

    element.addEventListener(listener, ev, tf);

  }

}

function fadeOut(element, startLevel, endLevel, duration, callback) {

  var fOInt;

  op = startLevel;

  fOInt = setInterval(function() {

    if (op <= endLevel) {

      element.style.opacity = endLevel;
      element.style.filter = "alpha(opacity = " + endLevel + ")";

      clearInterval(fOInt);

      if (typeof callback == 'function') callback(true);

    } else {

      op -= 0.1;
      element.style.opacity = op;
      element.style.filter = "alpha(opacity = " + op * 100 + ")";

    }

  }, duration);

}
var loader = document.querySelector('.loader');

attach(window, 'load', function() {
  fadeOut(loader, 1, 0, 50, function(cb) {
    loader.style.display = 'none';
  });

  var heroText = document.querySelector('.large-hero__text-content');

  heroText.classList += ' fadeInUp--Hero';

}, false);

// function fadeOut(el){
//   el.style.opacity = 1;
//
//   (function fade() {
//     if ((el.style.opacity -= .1) < 0) {
//       el.style.display = "none";
//     } else {
//       requestAnimationFrame(fade);
//     }
//   })();
// };
//
// window.addEventListener('load', fadeOut(el));

// // Show loader while page loads....
// function onReady(callback) {
//     var intervalID = window.setInterval(checkReady, 2000);
//     function checkReady() {
//         if (document.getElementsByTagName('body')[0] !== undefined) {
//             window.clearInterval(intervalID);
//             callback.call(this);
//         }
//     }
// }
//
// function show(el, value) {
//     document.querySelector(el).style.display = value ? 'block' : 'none';
// }
//
// onReady(function () {
//     show('.loader', false);
//     show('body', true);
// });



// Shrink Logo on scroll
// Look for Logo
var header = document.querySelector('header');
var logo = header.querySelector('.brand-logo');
// Add Scroll Event
document.addEventListener('scroll', function() {
  if (window.scrollY > 100) {
    header.classList.add('shadow');
    logo.classList.add('brand-logo__shrink');
  } else {
    header.classList.remove('shadow');
    logo.classList.remove('brand-logo__shrink');
  }
});



// Reveal on Scroll Animation -- Waypoints.js
[].forEach.call(document.querySelectorAll('.on-scroll-reveal'), function(el) {
  // Add class animated frome Animate.css and
  // opacity to 0 to hide element initially...
  el.className += ' animated';
  el.style.opacity = 0;
  // adding on scroll trigger using waypoints.js
  var waypoint = new Waypoint({
    element: el,
    handler: function() {
      this.element.className += ' fadeInUp';
    },
    offset: '80%'
  })
});


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
