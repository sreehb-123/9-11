import React, { useEffect,useState } from "react";
import { Link,useParams } from "react-router-dom";

function DeptBooks(){
    const { dept } = useParams();
    const [books,setBooks] = useState([]);
    const [loading,setLoading] = useState(true);

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
        <div className="department-books">
            <h2>Books in {dept} Department</h2>
            <ul>
                {books.map(book => (
                    <li key={book._id}>
                        <h2>
                            <Link to={`/book/${book._id}`}>{book.title}</Link>
                        </h2>
                        <p><strong>Author:</strong> {book.author}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DeptBooks;