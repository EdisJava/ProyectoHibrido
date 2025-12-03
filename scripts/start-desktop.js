//Script de prueba para que solo se abra una vez


const { spawn } = require("child_process");
const http = require("http");

let expoPort = null;
let electronStarted = false; // 🚫 evita múltiples lanzamientos

console.log("🚀 Iniciando Expo Web...");

const expo = spawn("npm", ["run", "web"], {
  stdio: ["inherit", "pipe", "pipe"],
  shell: true,
});

function extractPort(text) {
  if (expoPort) return; // 🔒 si ya lo tenemos, no seguir buscando

  const match = text.match(/http:\/\/localhost:(\d+)/);
  if (match) {
    expoPort = match[1];
    console.log("🔍 Puerto Expo detectado:", expoPort);
  }
}

expo.stdout.on("data", (data) => {
  const text = data.toString();
  process.stdout.write(text);
  extractPort(text);
});

expo.stderr.on("data", (data) => {
  const text = data.toString();
  process.stderr.write(text);
  extractPort(text);
});

async function waitForExpo(url) {
  return new Promise((resolve) => {
    const tryConnect = () => {
      http.get(url, () => resolve(true)).on("error", () => {
        setTimeout(tryConnect, 800);
      });
    };
    tryConnect();
  });
}

// 🔄 Revisa cada segundo hasta que Expo esté listo solo una vez
setInterval(async () => {
  if (!expoPort || electronStarted) return;

  const url = `http://localhost:${expoPort}`;
  console.log(`⏳ Verificando si Expo Web está disponible en ${url}...`);

  const ok = await waitForExpo(url);

  if (ok && !electronStarted) {
    electronStarted = true; // 🔒 evita duplicados
    console.log("⚡ Expo listo. Iniciando Electron...");

    spawn("npx", ["electron", "electron/main.js", expoPort], {
      stdio: "inherit",
      shell: true,
    });
  }
}, 1000);
