import './Homepage.css';
import Navbar from '../components/Navbar';
import Deptbox from '../components/Deptbox';
import BookDisplay from '../components/BookDisplay';

function Home() {
  return (
      <div className='App'>
        <Navbar />
        <div className='Homepage'>
          <Deptbox />
          <BookDisplay />
        </div>
      </div>
  );
}

export default Home;
