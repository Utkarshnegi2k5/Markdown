// Load DocSearch CSS from CDN
const docSearchCss = document.createElement('link');
docSearchCss.rel = 'stylesheet';
docSearchCss.href = 'https://cdn.jsdelivr.net/npm/@docsearch/css@3/dist/docsearch.min.css';
document.head.appendChild(docSearchCss);

// Load DocSearch JS from CDN
const docSearchScript = document.createElement('script');
docSearchScript.src = 'https://cdn.jsdelivr.net/npm/@docsearch/js@3/dist/umd/index.js';
docSearchScript.onload = function() {
  let attempts = 0;
  
  const tryInitialize = () => {
    attempts++;
    
    // Try to find Fern's search input
    const searchInput = document.querySelector('input[placeholder*="Search"]') ||
                       document.querySelector('input[type="search"]');
    
    if (searchInput && window.docsearch) {
      console.log('✅ Initializing DocSearch...');
      
      // Create a container if it doesn't exist
      let container = document.getElementById('docsearch-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'docsearch-container';
        searchInput.parentNode.insertBefore(container, searchInput.nextSibling);
      }
      
      try {
        window.docsearch({
          container: '#docsearch-container',
          appId: 'PV6ET6Q7MW',
          indexName: 'monocloud_docs',
          apiKey: 'd2ac55797e41cc69b25486582a39c4a5'
        });
        console.log('✅ DocSearch initialized successfully!');
      } catch (error) {
        console.error('DocSearch error:', error);
      }
    } else if (attempts < 20) {
      setTimeout(tryInitialize, 500);
    } else {
      console.warn('❌ Could not find search input after 10 seconds');
    }
  };
  
  tryInitialize();
};
document.head.appendChild(docSearchScript);