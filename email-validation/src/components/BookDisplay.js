import React from 'react';
import './main.css';
import booksData from './popular.json';
import 'boxicons/css/boxicons.min.css';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function BookDisplay() {

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500
  };

  return (
    <div className='display'>
      <div className='lines'>
        <h3>Embark on a<br/>Journey of Knowledge</h3>
        <p>Explore our vast collection of books spanning every discipline.</p>
      </div>
      <div className='book-scroll'>
        <p>Popular picks</p>
          <Slider {...settings}>
          {booksData.map((book, index) => (
            <div key={index} className='book-card'>
              <div className='popular-book-img'></div>
              <h4>{book.title}</h4>
              <p>{book.genre}</p>
            </div>
          ))}
          </Slider>
      </div>
    </div>
  )
}

export default BookDisplay;

//before this npm install react-slick slick-carousel
