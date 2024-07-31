import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Decks from './decks/Decks';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Decks />} exact />
      </Routes>
    </Router>
  );
}

export default App;
