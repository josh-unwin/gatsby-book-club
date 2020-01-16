import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import BookItem from '../components/bookItem'
import styled from 'styled-components';

const LinkButton = styled.div`
  text-align: right;

  a {
    padding: 8px;
    text-decoration: none;
    background-color: rebeccapurple;
    border-radius: 3px;
    color: white;

    &:hover {
      background-color: indigo
    }
  }
`

const IndexPage = (props) => {
  console.log(props);
  return (
    <section>
      {props.data.allBook.edges.map(edge =>(
      <BookItem
        key={edge.node.id}
        bookTitle={edge.node.title}
        bookSummary={edge.node.summary}
        bookAuthor={edge.node.author.name}
        bookCover={edge.node.localImage.childImageSharp.fixed} >
          <LinkButton>
            <Link to={`book/${edge.node.id}`}>Join conversation</Link>
          < /LinkButton>
      </BookItem>
      ))}
    </section>
  )
  }

export const query = graphql`
  {
    allBook {
      edges {
        node {
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
    }
  }
`

export default IndexPage
