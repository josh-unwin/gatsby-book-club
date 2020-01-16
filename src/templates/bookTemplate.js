import React from 'react';
import Layout from "../components/layout";
import BookItem from '../components/bookItem';
import {graphql} from 'gatsby';

const BookTemplate = ({ data }) => {
  const book = data.book;
  return(
    <Layout>
      <BookItem
        bookTitle={book.title}
        bookSummary={book.summary}
        bookAuthor={book.author.name}
        bookCover={book.localImage.childImageSharp.fixed }
      />
    </Layout>
  )
}

export const query = graphql`
  query bookQuery($bookId: String!) {
    book(id: {eq: $bookId}) {
      title
      summary
      localImage {
        childImageSharp {
          fixed(width: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      id
      author {
        name
      }
    }
  }
`

export default BookTemplate;
