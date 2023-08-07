import React from 'react'
import { styled } from 'styled-components';

export default function Header() {
  return (
    <HeaderWrapper>
        <p>List View</p>
    </HeaderWrapper>
  )
}

const HeaderWrapper = styled.div`
max-width: 550px;
text-align: left;
font-size: 20px;
width: 100%;
font-weight: bold;

`;
