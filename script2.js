Kyutaro
limesofcode
🥽i feel so numb

Kyutaro [DvN],  — 11/03/2026 08:52
mir
aibouuuu [toya],  — 11/03/2026 08:53
Hey
Kyutaro [DvN],  — 11/03/2026 08:53
hi
Kyutaro [DvN],  — 11/03/2026 21:32
wa
ilove yiu
Wa
Kyutaro
 pinned a message to this channel. See all pinned messages. — 13/03/2026 15:09
Kyutaro [DvN],  — Yesterday at 20:40
Access to fetch at 'https://69b6a38655d43c866d69b078--limesofsourcecode.netlify.app/' from origin 'https://limesofcode.github.io/' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
69b6a38655d43c866d69b078--limesofsourcecode.netlify.app/:1  Failed to load resource: net::ERR_FAILED
export default async function handler(request, context) {
  // Always send CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*", // or your specific GitHub Pages URL
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };

  // Respond to preflight (OPTIONS) requests
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  const data = await request.json();
  const password = data.password;
  const REAL_PASSWORD = process.env.PASSWORD;

  if (password === REAL_PASSWORD) {
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } else {
    return new Response(JSON.stringify({ success: false }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
}
export default async function handler(request, context) {
  // Always send CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*", // or your specific GitHub Pages URL
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };

  // Respond to preflight (OPTIONS) requests
  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  const data = await request.json();
  const password = data.password;
  const REAL_PASSWORD = process.env.PASSWORD;

  if (password === REAL_PASSWORD) {
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } else {
    return new Response(JSON.stringify({ success: false }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
}
Kyutaro [DvN],  — 20:25
```js
const output = document.getElementById("output");
const inputLine = document.getElementById("inputLine");
const terminalInput = document.getElementById("terminalInput");

// Boot lines

message.txt
4 KB
const output = document.getElementById("output");
const inputLine = document.getElementById("inputLine");
const terminalInput = document.getElementById("terminalInput");

const bootLines = [
    "Accessing directory...",
    "Verifying clearance against L.I.M.E.R. patrol network...",
    "Restricted directory confirmed.",
    "Enter authentication command: login [password]"
];

function typeBootLine(text, showPrompt = false, callback){
    const p = document.createElement("p");
    output.appendChild(p);

    if(showPrompt){
        p.textContent = "C:\\Users\\guest> ";
    }

    let i = 0;
    function type(){
        if(i < text.length){
            p.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        } else if(callback){
            callback();
        }
    }
    type();
}

let lineIndex = 0;

function startBoot(){
    if(lineIndex < bootLines.length){
        const showPrompt = lineIndex === 0;
        typeBootLine(bootLines[lineIndex], showPrompt, ()=>{
            lineIndex++;
            startBoot();
        });
    } else {
        inputLine.style.display = "flex";
        terminalInput.focus();
    }
}

startBoot();

terminalInput.addEventListener("keydown", async function(e){

    if(e.key !== "Enter") return;

    const command = terminalInput.value.trim();
    terminalInput.value = "";

    const p =
const output = document.getElementById("output");
const inputLine = document.getElementById("inputLine");
const terminalInput = document.getElementById("terminalInput");

const bootLines = [
    "Accessing directory...",

file (1).txt
3 KB
<script>
const token = localStorage.getItem("limeAuth");

if(!token){
    window.location.href="/";
}
</script>
Kyutaro [DvN],  — 20:36
import jwt from "jsonwebtoken";

const attempts = new Map();

export default async function handler(request) {

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  const ip = request.headers.get("x-forwarded-for") || "unknown";

  const now = Date.now();
  const windowTime = 60000; // 1 minute
  const maxAttempts = 5;

  if (!attempts.has(ip)) {
    attempts.set(ip, []);
  }

  const userAttempts = attempts.get(ip).filter(t => now - t < windowTime);
  attempts.set(ip, userAttempts);

  if (userAttempts.length >= maxAttempts) {
    return new Response(JSON.stringify({
      success:false,
      message:"Too many login attempts. Try again later."
    }), {
      headers:{...corsHeaders,"Content-Type":"application/json"}
    });
  }

  const data = await request.json();
  const password = data.password;

  if(password === process.env.PASSWORD){

    const token = jwt.sign(
      { auth:true },
      process.env.JWT_SECRET,
      { expiresIn:"1h" }
    );

    return new Response(JSON.stringify({
      success:true,
      token
    }), {
      headers:{...corsHeaders,"Content-Type":"application/json"}
    });

  } else {

    userAttempts.push(now);
    attempts.set(ip, userAttempts);

    return new Response(JSON.stringify({
      success:false
    }), {
      headers:{...corsHeaders,"Content-Type":"application/json"}
    });

  }
}
import jwt from "jsonwebtoken";

export default async function handler(request){

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Authorization",
    "Access-Control-Allow-Methods": "GET, OPTIONS"
  };

  if(request.method === "OPTIONS"){
    return new Response(null,{headers:corsHeaders,status:204});
  }

  const authHeader = request.headers.get("Authorization");

  if(!authHeader){
    return new Response(JSON.stringify({valid:false}),{
      headers:{...corsHeaders,"Content-Type":"application/json"}
    });
  }

  const token = authHeader.replace("Bearer ","");

  try{

    jwt.verify(token, process.env.JWT_SECRET);

    return new Response(JSON.stringify({valid:true}),{
      headers:{...corsHeaders,"Content-Type":"application/json"}
    });

  }catch{

    return new Response(JSON.stringify({valid:false}),{
      headers:{...corsHeaders,"Content-Type":"application/json"}
    });

  }
}
<script>

const token = localStorage.getItem("limeAuth");

if(!token){
  window.top.location.href = "/";
}

fetch("https://limesofsourcecode.netlify.app/.netlify/functions/verifyToken",{
  headers:{
    Authorization: "Bearer " + token
  }
})
.then(res => res.json())
.then(data => {
  if(!data.valid){
    window.top.location.href = "/";
  }
})
.catch(()=>{
  window.top.location.href = "/";
});

</script>
Kyutaro [DvN],  — 21:11
import jwt from 'jsonwebtoken';

export default async function handler(request, context) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*", // change to your GitLab Pages URL if you want
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders, status: 204 });
  }

  const data = await request.json();
  const password = data.password;
  const REAL_PASSWORD = process.env.PASSWORD;

  // simple rate limiting: store failed attempts per IP (in-memory)
  const ip = request.headers.get("x-nf-client-connection-ip") || "unknown";
  context.log(`Login attempt from ${ip}`);

  if (!handler.failedAttempts) handler.failedAttempts = {};
  if (!handler.failedAttempts[ip]) handler.failedAttempts[ip] = 0;
  if (handler.failedAttempts[ip] > 5) {
    return new Response(JSON.stringify({ success: false, error: "Too many attempts" }), { headers: corsHeaders, status: 429 });
  }

  if (password === REAL_PASSWORD) {
    handler.failedAttempts[ip] = 0; // reset on success
    const token = jwt.sign({ user: "authorized" }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return new Response(JSON.stringify({ success: true, token }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  } else {
    handler.failedAttempts[ip]++;
    return new Response(JSON.stringify({ success: false }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
}
LOGIN.JS
import jwt from 'jsonwebtoken';

export default async function handler(request, context) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, OPTIONS"
  };

  if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders, status: 204 });

  const auth = request.headers.get("Authorization");
  if (!auth) return new Response("Unauthorized", { status: 401, headers: corsHeaders });

  const token = auth.split(" ")[1];
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    // Send your secure content here
    return new Response("<h1>Welcome to the protected content!</h1>", { headers: corsHeaders });
  } catch (err) {
    return new Response("Invalid Token", { status: 401, headers: corsHeaders });
  }
}
VERIFYTOKEN.JS
const output = document.getElementById("output");
const inputLine = document.getElementById("inputLine");
const terminalInput = document.getElementById("terminalInput");

const bootLines = [
  "Accessing directory...",

file (2).txt
3 KB
﻿
aibouuuu
spartancloverx
he/him/any
 
 
They say truth is the first casualty of war. But who defines what's true?
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
        const secureResponse = await fetch("https://limesofsourcecode.netlify.app/.netlify/functions/verifyToken", {
          headers: { "Authorization": "Bearer " + result.token }
        });
        const secureHtml = await secureResponse.text();
        document.body.innerHTML = secureHtml;

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
file (2).txt
3 KB