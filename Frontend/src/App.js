import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';
import RegisterClient from './pages/RegisterClient';
import RegisterCarrier from './pages/RegisterCarrier';
import RegisterBusiness from './pages/RegisterBusiness';
import FoodList from './components/Food/FoodList';
import Searcher from './components/Food/FoodSearcher';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Searcher />} />
            <Route path="/" element={<FoodList />} />
            <Route path="/register-client" element={<RegisterClient />} />
            <Route path="/register-carrier" element={<RegisterCarrier />} />
            <Route path="/register-business" element={<RegisterBusiness />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
