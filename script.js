// Overlay menu
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");

function setMenu(open) {
  document.body.classList.toggle("menu-open", open);
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menu.setAttribute("aria-hidden", !open);
}

menuBtn.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

// Project carousel
const track = document.getElementById("track");
const slides = track.querySelectorAll(".slide");
const count = document.getElementById("count");

function step() {
  return slides[1].offsetLeft - slides[0].offsetLeft;
}

function current() {
  return Math.round(track.scrollLeft / step());
}

function updateCount() {
  count.textContent = `Item ${current() + 1} of ${slides.length}`;
}

document.querySelector(".prev").addEventListener("click", () => {
  const i = current();
  track.scrollTo({ left: (i === 0 ? slides.length - 1 : i - 1) * step() });
});
document.querySelector(".next").addEventListener("click", () => {
  const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  track.scrollTo({ left: atEnd ? 0 : (current() + 1) * step() });
});
track.addEventListener("scroll", updateCount, { passive: true });
updateCount();

document.getElementById("year").textContent = new Date().getFullYear();
