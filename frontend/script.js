const input = document.getElementById("input");
const log = document.getElementById("log");

input.addEventListener("keydown", async function (e) {
  if (e.key === "Enter") {
    const message = input.value.trim();
    if (!message) return;
    log.innerText += `> ${message}\n`;
    input.value = "";

    try {
      const response = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      if (data.reply) {
        log.innerText += `🖥️ ${data.reply}\n\n`;
      } else {
        log.innerText += "🖥️ Error: " + data.error + "\n\n";
      }
    } catch (err) {
      log.innerText += "🖥️ Network error.\n\n";
    }
  }
});
