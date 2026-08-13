import docsearch from "@docsearch/js/docsearch";
import "@docsearch/css";

function initDocSearch() {
  const container = document.createElement("div");
  container.id = "docsearch";

  // Put the DocSearch button in the Fern header
  const header = document.querySelector("header");

  if (header) {
    header.appendChild(container);
  } else {
    document.body.prepend(container);
  }

  docsearch({
    container: "#docsearch",
    appId: "PV6ET6Q7MW",
    apiKey: "d2ac55797e41cc69b25486582a39c4a5",
    indices: ["monocloud_docs"],
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDocSearch);
} else {
  initDocSearch();
}