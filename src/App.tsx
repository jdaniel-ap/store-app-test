import { Route, Routes } from 'react-router';

import Home from './components/pages/Home';
import Login from './components/pages/Login';

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
