import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import './main.css';
import bookcover from "./bookcover.jpg";
import { useNavigate } from 'react-router-dom';


const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isIssued, setIsIssued] = useState(false);
    const [rating, setRating] = useState(0); 
    const [review, setReview] = useState(''); 
    const [reviews, setReviews] = useState([]);
    const [hover, setHover] = useState(0);
    const navigate = useNavigate();

    const email = localStorage.getItem('userEmail');

    const navigateHome = () => {
        navigate('/home');
    };

    const handleDeptClick = () => {
        navigate(`/department/${book.department}`);
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
                const issuedResponse = await fetch(`http://localhost:5000/issued-books/${email}`);
                const issuedBooks = await issuedResponse.json();
                setIsIssued(issuedBooks.some(issuedBook => issuedBook.bookId === data._id));

                const reviewsResponse = await fetch(`http://localhost:5000/book-reviews/${id}`);
                const reviewsData = await reviewsResponse.json();
                setReviews(reviewsData.reviews);
            } catch (error) {
                console.error('Error fetching details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id, email]);

    const handleIssue = async () => {
        try {
            const response = await fetch(`http://localhost:5000/issue-book/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
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
                },
                body: JSON.stringify({ email })
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

    const handleRatingChange = (e) => {
        setRating(parseInt(e.target.value));
    };

    const handleReviewChange = (e) => {
        setReview(e.target.value);
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/add-rating/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, rating, review })
            });
            const data = await response.json();
            if (response.ok) {
                
                alert('Review submitted successfully');
                setRating(0);
                setReview('');
                
                const reviewsResponse = await fetch(`http://localhost:5000/book-reviews/${id}`);
                const reviewsData = await reviewsResponse.json();
                setReviews(reviewsData.reviews); 
            } else {
                alert(data.error || 'Failed to submit review');
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review');
        }
    };

    const handleResetReview = () => {
        setRating(0);
        setReview('');
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
            <div className="book-page">
                <div className="navigation">
                    <button onClick={navigateHome} className="nav-btn">
                        <span>Home </span>
                        <span>&gt;&gt;</span>
                    </button>
                    <button className="nav-btn" onClick={handleDeptClick}>
                        <span> {book.department}</span>
                        <span>&gt;&gt;</span>
                    </button>
                    <button className="nav-btn">
                        <span>book details</span>
                    </button>
                </div>
                <div className="book-details">
                    <h1>{book.title}</h1>
                    <div className="info">
                        <div className='book-img'><img src={bookcover} className='bookImg' alt="Book Cover" /></div>
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
                        </div>
                    </div>
                </div>
                <div className="review-box">
                    <div className="output">
                        <h2>Reviews</h2>
                        {reviews && reviews.length === 0 ? <p>No reviews yet.</p> : (
                            <ul>
                                {reviews.map((review, index) => (
                                    <li key={index}>
                                        <p><strong>Rating:</strong> <span >{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span></p>
                                        <p><strong>Review:</strong> {review.review}</p>
                                        <hr />
                                    </li>
                                ))}
                            </ul>
                    )}
                    </div>
                    <div className="input-review">
                        <p>Write review</p>
                        <form onSubmit={handleSubmitReview}>
                            <div className="star-rating">
                            {[...Array(5)].map((star, index) => {
                                index += 1;
                                return (
                                    <button
                                    type="button"
                                    key={index}
                                    className={index <= (hover || rating) ? "on" : "off"}
                                    onClick={() => setRating(index)}
                                    onMouseEnter={() => setHover(index)}
                                    onMouseLeave={() => setHover(rating)}
                                    >
                                    <span className="star">&#9733;</span>
                                    </button>
                                );
                            })}
                            </div>
                            <br />
                            <p className="review">Your Review:</p>
                            <label>
                                <textarea
                                    onChange={handleReviewChange}
                                    placeholder="Write your review here..."
                                    />
                            </label>
                            <br />
                            <button type="submit">Submit Review</button>
                            <button type="button" onClick={handleResetReview}>Reset</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookDetails;
