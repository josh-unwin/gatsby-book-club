import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Button, Input} from '../common';
import moment from 'moment';

const CommentForm = styled.form`
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
  const [commentText, setCommentText] = useState([]);
  
  function handlePostCommentSubmit(e) {
    e.preventDefault();
    firebase.postComment({text: commentText, bookId})
  };

  useEffect(()=> {
    const unsubscribe = firebase.subscribeToBookComments({bookId, callbackFromBookComments: (snapshot) => {
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
      <CommentForm onSubmit={handlePostCommentSubmit}>
        <Input value={commentText} onChange={e => {
          e.persist();
          setCommentText(e.target.value);
        }}></Input>
        <Button type='submit'>Share Comment</Button>
      </CommentForm>
      {comments.map(comment => {
        return (
          <CommentListItem key={comment.id}>
              <strong>{comment.username} - {moment(comment.dateCreated.toDate()).format('HH:mm Do MMM YYYY')}</strong>
              <div>{comment.text}</div>
            </CommentListItem>
        )
      })}
    </div>
  )
}