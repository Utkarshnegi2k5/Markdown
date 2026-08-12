(function () {
  "use strict";

  // ============================================
  // MonoCloud - Algolia Search Integration
  // ============================================

  const ALGOLIA_APP_ID = "PV6ET6Q7MW";
  const ALGOLIA_INDEX_NAME = "monocloud_docs";

  // Replace this with your Algolia Search API Key
  const ALGOLIA_SEARCH_API_KEY = "d2ac55797e41cc69b25486582a39c4a5";


  // ============================================
  // Load Algolia DocSearch CSS
  // ============================================

  function loadCSS() {
    if (document.querySelector("#algolia-docsearch-css")) {
      return;
    }

    const link = document.createElement("link");

    link.id = "algolia-docsearch-css";
    link.rel = "stylesheet";
    link.href =
      "https://cdn.jsdelivr.net/npm/@docsearch/css@3/dist/style.css";

    document.head.appendChild(link);
  }


  // ============================================
  // Load Algolia DocSearch JavaScript
  // ============================================

  function loadDocSearchScript(callback) {
    if (window.docsearch) {
      callback();
      return;
    }

    const script = document.createElement("script");

    script.src =
      "https://cdn.jsdelivr.net/npm/@docsearch/js@3/dist/umd/index.js";

    script.onload = callback;

    script.onerror = function () {
      console.error("Failed to load Algolia DocSearch.");
    };

    document.head.appendChild(script);
  }


  // ============================================
  // Create Search Container
  // ============================================

  function createSearchContainer() {
    let container = document.querySelector("#monocloud-docsearch");

    if (container) {
      return container;
    }

    container = document.createElement("div");

    container.id = "monocloud-docsearch";

    document.body.appendChild(container);

    return container;
  }


  // ============================================
  // Initialize Algolia
  // ============================================

  function initializeAlgolia() {

    const fernSearchButton =
      document.querySelector("#fern-search-button");

    if (!fernSearchButton) {

      console.log(
        "Fern search button not found. Retrying..."
      );

      setTimeout(initializeAlgolia, 500);

      return;
    }


    console.log(
      "Fern search button found."
    );


    loadCSS();


    loadDocSearchScript(function () {

      console.log(
        "Algolia DocSearch loaded."
      );


      const container =
        createSearchContainer();


      // Initialize DocSearch
      window.docsearch({

        container: "#monocloud-docsearch",

        appId: ALGOLIA_APP_ID,

        indexName: ALGOLIA_INDEX_NAME,

        apiKey: ALGOLIA_SEARCH_API_KEY

      });


      console.log(
        "Algolia DocSearch initialized."
      );


      // ============================================
      // Use Fern's Search Button
      // ============================================

      fernSearchButton.addEventListener(
        "click",
        function () {

          const input =
            container.querySelector(
              "input"
            );

          if (input) {

            input.focus();

          }

        }
      );

    });
  }


  // ============================================
  // Start
  // ============================================

  if (
    document.readyState === "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initializeAlgolia
    );

  } else {

    initializeAlgolia();

  }

})();