/* ==========================================================================
   Draggable before/after reveal slider — vanilla, pointer + touch + keyboard.
   Usage: any element with [data-ba]:
     <div class="ba" data-ba>
       <img class="ba__img ba__after" ...>            (after = base layer)
       <div class="ba__before-wrap"><img class="ba__img" ...></div>
       <span class="ba__tag ba__tag--before">Before</span>
       <span class="ba__tag ba__tag--after">After</span>
       <button class="ba__handle" ...><span class="ba__knob">…</span></button>
       <span class="ba__hint">Drag to compare</span>
     </div>
   ========================================================================== */
(function () {
  "use strict";

  function initBA(root) {
    var wrap = root.querySelector(".ba__before-wrap");
    var handle = root.querySelector(".ba__handle");
    if (!wrap || !handle) return;

    var pos = 50;          // percentage revealed of "before"
    var dragging = false;

    function setPos(p) {
      pos = Math.max(0, Math.min(100, p));
      wrap.style.clipPath = "inset(0 " + (100 - pos) + "% 0 0)";
      handle.style.left = pos + "%";
      handle.setAttribute("aria-valuenow", Math.round(pos));
    }

    function pctFromEvent(clientX) {
      var rect = root.getBoundingClientRect();
      return ((clientX - rect.left) / rect.width) * 100;
    }

    function onDown(e) {
      dragging = true;
      root.classList.add("touched");
      root.setPointerCapture && e.pointerId != null && root.setPointerCapture(e.pointerId);
      setPos(pctFromEvent(e.clientX));
      e.preventDefault();
    }
    function onMove(e) {
      if (!dragging) return;
      setPos(pctFromEvent(e.clientX));
    }
    function onUp() { dragging = false; }

    // Pointer events cover mouse + touch + pen in modern browsers.
    if (window.PointerEvent) {
      root.addEventListener("pointerdown", onDown);
      root.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      root.addEventListener("pointercancel", onUp);
    } else {
      // Fallback for older browsers.
      root.addEventListener("mousedown", function (e) { onDown(e); });
      window.addEventListener("mousemove", function (e) { if (dragging) setPos(pctFromEvent(e.clientX)); });
      window.addEventListener("mouseup", onUp);
      root.addEventListener("touchstart", function (e) {
        root.classList.add("touched"); dragging = true;
        setPos(pctFromEvent(e.touches[0].clientX));
      }, { passive: true });
      root.addEventListener("touchmove", function (e) {
        if (!dragging) return;
        setPos(pctFromEvent(e.touches[0].clientX));
      }, { passive: true });
      window.addEventListener("touchend", onUp);
    }

    // Keyboard accessibility on the handle (role="slider").
    handle.addEventListener("keydown", function (e) {
      var step = e.shiftKey ? 10 : 4;
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") { setPos(pos - step); e.preventDefault(); }
      else if (e.key === "ArrowRight" || e.key === "ArrowUp") { setPos(pos + step); e.preventDefault(); }
      else if (e.key === "Home") { setPos(0); e.preventDefault(); }
      else if (e.key === "End") { setPos(100); e.preventDefault(); }
      root.classList.add("touched");
    });
    handle.addEventListener("focus", function () { root.classList.add("touched"); });

    // Re-apply on resize (clip-path is percentage-based so this is cheap).
    setPos(50);
  }

  function boot() {
    var nodes = document.querySelectorAll("[data-ba]");
    for (var i = 0; i < nodes.length; i++) initBA(nodes[i]);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
