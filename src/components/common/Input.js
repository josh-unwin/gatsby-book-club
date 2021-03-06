import styled from 'styled-components';

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 8px;
  font-size: 14px;
  margin-bottom: 12px;
  border-radius: 4px;
  box-shadow: none;
  border: 1px solid #ddd;

  &:focus, &:active{
    border: 1px solid rebeccapurple;
  }
`
