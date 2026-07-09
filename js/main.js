/* ==========================================================================
   Site interactions: header condense, mobile nav, scroll reveal,
   testimonial carousel controls, gallery lightbox.
   Vanilla JS, no dependencies. Respects prefers-reduced-motion.
   ========================================================================== */
(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Header condense on scroll ---- */
  var header = document.querySelector(".header");
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 24) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector(".nav-toggle");
  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close when a nav link is tapped.
    header.querySelectorAll(".nav a").forEach(function (a) {
      a.addEventListener("click", function () {
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---- Testimonial carousel arrows ---- */
  var track = document.querySelector(".testi-track");
  if (track) {
    var prev = document.querySelector("[data-testi-prev]");
    var next = document.querySelector("[data-testi-next]");
    var step = function () {
      var card = track.querySelector(".testi");
      return card ? card.getBoundingClientRect().width + 22 : 340;
    };
    if (prev) prev.addEventListener("click", function () {
      track.scrollBy({ left: -step(), behavior: reduced ? "auto" : "smooth" });
    });
    if (next) next.addEventListener("click", function () {
      track.scrollBy({ left: step(), behavior: reduced ? "auto" : "smooth" });
    });
  }

  /* ---- Lightbox for gallery tiles ---- */
  var lb = document.querySelector(".lightbox");
  if (lb) {
    var lbImg = lb.querySelector("img");
    var tiles = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
    var idx = 0;

    function show(i) {
      idx = (i + tiles.length) % tiles.length;
      var t = tiles[idx];
      lbImg.src = t.getAttribute("data-full") || t.querySelector("img").src;
      lbImg.alt = t.getAttribute("data-alt") || (t.querySelector("img") ? t.querySelector("img").alt : "");
    }
    function open(i) {
      show(i);
      lb.classList.add("open");
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      var c = lb.querySelector(".lightbox__close");
      if (c) c.focus();
    }
    function close() {
      lb.classList.remove("open");
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    tiles.forEach(function (t, i) {
      t.addEventListener("click", function () { open(i); });
    });
    lb.querySelector(".lightbox__close").addEventListener("click", close);
    var np = lb.querySelector(".lightbox__prev");
    var nn = lb.querySelector(".lightbox__next");
    if (np) np.addEventListener("click", function (e) { e.stopPropagation(); show(idx - 1); });
    if (nn) nn.addEventListener("click", function (e) { e.stopPropagation(); show(idx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(idx - 1);
      else if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  /* ---- Footer year ---- */
  var y = document.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();
})();
