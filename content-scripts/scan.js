// Inject Toastify CSS dynamically
const toastifyCSS = document.createElement("link");
toastifyCSS.rel = "stylesheet";
toastifyCSS.href = "https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css";
document.head.appendChild(toastifyCSS);

// Inject Toastify JS dynamically
const toastifyJS = document.createElement("script");
toastifyJS.src = "https://cdn.jsdelivr.net/npm/toastify-js";
document.head.appendChild(toastifyJS);

toastifyJS.onload = async () => {
  // Grab text content from page (simplified: first 1000 chars)
  const pageText = document.body.innerText.slice(0, 1000);

  // Backend URL (change for production)
  const backend = "http://localhost:5000";

  let data;
  try {
    const resp = await fetch(`${backend}/fraud-check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: pageText })
    });

    if (!resp.ok) throw new Error(`Server error: ${resp.status}`);
    data = await resp.json();
  } catch (err) {
    return Toastify({
      text: `❌ Error: ${err.message}`,
      duration: 4000,
      gravity: "top",
      position: "center",
      style: { background: "linear-gradient(to right, #ff5f6d, #ffc371)" }
    }).showToast();
  }

  // Show result
  if (data.fraud) {
    Toastify({
      text: `🚨 Fraud detected! Reason: ${data.reason || "Suspicious content"}`,
      duration: 5000,
      gravity: "top",
      position: "center",
      style: { background: "linear-gradient(to right, #ff5f6d, #ffc371)" }
    }).showToast();
  } else {
    Toastify({
      text: `✅ This site looks safe (Confidence: ${data.confidence || "N/A"})`,
      duration: 5000,
      gravity: "top",
      position: "center",
      style: { background: "linear-gradient(to right, #00b09b, #96c93d)" }
    }).showToast();
  }
};
