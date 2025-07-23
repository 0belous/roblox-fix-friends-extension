
function replaceTextAndAttributes(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.includes("Connections")) {
            node.textContent = node.textContent.replace(/Connections/g, "Friends");
        }
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
        ['aria-label', 'title', 'placeholder'].forEach(attr => {
            if (node.hasAttribute(attr)) {
                const val = node.getAttribute(attr);
                if (val.includes("Connections")) {
                    node.setAttribute(attr, val.replace(/Connections/g, "Friends"));
                }
            }
        });

        node.childNodes.forEach(child => replaceTextAndAttributes(child));
    }
}

function replaceAll() {
    replaceTextAndAttributes(document.body);
}

replaceAll();

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            replaceTextAndAttributes(node);
        });
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
