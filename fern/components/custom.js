(function () {
  function styleCallouts() {
    const blockquotes = document.querySelectorAll(
      ".fern-prose blockquote"
    );

    blockquotes.forEach((blockquote) => {
      if (blockquote.dataset.calloutProcessed === "true") {
        return;
      }

      const text = blockquote.innerText.trim();

      // NOTE
      if (/^\[!note\]/i.test(text)) {
        blockquote.classList.add("custom-note");
        blockquote.dataset.calloutProcessed = "true";

        blockquote.innerHTML = blockquote.innerHTML.replace(
          /^\s*\[!note\]\s*/i,
          ""
        );

        return;
      }

      // WARNING
      if (/^\[!warning\]/i.test(text)) {
        blockquote.classList.add("custom-warning");
        blockquote.dataset.calloutProcessed = "true";

        blockquote.innerHTML = blockquote.innerHTML.replace(
          /^\s*\[!warning\]\s*/i,
          ""
        );

        return;
      }
    });
  }

  function start() {
    styleCallouts();

    const observer = new MutationObserver(() => {
      styleCallouts();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();