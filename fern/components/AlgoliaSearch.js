(function () {
  const ALGOLIA_APP_ID = "PV6ET6Q7MW";
  const ALGOLIA_SEARCH_ONLY_KEY = "d2ac55797e41cc69b25486582a39c4a5";
  const ALGOLIA_INDEX_NAME = "monocloud_docs";

  function createSearch() {
    if (document.getElementById("custom-algolia-search")) {
      return;
    }

    const container = document.createElement("div");
    container.id = "custom-algolia-search";

    container.innerHTML = `
      <div style="position: relative; width: 300px;">
        <input
          id="algolia-search-input"
          type="search"
          placeholder="Search documentation..."
          autocomplete="off"
          style="
            width: 100%;
            padding: 10px 14px;
            border: 1px solid #444;
            border-radius: 8px;
            background: transparent;
            color: inherit;
            outline: none;
          "
        />

        <div
          id="algolia-search-results"
          style="
            display: none;
            position: absolute;
            top: 48px;
            left: 0;
            right: 0;
            max-height: 400px;
            overflow-y: auto;
            background: #111;
            border: 1px solid #444;
            border-radius: 8px;
            z-index: 99999;
          "
        ></div>
      </div>
    `;

    // Put the search box in the top-right area of the page.
    const navbar = document.querySelector("header");

    if (navbar) {
      navbar.appendChild(container);
    } else {
      document.body.prepend(container);
    }

    const input = document.getElementById("algolia-search-input");
    const results = document.getElementById("algolia-search-results");

    let timeout;

    input.addEventListener("input", function () {
      clearTimeout(timeout);

      const query = input.value.trim();

      if (!query) {
        results.style.display = "none";
        results.innerHTML = "";
        return;
      }

      timeout = setTimeout(() => {
        searchAlgolia(query);
      }, 300);
    });

    async function searchAlgolia(query) {
      try {
        const response = await fetch(
          `https://${ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/${encodeURIComponent(
            ALGOLIA_INDEX_NAME
          )}/query`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Algolia-Application-Id": ALGOLIA_APP_ID,
              "X-Algolia-API-Key": ALGOLIA_SEARCH_ONLY_KEY,
            },
            body: JSON.stringify({
              query: query,
              hitsPerPage: 8,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Algolia request failed: ${response.status}`);
        }

        const data = await response.json();

        results.innerHTML = "";

        if (!data.hits || data.hits.length === 0) {
          results.innerHTML = `
            <div style="padding: 15px;">
              No results found
            </div>
          `;

          results.style.display = "block";
          return;
        }

        data.hits.forEach((hit) => {
          const title =
            hit.title ||
            hit.name ||
            hit.heading ||
            hit.objectID ||
            "Documentation";

          const url =
            hit.url ||
            hit.path ||
            hit.href ||
            hit._url ||
            "#";

          const item = document.createElement("a");

          item.href = url;
          item.textContent = title;

          item.style.display = "block";
          item.style.padding = "12px 15px";
          item.style.color = "inherit";
          item.style.textDecoration = "none";
          item.style.borderBottom = "1px solid #333";

          item.addEventListener("mouseenter", () => {
            item.style.background = "rgba(255,255,255,0.08)";
          });

          item.addEventListener("mouseleave", () => {
            item.style.background = "transparent";
          });

          results.appendChild(item);
        });

        results.style.display = "block";
      } catch (error) {
        console.error("Algolia search error:", error);

        results.innerHTML = `
          <div style="padding: 15px;">
            Search failed. Check your Algolia configuration.
          </div>
        `;

        results.style.display = "block";
      }
    }
  }

  // Fern can load pages dynamically, so wait for the page to be ready.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", createSearch);
  } else {
    createSearch();
  }
})();