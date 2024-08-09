import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Decks from './decks/Decks';
import OutletPage from './OutletPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OutletPage />} exact>
          <Route path="/" element={<Decks />} exact />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
