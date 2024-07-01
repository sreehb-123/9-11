import React from 'react';
import Login from './Login';  // Import the Login component
import Home from './pages/Homepage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

function App() {
    return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
