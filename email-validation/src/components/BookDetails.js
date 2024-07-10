import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import './main.css';
import bookcover from "./bookcover.jpg";
import { useNavigate } from 'react-router-dom';

function BookDetails() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isIssued, setIsIssued] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const navigate = useNavigate();

    const navigateHome = () => {
        navigate('/home');
    };

    const handleDeptClick = () => {
        navigate(`/department/${book.department}`)
      };

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://localhost:5000/book/${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched book details:', data);
                setBook(data);
                const issuedResponse = await fetch(`http://localhost:5000/issued-books`);
                const issuedBooks = await issuedResponse.json();
                setIsIssued(issuedBooks.some(issuedBook => issuedBook.bookId === data._id));
            } catch (error) {
                console.error('Error fetching details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://localhost:5000/book/${id}`);
                const data = await response.json();
                setBook(data);
                const savedResponse = await fetch(`http://localhost:5000/saved-books`);
                if (!savedResponse.ok) {
                    const errorData = await savedResponse.json();
                    console.error('Error fetching saved books:', errorData.error);
                    return;
                }
                const savedBooks = await savedResponse.json();
                const isBookSaved = savedBooks.some(savedBook => savedBook.bookId === data._id);
    
                setIsSaved(isBookSaved);
                console.log('Book fetched:', data);
            } catch (error) {
                console.error('Error fetching book:', error);
            }
        };

        fetchBook();
    }, [id]);

    const handleIssue = async () => {
        try {
            const response = await fetch(`http://localhost:5000/issue-book/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.ok) {
                setBook(data.book);
                setIsIssued(true);
                alert('Book issued successfully');
            } else {
                alert(data.error || 'Failed to issue book');
            }
        } catch (error) {
            console.error('Error issuing book:', error);
            alert('Failed to issue book');
        }
    };

    const handleReturn = async () => {
        try {
            const response = await fetch(`http://localhost:5000/return-book/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            
            if (response.ok) {
                setBook(data.book);
                setIsIssued(false);
                alert('Book returned successfully');
            } else {
                alert(data.error || 'Failed to return book');
            }
        } catch (error) {
            console.error('Error returning book:', error);
            alert('Failed to return book');
        }
    };

    const handleSave = async (id) => {
        try {
          const response = await fetch(`http://localhost:5000/save-book/${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          if (!response.ok) {
            const errorData = await response.json(); // Read error response here
            console.error('Error saving book:', errorData.error);
            return; // Exit function on error
          }
      
          const data = await response.json(); // Read success response here
          console.log('Response:', data);
      
          setBook(data.book);
          setIsSaved(true);
        } catch (error) {
          console.error('Error saving book:', error);
        }
      };
      

      const handleUnsave = async () => {
        try {
            const response = await fetch(`http://localhost:5000/unsave-book/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json(); // Parse the response body as JSON
            console.log(data); 
            if (response.ok) {
                setBook(null);
                setIsSaved(false);
                alert('Book unsaved successfully');
            } else {
                alert(data.error || 'Failed to unsave book');
            }
        } catch (error) {
            console.error('Error un-saving book:', error);
        }
    };
    
      
    
    if (loading) {
        return <p>Loading...</p>;
    }

    if (!book) {
        return <p>No book details found.</p>;
    }
    return (
        <>
            <div className="NAVBAR">
                <Navbar />
            </div>
            <div className="navigation">
                <button onClick={navigateHome} className="nav-btn">
                    <span>Home </span>
                    <span>&gt;&gt;</span>
                </button>
                <button  className="nav-btn" onClick={handleDeptClick}>
                    <span> {book.department}</span>
                    <span>&gt;&gt;</span>
                </button>
                <button  className="nav-btn">
                    <span>book details</span>
                </button>
            </div>
            <div className="book-details">
                <h1>{book.title}</h1>
                <div className="info">
                    <div className='book-img'><img src={bookcover} className='bookImg'></img></div>
                    <div>
                        <p><strong>Author:</strong> {book.author}</p>
                        <p><strong>Department:</strong> {book.department}</p>
                        <p><strong>Genre:</strong> {book.genre}</p>
                        <p><strong>Description:</strong> {book.description}</p>
                        <p><strong>Number of units left:</strong> {book.count}</p>
                        {isIssued ? (
                        <p><button onClick={handleReturn} className="book-btn">RETURN</button></p>
                    ) : (
                        <p><button onClick={handleIssue} className="book-btn">ISSUE</button></p>
                    )}
                    {isSaved ? (
                        <p><button onClick={handleUnsave} className="book-btn">Unsave</button></p>
                    ) : (
                        <p><button onClick={handleSave} className="book-btn">Save</button></p>
                    )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookDetails;
