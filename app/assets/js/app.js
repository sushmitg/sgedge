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
  var op = startLevel;
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
var heroText = document.querySelector('.large-hero__text-content');
if (heroText) {
  heroText.style.opacity = '0';
};
attach(window, 'load', function() {
  fadeOut(loader, 1, 0, 50, function(cb) {
    loader.style.display = 'none';
    if (heroText) {
      heroText.classList += ' fadeInDown';
    };
  });
}, false);

// Shrink Logo on scroll
// Look for Logo
var header = document.querySelector('header');
var logo = header.querySelector('.brand-logo');
// Check if on Homepage ?
var is_root = /^\/(?:|index\.html?)$/i.test(location.pathname);
// Add Shrink Logo Scroll Event
if (is_root) {
  document.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('shadow');
      logo.classList.add('brand-logo__shrink');
    } else {
      header.classList.remove('shadow');
      logo.classList.remove('brand-logo__shrink');
    }
  });
} else {
  header.classList.add('shadow');
  logo.classList.add('brand-logo__shrink');
}

// Reveal on Scroll Animation -- Waypoints.js
[].forEach.call(document.querySelectorAll('.on-scroll-reveal'), function(el) {
  var animationClass = el.dataset.animation;
  var offset = el.dataset.offset;
  var delay = el.dataset.animationdelay;
  // Add class animated frome Animate.css and
  el.classList.add('animated');
  // opacity to 0 to hide element initially...
  el.style.opacity = '0';
  el.style.animationDelay = delay;
  // adding on scroll trigger using waypoints.js
  var waypoint = new Waypoint({
    element: el,
    handler: function() {
      this.element.classList.add(animationClass);
      el.style.opacity = '1';
    },
    offset: offset
  });
});

// External Links Cool animation icon
[].forEach.call(document.querySelectorAll('a[target="_blank"]'), function(el) {
  el.innerHTML += "<i><hr><hr><hr><hr><hr></i>";
});

// Delay redirect by .7s for anchor tags with .btn class
[].forEach.call(document.querySelectorAll('a.btn'), function(el) {
  el.addEventListener("click", function(e) {
    e.preventDefault();
    var URL = this.href;
    setTimeout(function() {
      window.location.href = URL;
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
  if (e.target.nodeName == "A" && hasClass(hamburger, "is-active")) {
    hamburger.classList.toggle("is-active");
  }
});

//last page section Bottom Margin equals to Footer height for Reveal Parallax effect.
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
document.querySelector('body > *:nth-last-child(4)').style.marginBottom = footerHeight;

//create tabs
if (document.querySelector('#newProducts')) {
  document.querySelector('#newProducts').style.display = 'block';
}

[].forEach.call(document.querySelectorAll('.tab__links'), function(el) {
  el.addEventListener("click", function(e) {
    var i, tabcontent, tablinks;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.querySelectorAll(".tab__content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
      tabcontent[i].className = tabcontent[i].className.replace(" fadeIn", "");
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.querySelectorAll(".tab__links");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(this.dataset.id).classList += " fadeIn";
    document.getElementById(this.dataset.id).style.display = "block";
    e.currentTarget.className += " active";
  });
});

var hash = window.location.hash ;
if(hash) {
  document.querySelector(hash.toString()).click();
}

[].forEach.call(document.querySelectorAll("a[href^='products.html']"), function(el){
  el.addEventListener("click", function(e) {
    e.preventDefault();
    var URL = this.href;
    if(window.location.href == URL){
      var hash = window.location.hash ;
      console.log(hash);
      console.log(window.location.href == URL);
      document.querySelector(hash.toString()).click();
    } else {
      window.location.href = URL;
    }
  });
});
