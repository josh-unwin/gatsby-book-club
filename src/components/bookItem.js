import React from 'react';
import styled from "styled-components";
import Img from 'gatsby-image';

const BookItemWrapper = styled.section`
  display: flex;
  background-color: white;
  border: qpx solid #ddd;
  padding: 12px;
  margin-bottom: 20px;
  box-shadow: 4px 4px 8px 0px rgba(0,0,0,0.1);
  border: 1px solid #ddd;

  > .img-wrapper {
    margin-right: 10px
  }
`;

const BookItem = ({bookTitle, bookAuthor, bookSummary, bookCover, children}) => {
  return (
    <BookItemWrapper>
      <div className="img-wrapper">
        <Img fixed={bookCover} />
      </div>
      <div>
        <div><h2>{bookTitle}<small> -{bookAuthor}</small></h2></div>
        <p>{bookSummary}</p>
        <div>{children}</div>
      </div>
    </BookItemWrapper>
  )
}

export default BookItem
