
// LINUX HOTEL - WEBSITE INTERACTIONS

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const toast = document.getElementById("toast");

// MOBILE MENU

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
  });
});

// DATE VALIDATION

const checkIn = document.getElementById("checkIn");
const checkOut = document.getElementById("checkOut");

const today = new Date();
const localToday = new Date(
  today.getTime() - today.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

checkIn.min = localToday;
checkOut.min = localToday;

checkIn.addEventListener("change", () => {
  checkOut.min = checkIn.value || localToday;

  if (checkOut.value && checkOut.value <= checkIn.value) {
    checkOut.value = "";
  }
});

// TOAST NOTIFICATION

let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

// BOOKING FORM - DEMO ONLY

const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", event => {
  event.preventDefault();

  if (checkIn.value <= localToday && checkIn.value < localToday) {
    showToast("Please choose a valid check-in date.");
    return;
  }

  if (checkOut.value <= checkIn.value) {
    showToast("Check-out must be after check-in.");
    return;
  }

  const name = document.getElementById("guestName").value.trim();

  showToast(
    `Thank you ${name}! Your demo enquiry is ready. No reservation was made.`
  );

  bookingForm.reset();

  checkIn.min = localToday;
  checkOut.min = localToday;
});

// GALLERY LIGHTBOX

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    lightboxImage.src = item.dataset.image;
    lightbox.classList.add("active");
    document.body.classList.add("no-scroll");
  });
});

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.classList.remove("no-scroll");
  lightboxImage.src = "";
}

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

// NEWSLETTER - DEMO ONLY

const newsletterForm = document.getElementById("newsletterForm");

newsletterForm.addEventListener("submit", event => {
  event.preventDefault();

  showToast("Thank you for your interest in Linux Hotel!");

  newsletterForm.reset();
});

// WELCOME MESSAGE IN CONSOLE

console.log("Linux Hotel website loaded successfully!");
