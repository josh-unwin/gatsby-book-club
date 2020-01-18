import React, {useContext} from 'react';
import Layout from "../components/layout";
import BookItem from '../components/bookItem';
import {graphql} from 'gatsby';
import {BookComments} from '../components/common';
import { FirebaseContext } from '../components/Firebase';

const BookTemplate = ({ data }) => {
  const {firebase} = useContext(FirebaseContext);

  const book = data.book;
  return(
    <section>
      <BookItem
        bookTitle={book.title}
        bookSummary={book.summary}
        bookAuthor={book.author.name}
        bookCover={book.localImage.childImageSharp.fixed }
      />
      {!!firebase &&
        <BookComments firebase={firebase} bookId={data.book.id} />
      }
    </section>
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
