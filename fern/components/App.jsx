import { SearchModal } from '@fern-api/search-widget';
import '@fern-api/search-widget/styles';
import './style.css';

function App() {
  return (
        <SearchModal
            domain="https://markdown-968565.docs.buildwithfern.com/"
            lang="en"
            className="my-search-button"
        >
    Search Docs
    </SearchModal>
  );
}

export default App;
