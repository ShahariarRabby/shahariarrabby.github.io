// ============================================
// rabby.dev — JavaScript
// ============================================

(function() {
  "use strict";

  // ---------- Theme ----------
  var html = document.documentElement;
  var toggle = document.getElementById("themeToggle");
  var icon = document.getElementById("themeIcon");

  function autoTheme() {
    var h = new Date().getHours();
    return h >= 6 && h < 18 ? "light" : "dark";
  }

  function apply(t) {
    html.setAttribute("data-theme", t);
    localStorage.setItem("theme", t);
    icon.textContent = t === "dark" ? "☾" : "☀";
  }

  if (toggle && icon) {
    apply(localStorage.getItem("theme") || autoTheme());
    toggle.addEventListener("click", function() {
      var c = html.getAttribute("data-theme");
      apply(c === "dark" ? "light" : "dark");
    });
  }

  // ---------- Scroll Reveal ----------
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && items.length) {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -32px 0px" });
    items.forEach(function(el) { obs.observe(el); });
  } else {
    items.forEach(function(el) { el.classList.add("visible"); });
  }

  // ---------- Animated Counters ----------
  var counters = document.querySelectorAll(".counter");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function animateCounter(el) {
    var target = parseFloat(el.getAttribute("data-target"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    if (reduceMotion) {
      el.textContent = decimals ? target.toFixed(decimals) : Math.round(target).toLocaleString();
      return;
    }
    var duration = 1400;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      el.textContent = decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (counters.length) {
    if ("IntersectionObserver" in window) {
      var cObs = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
          if (e.isIntersecting) {
            animateCounter(e.target);
            cObs.unobserve(e.target);
          }
        });
      }, { threshold: 0.4 });
      counters.forEach(function(el) { cObs.observe(el); });
    } else {
      counters.forEach(animateCounter);
    }
  }

  // ---------- Cursor Glow on Cards ----------
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll(".bento__card").forEach(function(card) {
      card.addEventListener("pointermove", function(ev) {
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", ((ev.clientX - r.left) / r.width * 100) + "%");
        card.style.setProperty("--my", ((ev.clientY - r.top) / r.height * 100) + "%");
      });
    });
  }
})();
