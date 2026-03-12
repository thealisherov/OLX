import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoryProducts from './pages/CategoryProducts';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import { useThemeStore } from './store/themeStore';
import './App.css';

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="category/:slug" element={<CategoryProducts />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

export default App;
