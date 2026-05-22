// ============================================================
// script.js — interactivity for Jackline's portfolio
// ============================================================

// 1. Set the current year in the footer automatically
document.getElementById("year").textContent = new Date().getFullYear();

// 2. Smooth scrolling for navbar links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// 3. Contact form handling
// ------------------------------------------------------------
// Later, this will POST to your FastAPI backend on Render.
// For now, it just shows a success message.
//
// When your FastAPI backend is ready, set API_BASE_URL below
// to something like: "https://your-api.onrender.com"
// ------------------------------------------------------------
const API_BASE_URL = ""; // e.g. "https://jackline-api.onrender.com"

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.textContent = "Sending...";

  const data = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
  };

  // If no backend yet, just simulate success
  if (!API_BASE_URL) {
    console.log("Mock submit:", data);
    status.textContent = "✅ Message sent (mock). I'll reply soon!";
    form.reset();
    return;
  }

  // Real backend call (FastAPI)
  try {
    const res = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Request failed");
    status.textContent = "✅ Message sent!";
    form.reset();
  } catch (err) {
    console.error(err);
    status.textContent = "❌ Could not send. Try again later.";
  }
});

// ============================================================
// 4. (Future) Fetch portfolio data from FastAPI backend
// ============================================================
// Example of how you'll load profile/skills/projects later:
//
// async function loadProfile() {
//   const res = await fetch(`${API_BASE_URL}/api/profile`);
//   const profile = await res.json();
//   document.querySelector(".hero h1").innerHTML =
//     `Hi, I'm <span class="highlight">${profile.name}</span>`;
// }
// loadProfile();
