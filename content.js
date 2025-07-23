function replaceText(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    node.textContent = node.textContent.replace(/\bConnections\b/g, "Friends");
  } else {
    node.childNodes.forEach(replaceText);
  }
}

function replaceAllConnections() {
  document.querySelectorAll("*").forEach(el => {
    if (el.children.length === 0) {
      if (el.textContent.includes("Connections")) {
        el.textContent = el.textContent.replace(/\bConnections\b/g, "Friends");
      }
    }
  });
}

// Run once on load
replaceAllConnections();

// Run on dynamic content changes
const observer = new MutationObserver(mutations => {
  for (const mutation of mutations) {
    mutation.addedNodes.forEach(node => {
      try {
        replaceText(node);
      } catch (e) {}
    });
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});