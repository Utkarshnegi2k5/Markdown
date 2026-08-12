import { SearchModal } from '@fern-api/search-widget';
import '@fern-api/search-widget/styles';

function App() {
  return (
    <SearchModal
      domain="https://markdown-968565.docs.buildwithfern.com/"
      lang="en"
    >
      Search Docs
    </SearchModal>
  );
}

export default App;
