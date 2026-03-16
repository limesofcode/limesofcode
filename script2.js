const output = document.getElementById("output");
const inputLine = document.getElementById("inputLine");
const terminalInput = document.getElementById("terminalInput");

const bootLines = [
  "Accessing directory...",
  "Verifying clearance against L.I.M.E.R. patrol network...",
  "Restricted directory confirmed.",
  "Enter authentication command: login [password]"
];

function typeBootLine(text, showPrompt = false, callback) {
  const p = document.createElement("p");
  output.appendChild(p);
  if (showPrompt) p.textContent = "C:\\Users\\guest> ";
  let i = 0;
  function type() {
    if (i < text.length) {
      p.textContent += text.charAt(i);
      i++;
      setTimeout(type, 50);
    } else if (callback) callback();
  }
  type();
}

let lineIndex = 0;
function startBoot() {
  if (lineIndex < bootLines.length) {
    const showPrompt = lineIndex === 0;
    typeBootLine(bootLines[lineIndex], showPrompt, () => {
      lineIndex++;
      startBoot();
    });
  } else {
    inputLine.style.display = "flex";
    terminalInput.focus();
  }
}
startBoot();

terminalInput.addEventListener("keydown", async function (e) {
  if (e.key !== "Enter") return;

  const command = terminalInput.value.trim();
  terminalInput.value = "";

  const p = document.createElement("p");
  p.textContent = "C:\\Users\\guest> " + command;
  output.appendChild(p);

  if (command.startsWith("login ")) {
    const password = command.replace("login ", "");
    const msg = document.createElement("p");
    output.appendChild(msg);

    try {
      const response = await fetch("https://limesofsourcecode.netlify.app/.netlify/functions/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const result = await response.json();

      if (result.success) {
        msg.textContent = "Access granted.";

        // save JWT
        localStorage.setItem("limeAuth", result.token);

        // fetch protected content
        setTimeout(() => {
          window.location.href = "/main/bewarelimerangersahead.html";
        }, 1000);

      } else {
        msg.textContent = result.error || "Access denied.";
      }

    } catch (err) {
      msg.textContent = "Error connecting to server.";
    }

  } else {
    const msg = document.createElement("p");
    msg.textContent = `'${command}' is either incomplete or not recognized as an internal or external command.`;
    output.appendChild(msg);
  }

  window.scrollTo(0, document.body.scrollHeight);
});
