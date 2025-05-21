import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import NotFound from './pages/NotFound';
import { RatingsProvider } from './context/RatingsContext';

function App() {
    return (
        <RatingsProvider>
            <Router>
                <Routes>
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </RatingsProvider>
    );
}

export default App;