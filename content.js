function replaceConnections() {
  document.querySelectorAll("*").forEach(el => {
    if (el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE) {
      if (el.textContent.includes("Connections")) {
        el.textContent = el.textContent.replace(/Connections/g, "Friends");
      }
    }
  });
}

const observer = new MutationObserver(() => {
  replaceConnections();
});

window.addEventListener("load", () => {
  replaceConnections();
  observer.observe(document.body, { childList: true, subtree: true });
});
