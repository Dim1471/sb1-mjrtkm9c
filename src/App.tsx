import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import Shipping from './pages/Shipping';
import Contacts from './pages/Contacts';
import ProductDetails from './pages/ProductDetails';

function App() {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-cream-50">
        <Header 
          onPriceRangeChange={setPriceRange}
          onSearchChange={setSearchQuery}
        />
        <main className="flex-1">
          <Routes>
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/" element={
              <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                  Ексклюзивна колекція жіночих сумок
                </h1>
                <ProductGrid 
                  priceRange={priceRange}
                  searchQuery={searchQuery}
                />
              </div>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;