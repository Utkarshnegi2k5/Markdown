/**
 * Fern custom search using Algolia
 *
 * IMPORTANT:
 * Replace the values below with the credentials/index
 * provided by Fern.
 *
 * For production, prefer a backend proxy instead of
 * exposing sensitive credentials in browser JavaScript.
 */

(() => {
  "use strict";

  const ALGOLIA_APP_ID = "PV6ET6Q7MW";
  const ALGOLIA_SEARCH_KEY = "d2ac55797e41cc69b25486582a39c4a5";
  const ALGOLIA_INDEX = "monocloud_docs"
  // Wait until the Fern page has loaded.
  window.addEventListener("DOMContentLoaded", () => {
    console.log("Fern custom search loaded");

    /*
     * Your custom search implementation goes here.
     *
     * Example Algolia request:
     */
    async function searchAlgolia(query) {
      if (!query || !query.trim()) {
        return [];
      }

      const url =
        `https://${ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/` +
        `${encodeURIComponent(ALGOLIA_INDEX)}/query`;

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Algolia-Application-Id": ALGOLIA_APP_ID,
            "X-Algolia-API-Key": ALGOLIA_SEARCH_KEY
          },
          body: JSON.stringify({
            query: query,
            hitsPerPage: 10
          })
        });

        if (!response.ok) {
          throw new Error(
            `Algolia request failed: ${response.status}`
          );
        }

        const data = await response.json();

        return data.hits || [];
      } catch (error) {
        console.error("Algolia search error:", error);
        return [];
      }
    }

    // Expose the function temporarily so you can test it
    // from the browser console.
    window.fernCustomSearch = searchAlgolia;

    console.log(
      "Custom search ready. Try: fernCustomSearch('authentication')"
    );
  });
})();
