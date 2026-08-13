(function () {
  function loadScript(src, callback) {
    const script = document.createElement("script");
    script.src = src;
    script.onload = callback;
    script.onerror = function () {
      console.error("Failed to load:", src);
    };
    document.head.appendChild(script);
  }

  function loadStylesheet(href) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }

  function initializeDocSearch() {
    if (typeof docsearch !== "function") {
      console.error("Algolia DocSearch failed to load.");
      return;
    }

    // Don't create another search if one already exists
    if (document.querySelector("#custom-docsearch")) {
      return;
    }

    const container = document.createElement("div");
    container.id = "custom-docsearch";

    // Add the DocSearch container to Fern's header
    const header = document.querySelector("header");

    if (header) {
      header.appendChild(container);
    } else {
      document.body.prepend(container);
    }

    docsearch({
      container: "#custom-docsearch",
      appId: "PV6ET6Q7MW",
      apiKey: "d2ac55797e41cc69b25486582a39c4a5",
      indexName: "monocloud_docs"
    });
  }

  function start() {
    // Algolia's official DocSearch v4 CSS
    loadStylesheet(
      "https://cdn.jsdelivr.net/npm/@docsearch/css@4"
    );

    // Algolia's official DocSearch v4 JavaScript
    loadScript(
      "https://cdn.jsdelivr.net/npm/@docsearch/js@4",
      initializeDocSearch
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();