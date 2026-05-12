/**
 * Utility to apply French typography rules (non-breaking spaces before punctuation)
 * Replaces " :" with "&nbsp;:", " ?" with "&nbsp;?", " !" with "&nbsp;!" and " ;" with "&nbsp;;"
 * Automatically handles dynamic content via MutationObserver.
 */
export function applyFrenchTypography(root) {
  // Tags to explicitly ignore to prevent breaking code or inputs
  const IGNORED_TAGS = new Set(['SCRIPT', 'STYLE', 'PRE', 'CODE', 'TEXTAREA', 'INPUT']);

  function processNode(node) {
    // Skip if node is an element and is in the ignore list
    if (node.nodeType === Node.ELEMENT_NODE && IGNORED_TAGS.has(node.tagName)) {
      return;
    }

    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.nodeValue;
      
      // Regex logic:
      // 1. Match a standard space (U+0020)
      // 2. Followed by one of the punctuation marks: ! ? : ;
      // 3. Replace with Non-Breaking Space (U+00A0) + the captured punctuation
      // The regex does NOT match if it's already a non-breaking space, preventing infinite loops.
      const newText = text.replace(/ ([!?:;])/g, '\u00A0$1');
      
      if (newText !== text) {
        node.nodeValue = newText;
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Process children recursively
      node.childNodes.forEach(processNode);
    }
  }

  // Initial processing of the entire tree
  if (root) {
    processNode(root);
  }

  // Observe for dynamic content changes (React updates, navigations, etc.)
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        // Process any new nodes added to the DOM
        mutation.addedNodes.forEach(processNode);
      } else if (mutation.type === 'characterData') {
        // Process text content updates
        // We pass mutation.target which is the text node itself
        processNode(mutation.target);
      }
    });
  });

  if (root) {
    observer.observe(root, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }

  // Return cleanup function
  return () => observer.disconnect();
}