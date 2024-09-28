// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ClientList from './components/ClientList';
// import CreateClient from './components/CreateClient';
// import UpdateClient from './components/UpdateClient';
// import DeleteClient from './components/DeleteClient';

// const App = () => {
//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route path="/" element={<ClientList />} />
//           <Route path="/create" element={<CreateClient />} />
//           <Route path="/update/:id" element={<UpdateClient />} />
//           <Route path="/delete/:id" element={<DeleteClient />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

//export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';
import RegisterClient from './pages/RegisterClient';
import RegisterCarrier from './pages/RegisterCarrier';
import RegisterBusiness from './pages/RegisterBusiness';
import ListBusiness from './pages/ListBusiness';
import CarrierList from './pages/ListCarriers';
import ListFood from './pages/ListFood';
import UpdateCarrier from './pages/UpdateCarrier';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<div>Inicio</div>} />
            <Route path="/register-client" element={<RegisterClient />} />
            <Route path="/register-carrier" element={<RegisterCarrier />} />
            <Route path="/register-business" element={<RegisterBusiness />} />
            <Route path="Update/:id" element={<UpdateCarrier/>}/>
          </Routes>
          <ListBusiness/>
          <CarrierList />
          
          {/* <ListFood /> */}
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
