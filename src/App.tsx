import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import Loader from './components/atoms/Loader';

const Home = lazy(() => import('./components/pages/Home'));
const Login = lazy(() => import('./components/pages/Login'));
const Cart = lazy(() => import('./components/pages/Cart'));
const PublishProduct = lazy(() => import('./components/pages/PublishProduct'));
const Empty = lazy(() => import('./components/pages/Empty'));
const ProductDetails = lazy(() => import('./components/pages/ProductDetails'));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/publish" element={<PublishProduct />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="*" element={<Empty />} />
      </Routes>
    </Suspense>
  );
}

export default App;
