import React, { useEffect,useState } from "react";
import { Link,useParams } from "react-router-dom";
import './main.css';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function DeptBooks(){
    const { dept } = useParams();
    const [books,setBooks] = useState([]);
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();

    const navigateHome = () => {
        navigate('/home');
    };

    useEffect(() => {
        const fetchBooks = async() => {
            try{
                const response = await fetch(`http://localhost:5000/department/${dept}`);
                const data = await response.json();
                setBooks(data);
            }   catch(error){
                console.error('Error fetching books:',error);
            }   finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [dept]);

    if (loading) return <p>Loading...</p>;

    return(
        <>
        <div className="navigation">
            <button onClick={navigateHome} className="nav-btn">
                <span>Home </span>
                <span>&gt;&gt;</span>
            </button>
            <button  className="nav-btn">
                <span> {dept}</span>
            </button>

        </div>
        <div className="NAVBAR">
            <Navbar />
        </div>
        <div className="department-books">
            <h2>Home {dept} Department</h2>
            <ul className="bookList">
                {books.map(book => (
                    <li key={book._id}>
                        <h2>
                            <Link to={`/book/${book._id}`}>{book.title}</Link>
                        </h2>
                        <p><strong>Author:</strong> {book.author}</p>
                        <p><strong>Genre:</strong> {book.genre}</p>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
}

export default DeptBooks;
