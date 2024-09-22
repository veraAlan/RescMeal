import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientList from './components/ClientList';
import CreateClient from './components/CreateClient';
import UpdateClient from './components/UpdateClient';
import DeleteClient from './components/DeleteClient';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ClientList />} />
          <Route path="/create" element={<CreateClient />} />
          <Route path="/update/:id" element={<UpdateClient />} />
          <Route path="/delete/:id" element={<DeleteClient />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
