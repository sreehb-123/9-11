import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Login from './Login';
import Home from './pages/Homepage';
import Search from './components/Search';
import BookDetails from './components/BookDetails';
import DeptBooks from './components/DeptBooks';
import SearchResults from './components/searchResults';
import IssuedBooks from './components/IssuedBooks';
import Notificaions from './pages/Notifications';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/department/:dept" element={<DeptBooks />} />
        <Route path="/issued-books" element={<IssuedBooks />} />
        <Route path="/notifications" element={<Notificaions />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;