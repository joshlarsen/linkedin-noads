const MAX_DEPTH = 10;

function walk(el, depth, fn) {
  if (depth > MAX_DEPTH) return;
  fn(el);
  for (const child of el.children) walk(child, depth + 1, fn);
}

function hasDescendant(el, predicate, depth = 0) {
  if (depth > MAX_DEPTH) return false;
  if (predicate(el)) return true;
  for (const child of el.children) {
    if (hasDescendant(child, predicate, depth + 1)) return true;
  }
  return false;
}

function isPromotedPost(el) {
  if (!hasDescendant(el, (n) => n.tagName === "H2")) return false;
  return hasDescendant(
    el,
    (n) => n.tagName === "P" && n.textContent.trim() === "Promoted",
  );
}

function hidePromotedPosts(root) {
  walk(root, 0, (el) => {
    if (isPromotedPost(el)) el.style.display = "none";
  });
}

hidePromotedPosts(document.body);

new MutationObserver((mutations) => {
  for (const { addedNodes } of mutations) {
    for (const node of addedNodes) {
      if (node.nodeType !== Node.ELEMENT_NODE) continue;
      if (isPromotedPost(node)) node.style.display = "none";
      hidePromotedPosts(node);
    }
  }
}).observe(document.body, { childList: true, subtree: true });
