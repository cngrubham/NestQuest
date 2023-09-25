document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.querySelector(".nav-bar-links");
  const navCollapse = document.getElementById("nav-collapse");

  navToggle.addEventListener("click", function () {
    navMenu.classList.toggle("show");
    navToggle.classList.toggle("expanded");

    if (navToggle.classList.contains("expanded")) {
      navToggle.style.display = "none";
      navCollapse.style.display = "block"; // Show the menu icon
    } else {
      navToggle.style.display = "block";
      navCollapse.style.display = "none"; // Hide the menu icon
    }
  });

  navCollapse.addEventListener("click", function () {
    navMenu.classList.remove("show");
    navToggle.classList.remove("expanded");
    navToggle.style.display = "block";
    navCollapse.style.display = "none";
  });
});
