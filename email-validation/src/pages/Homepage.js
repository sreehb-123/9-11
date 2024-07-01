import './Homepage.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Deptbox from './components/Deptbox';
import BookDisplay from './components/BookDisplay';

function Home() {
  return (
      <div className='App'>
        <Navbar />
        <div>
          <Deptbox />
    {/*<BookDisplay />*/}
        </div>
      </div>
  );
}

export default Home;
