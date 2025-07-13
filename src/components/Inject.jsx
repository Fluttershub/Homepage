async function getClientIP() {
  try {
    const res = await fetch("https://api64.ipify.org?format=json");
    const data = await res.json();
    return data.ip || "127.0.0.1";
  } catch (error) {
    console.error("Failed to get IP:", error);
    return "Unknown IP";
  }
}
async function getCensoredIP() {
  const ip = await getClientIP();
  // Check if IP is valid IPv4
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(ip)) {
    const parts = ip.split('.');
    // Replace first two octets with xxx
    return `xxx.xxx.${parts[2]}.${parts[3]}`;
  }
  // If IP not valid or something else, just return unknown style
  return "127.0.0.1";
}

export default async function GetBrowserTexts() {
    const detectBrowser = () => {
    const ua = navigator.userAgent;

    if (navigator.brave && window.navigator.brave.isBrave) {
        return "Brave";
    }
    if (ua.includes("OPR/") || ua.includes("Opera")) {
        return "Opera";
    }
    if (ua.includes("Edg/")) {
        return "Microsoft Edge";
    }
    if (ua.includes("Chrome/") && !ua.includes("Edg/") && !ua.includes("OPR/")) {
        // Chrome but not Edge or Opera
        return "Google Chrome";
    }
    if (ua.includes("Safari/") && !ua.includes("Chrome/")) {
        return "Safari";
    }
    if (ua.includes("Firefox/")) {
        return "Firefox";
    }
    return "Detected Unknown Browser";
    };


  const browserMessage = detectBrowser();
  const clientIP = await getCensoredIP();
return [
    "Detected Exploitable browser: \n" + browserMessage,
    "Injecting payload...",
    "Client IP: 127.0.0.1",
    "Local host detected, Bypassing browser security...",
    "Decrypting IP address...",
    `Client IP: ${clientIP}`,
    "Attempting to Bypass Firewall...",
    "Putting out the fire...",
    "Launching quantum crypto miner...",
    "Enabling dark mode on your fridge...",
    "Downloading your browser history...",
    "Detected Kasane Teto in your browser history.",
    "Based.",
    "Ordering pizza to your house...",
    "Purging InterNIC logs...",
];
}
