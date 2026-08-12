(function () {
  "use strict";

  // ============================================
  // ALGOLIA CONFIG
  // ============================================

  const APP_ID = "PV6ET6Q7MW";
  const SEARCH_ONLY_API_KEY = "d2ac55797e41cc69b25486582a39c4a5";
  const INDEX_NAME = "monocloud_docs";

  // ============================================
  // WAIT FOR ALGOLIA LIBRARY
  // ============================================

  function startSearch() {
    if (typeof algoliasearch === "undefined") {
      console.error(
        "Algolia library is not loaded. Make sure algoliasearch is loaded before custom.js."
      );
      return;
    }

    const searchClient = algoliasearch(
      APP_ID,
      SEARCH_ONLY_API_KEY
    );

    const index = searchClient.initIndex(INDEX_NAME);

    // ============================================
    // STYLES
    // ============================================

    const style = document.createElement("style");

    style.textContent = `
      #monocloud-search {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;

        position: fixed !important;
        top: 20px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;

        width: min(600px, calc(100vw - 40px)) !important;

        z-index: 2147483647 !important;

        font-family: -apple-system, BlinkMacSystemFont,
          "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
      }

      #monocloud-search * {
        box-sizing: border-box !important;
      }

      .monocloud-search-wrapper {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;

        background: #ffffff !important;

        padding: 12px !important;

        border: 1px solid #d1d5db !important;
        border-radius: 12px !important;

        box-shadow:
          0 10px 30px rgba(0, 0, 0, 0.15) !important;
      }

      #monocloud-search-input {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;

        width: 100% !important;
        height: 50px !important;

        padding: 0 16px !important;

        margin: 0 !important;

        background: #ffffff !important;
        color: #111827 !important;

        border: 2px solid #d1d5db !important;
        border-radius: 8px !important;

        outline: none !important;

        font-size: 16px !important;
        font-family: inherit !important;

        -webkit-appearance: none !important;
      }

      #monocloud-search-input:focus {
        border-color: #6366f1 !important;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15) !important;
      }

      #monocloud-search-input::placeholder {
        color: #6b7280 !important;
        opacity: 1 !important;
      }

      #monocloud-search-results {
        display: none;

        max-height: 500px !important;
        overflow-y: auto !important;

        margin-top: 8px !important;

        background: #ffffff !important;

        border: 1px solid #e5e7eb !important;
        border-radius: 8px !important;

        color: #111827 !important;
      }

      .monocloud-result {
        display: block !important;

        padding: 16px !important;

        border-bottom: 1px solid #e5e7eb !important;

        text-decoration: none !important;

        color: #111827 !important;

        background: #ffffff !important;

        transition: background 0.15s ease !important;
      }

      .monocloud-result:last-child {
        border-bottom: none !important;
      }

      .monocloud-result:hover {
        background: #f9fafb !important;
      }

      .monocloud-result-name {
        display: block !important;

        margin: 0 0 6px 0 !important;

        font-size: 16px !important;
        font-weight: 600 !important;

        color: #111827 !important;
      }

      .monocloud-result-description {
        display: block !important;

        margin: 0 0 8px 0 !important;

        font-size: 14px !important;
        line-height: 1.5 !important;

        color: #6b7280 !important;
      }

      .monocloud-result-meta {
        display: flex !important;

        gap: 8px !important;

        font-size: 13px !important;

        color: #6b7280 !important;
      }

      .monocloud-result-price {
        color: #111827 !important;
        font-weight: 600 !important;
      }

      .monocloud-result-link {
        display: inline-block !important;

        margin-top: 10px !important;

        font-size: 13px !important;
        font-weight: 500 !important;

        color: #4f46e5 !important;

        text-decoration: none !important;
      }

      .monocloud-result-link:hover {
        text-decoration: underline !important;
      }

      .monocloud-status {
        padding: 18px !important;

        font-size: 14px !important;

        color: #6b7280 !important;

        text-align: center !important;
      }

      @media (max-width: 700px) {
        #monocloud-search {
          top: 10px !important;
        }
      }
    `;

    document.head.appendChild(style);

    // ============================================
    // CREATE SEARCH UI
    // ============================================

    if (document.getElementById("monocloud-search")) {
      return;
    }

    const container = document.createElement("div");

    container.id = "monocloud-search";

    container.innerHTML = `
      <div class="monocloud-search-wrapper">

        <input
          id="monocloud-search-input"
          type="search"
          placeholder="Search products..."
          autocomplete="off"
          aria-label="Search products"
        />

        <div id="monocloud-search-results"></div>

      </div>
    `;

    document.body.appendChild(container);

    const input = document.getElementById(
      "monocloud-search-input"
    );

    const results = document.getElementById(
      "monocloud-search-results"
    );

    // ============================================
    // SEARCH
    // ============================================

    let searchTimeout;

    input.addEventListener("input", function () {
      const query = input.value.trim();

      clearTimeout(searchTimeout);

      if (!query) {
        results.innerHTML = "";
        results.style.display = "none";
        return;
      }

      results.style.display = "block";

      results.innerHTML = `
        <div class="monocloud-status">
          Searching...
        </div>
      `;

      searchTimeout = setTimeout(async function () {
        try {
          const response = await index.search(query);

          renderResults(response.hits);
        } catch (error) {
          console.error("Algolia search error:", error);

          results.innerHTML = `
            <div class="monocloud-status">
              Search failed. Check the browser console.
            </div>
          `;
        }
      }, 250);
    });

    // ============================================
    // ESCAPE HTML
    // ============================================

    function escapeHtml(value) {
      return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    // ============================================
    // RENDER RESULTS
    // ============================================

    function renderResults(hits) {
      if (!hits.length) {
        results.innerHTML = `
          <div class="monocloud-status">
            No results found.
          </div>
        `;

        return;
      }

      results.innerHTML = hits
        .map(function (hit) {
          const name = escapeHtml(hit.name);
          const description = escapeHtml(hit.description);
          const brand = escapeHtml(hit.brand);

          const price =
            hit.price !== undefined
              ? `${escapeHtml(hit.currency || "USD")} ${escapeHtml(hit.price)}`
              : "";

          const amazonUrl = escapeHtml(
            hit.amazonUrl || "#"
          );

          return `
            <div class="monocloud-result">

              <a
                href="${amazonUrl}"
                target="_blank"
                rel="noopener noreferrer"
                class="monocloud-result"
              >

                <span class="monocloud-result-name">
                  ${name}
                </span>

                <span class="monocloud-result-description">
                  ${description}
                </span>

                <span class="monocloud-result-meta">

                  ${
                    brand
                      ? `<span>${brand}</span>`
                      : ""
                  }

                  ${
                    price
                      ? `<span class="monocloud-result-price">
                          ${price}
                        </span>`
                      : ""
                  }

                </span>

                <span class="monocloud-result-link">
                  View on Amazon →
                </span>

              </a>

            </div>
          `;
        })
        .join("");
    }

    // ============================================
    // TEST
    // ============================================

    console.log(
      "Monocloud Algolia search initialized:",
      INDEX_NAME
    );
  }

  // ============================================
  // START WHEN PAGE IS READY
  // ============================================

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      startSearch
    );
  } else {
    startSearch();
  }
})();
