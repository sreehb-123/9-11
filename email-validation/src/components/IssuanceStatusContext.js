import React, { createContext, useContext, useState } from 'react';

const IssuanceStatusContext = createContext();

export const useIssuanceStatus = () => useContext(IssuanceStatusContext);

export const IssuanceStatusProvider = ({ children }) => {
    const [issuedBooks, setIssuedBooks] = useState([]);

    const addIssuedBook = (bookId) => {
        setIssuedBooks(prevIssuedBooks => [...prevIssuedBooks, bookId]);
    };

    const removeIssuedBook = (bookId) => {
        setIssuedBooks(prevIssuedBooks => prevIssuedBooks.filter(id => id !== bookId));
    };

    const isBookIssued = (bookId) => {
        return issuedBooks.includes(bookId);
    };

    return (
        <IssuanceStatusContext.Provider value={{ addIssuedBook, removeIssuedBook, isBookIssued }}>
            {children}
        </IssuanceStatusContext.Provider>
    );
};