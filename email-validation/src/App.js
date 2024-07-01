// src/App.js
import React from 'react';
import Login from './Login';  // Import the Login component

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
