import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';
import FoodSearcherAndList from './components/Food/FoodSearcherAndList';
import RegisterClient from './pages/RegisterClient';
import RegisterCarrier from './pages/RegisterCarrier';
import RegisterBusiness from './pages/RegisterBusiness';
import RegisterFood from './pages/RegisterFood';
import ListBusiness from './pages/ListBusiness';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<FoodSearcherAndList />} />
            <Route path="/list-business" element={<ListBusiness />} />
            <Route path="/register-client" element={<RegisterClient />} />
            <Route path="/register-carrier" element={<RegisterCarrier />} />
            <Route path="/register-business" element={<RegisterBusiness />} />
            <Route path="/register-food" element={<RegisterFood />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
