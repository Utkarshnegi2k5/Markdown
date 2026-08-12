const searchClient = algoliasearch(
  "PV6ET6Q7MW",
  "d2ac55797e41cc69b25486582a39c4a5"
);

const index = searchClient.initIndex("monocloud_docs");

async function searchMonocloud(query) {
  const { hits } = await index.search(query);

  console.log(hits);
}