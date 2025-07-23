
function replaceConnections(node) {
  if (node.nodeType === 3) {
    node.textContent = node.textContent
      .replace(/\bConnections\b/g, "Friends")
      .replace(/\bConnection\b/g, "Friend")
      .replace(/\bConnect\b/g, "Friends");
  } else if (node.nodeType === 1) {
    for (let child of node.childNodes) {
      replaceConnections(child);
    }
  }
}

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      replaceConnections(node);
    });
  });
});

replaceConnections(document.body);
observer.observe(document.body, { childList: true, subtree: true });
