import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BookDetails(){
    const { id } = useParams();
    const [book,setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://localhost:5000/book/${id}`);
                const data = await response.json();
                setBook(data);
            } catch(error){
                console.error('Error fetching details:',error);
            }
        };

        fetchBook();
    }, [id]);

    if (!book) return <p>Loading...</p>;

    return(
        <div className="book-details">
            <h2>{book.title}</h2>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Department:</strong>{book.department}</p>
            <p><strong>Genre:</strong>{book.genre}</p>
            <p><strong>Description:</strong>{book.description}</p>
            <p><strong>Number of units left:</strong>{book.count}</p>
        </div>
    );
}

export default BookDetails;