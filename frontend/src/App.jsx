import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Decks from './decks/Decks';
import OutletPage from './OutletPage';

import { DownloadDecksView, CreateDecksView } from './views';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OutletPage />} exact>
          <Route path="/" element={<Decks />} exact />
          <Route path="download-decks" element={<DownloadDecksView />} exact />
          <Route path="create-decks" element={<CreateDecksView />} exact />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
