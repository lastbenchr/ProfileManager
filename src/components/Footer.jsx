import React from 'react'
import { styled } from 'styled-components';

export default function Footer() {
  return (
    <Copyright>
    <p>© 2023 Copyright Sooraj Yadav | lastbenchr. </p>
  </Copyright>
  )
}



const Copyright = styled.div`
    margin-top: 8rem;
   p {
    text-align: center;
    font-size: 12px;
  }
`;
