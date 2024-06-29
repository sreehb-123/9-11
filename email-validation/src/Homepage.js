import './Homepage.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Deptbox from './components/Deptbox';
// App.js or your main component fil


function App() {
  return (
      <div className='App'>
        <Navbar />
        <div>
          <Deptbox />
          <BookDisplay />
        </div>
      </div>
  );
}

export default App;