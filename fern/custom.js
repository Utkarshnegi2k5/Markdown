(function () {
  const APP_ID = "PV6ET6Q7MW";
  const SEARCH_ONLY_API_KEY = "d2ac55797e41cc69b25486582a39c4a5";
  const INDEX_NAME = "monocloud_docs";

  const searchClient = algoliasearch(
    APP_ID,
    SEARCH_ONLY_API_KEY
  );

  const index = searchClient.initIndex(INDEX_NAME);

  function createSearchUI() {
    const container = document.createElement("div");

    container.id = "monocloud-search";

    container.innerHTML = `
      <div style="
        max-width: 700px;
        margin: 40px auto;
        padding: 0 20px;
      ">
        <input
          id="monocloud-search-input"
          type="search"
          placeholder="Search products..."
          style="
            width: 100%;
            padding: 14px 16px;
            font-size: 16px;
            border: 1px solid #ddd;
            border-radius: 8px;
            outline: none;
          "
        />

        <div
          id="monocloud-search-results"
          style="margin-top: 20px;"
        ></div>
      </div>
    `;

    document.body.prepend(container);

    const input = document.getElementById(
      "monocloud-search-input"
    );

    input.addEventListener("input", async function () {
      const query = input.value.trim();

      if (!query) {
        document.getElementById(
          "monocloud-search-results"
        ).innerHTML = "";

        return;
      }

      const { hits } = await index.search(query);

      renderResults(hits);
    });
  }

  function renderResults(hits) {
    const results = document.getElementById(
      "monocloud-search-results"
    );

    if (!hits.length) {
      results.innerHTML = `
        <p>No results found.</p>
      `;

      return;
    }

    results.innerHTML = hits
      .map(function (hit) {
        return `
          <a
            href="${escapeHtml(hit.url || "#")}"
            target="_blank"
            rel="noopener noreferrer"
            style="
              display: block;
              padding: 16px;
              margin-bottom: 10px;
              border: 1px solid #eee;
              border-radius: 8px;
              text-decoration: none;
              color: inherit;
            "
          >
            <strong>${escapeHtml(hit.name || "")}</strong>

            <div style="
              margin-top: 6px;
              color: #666;
              font-size: 14px;
            ">
              ${escapeHtml(hit.description || "")}
            </div>

            <div style="
              margin-top: 8px;
              font-size: 14px;
            ">
              ${escapeHtml(hit.brand || "")}
              · $${hit.price ?? ""}
            </div>
          </a>
        `;
      })
      .join("");
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  createSearchUI();
})();
