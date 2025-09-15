const checkBtn = document.getElementById("checkBtn");
const smsText = document.getElementById("smsText");

async function checkSMS(text) {
  // Change this to your backend (use HTTPS in production)
  const backend = "http://localhost:5000"; 

  try {
    const resp = await fetch(`${backend}/fraud-check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    if (!resp.ok) throw new Error(`Server error: ${resp.status}`);
    return await resp.json();

  } catch (err) {
    return { error: err.message || "Network error" };
  }
}

function showToast(message, type = "info") {
  let bgColor = "#007bff"; // default blue

  if (type === "success") bgColor = "linear-gradient(to right, #00b09b, #96c93d)";
  if (type === "error") bgColor = "linear-gradient(to right, #ff5f6d, #ffc371)";
  if (type === "warning") bgColor = "linear-gradient(to right, #f7971e, #ffd200)";

  Toastify({
    text: message,
    duration: 4000,
    gravity: "top", // top or bottom
    position: "center", // left, center, right
    stopOnFocus: true,
    style: { background: bgColor }
  }).showToast();
}

checkBtn.addEventListener("click", async () => {
  const text = smsText.value.trim();

  if (!text) {
    showToast("⚠️ Please paste an SMS first.", "warning");
    return;
  }

  showToast("🔎 Checking SMS...", "info");

  const data = await checkSMS(text);

  if (data.error) {
    showToast(`❌ Error: ${data.error}`, "error");
  } else if (data.fraud) {
    showToast(`🚨 Fraud detected! Reason: ${data.reason}`, "error");
  } else {
    showToast(`✅ Safe. Confidence: ${data.confidence}`, "success");
  }
});
