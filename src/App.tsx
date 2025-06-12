import { Route, Routes } from 'react-router';

import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Cart from './components/pages/Cart';
import PublishProduct from './components/pages/PublishProduct';
import Empty from './components/pages/Empty';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/publish" element={<PublishProduct />} />
      <Route path="*" element={<Empty />} />
    </Routes>
  );
}

export default App;
