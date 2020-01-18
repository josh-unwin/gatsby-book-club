import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Button, Input} from '../common';

const CommentForm = styled.div`
  display: flex;
  margin-top: 32px;

  ${Input} {
    margin-right: 8px;
    margin-top: auto;
    margin-bottom: auto;
  }

  ${Button} {
    margin: auto 0;
  }
`

const CommentListItem = styled.div`
  > strong {
    font-size: 80%;
    color: #666;
  };

  border-bottom: 1px solid #ddd;
  padding: 4px 0;
`

export const BookComments = ({firebase, bookId}) => {
  const [comments, setComments] = useState([]);

  useEffect(()=> {
    const unsubscribe = firebase.subscribeToBookComments({bookId, callbackFromBookComments: (snapshot) => {
      console.log(snapshot);
      const snapshotComments = [];

      snapshot.forEach(doc => {
        snapshotComments.push({
          id: doc.id,
          ...doc.data()
        })
      });
      setComments(snapshotComments);
    }});
    
    return () => {
      if(unsubscribe) {
        unsubscribe();
      }
    } 
  }, [])

  return (
    <div>
      <CommentForm><Input></Input><Button>Share Comment</Button></CommentForm>
      {comments.map(comment => {
        return (
          <CommentListItem key={comment.id}>
              <strong>{comment.username}</strong>
              <div>{comment.text}</div>
            </CommentListItem>
        )
      })}
    </div>
  )
}