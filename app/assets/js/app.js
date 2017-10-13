require('../../../node_modules/waypoints/lib/noframework.waypoints.min');

function attach(element, listener, ev, tf) {
  if (element.attachEvent) { //if it's <= IE8
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
  var animationClass = el.dataset.animation;
  var offset = el.dataset.offset;
  // Add class animated frome Animate.css and
  el.classList.add('animated');
  // opacity to 0 to hide element initially...
  el.style.opacity = '0';
  // adding on scroll trigger using waypoints.js
  var waypoint = new Waypoint({
    element: el,
    handler: function() {
      this.element.classList.add(animationClass);
      el.style.opacity = '1';
    },
    offset: offset
  })
});

// External Links Cool animation icon
[].forEach.call(document.querySelectorAll('a[target="_blank"]'), function(el) {
  el.innerHTML += "<i><hr><hr><hr><hr><hr></i>";
});

// Delay redirect by .6s for anchor tags with .btn class
[].forEach.call(document.querySelectorAll('a.btn'), function(el) {
  el.addEventListener("click", function(e) {
    e.preventDefault();
    var URL = this.href
    setTimeout(function() {
      window.location.href = URL
    }, 700);
  });
});

// Mobile hamburger Click functionality
// Look for .hamburger
var hamburger = document.querySelector(".hamburger");
var menu = document.querySelector(".menu");
// On click
hamburger.addEventListener("click", function() {
  // Toggle class "is-active"
  hamburger.classList.toggle("is-active");
  // Do something else, like open/close menu
});

function hasClass(element, findclass) {
  return (' ' + element.className + ' ').indexOf(' ' + findclass + ' ') > -1;
}

// Hide Menu when clicked on anchor
menu.addEventListener("click", function(e) {
  if (e.target.nodeName = "A" && hasClass(hamburger, "is-active")) {
    hamburger.classList.toggle("is-active");
  }
});

//Contact Us section Bottom Margin equals to Footer height for Reveal Parallax effect.
function getStyle(oElm, strCssRule) {
  var strValue = "";
  if (document.defaultView && document.defaultView.getComputedStyle) {
    strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
  } else if (oElm.currentStyle) {
    strCssRule = strCssRule.replace(/\-(\w)/g, function(strMatch, p1) {
      return p1.toUpperCase();
    });
    strValue = oElm.currentStyle[strCssRule];
  }
  return strValue;
}

var footerHeight = getStyle(document.querySelector('footer'), "height");
document.querySelector('#contact-us').style.marginBottom = footerHeight;
