import React from 'react';
import styled from "styled-components";
import Img from 'gatsby-image';

const BookItemWrapper = styled.section`
  display: flex;
  background-color: white;
  border: qpx solid #ddd;
  padding: 12px;
  margin-bottom: 20px;
  box-shadow: 3px 3px 4px 0px rgba(0,0,0,0.19);
`;

const BookItem = ({bookTitle, bookAuthor, bookSummary, bookCover, children}) => {
  return (
    <BookItemWrapper>
      <div>
        <Img fixed={bookCover} />
       </div>
      <div>
        <h2>{bookTitle} <small>{bookAuthor}</small></h2>
        <p>{bookSummary}</p>
        <div>{children}</div>
      </div>
    </BookItemWrapper>
  )
}

export default BookItem
