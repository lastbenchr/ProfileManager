import React from 'react'
import { styled } from 'styled-components';
import { FaSearch } from 'react-icons/fa';

export default function Header({query, handleSearch}) {
  return (
    <>
      <HeaderWrapper>
        <p>List View</p>
      </HeaderWrapper>
     <SearchContainer>
        <SearchIcon />
        <SearchInput
          type="text"
          placeholder="Search user"
          value={query}
          onChange={handleSearch}
        />
      </SearchContainer>
    </>
    
  )
}

const HeaderWrapper = styled.div`
max-width: 550px;
text-align: left;
font-size: 20px;
width: 100%;
font-weight: 600;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 5px;
  background-color: #f9f9f9;
  max-width: 550px;
  width: 100%;
  box-sizing: border-box; 
`;
const SearchIcon = styled(FaSearch)`
  margin-left: 10px;
  color: #888;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  font-size: 16px;
`;