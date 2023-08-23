import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import styled from "styled-components";

const CustomSelect = styled.div`
  position: relative;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  border: ${(props) => props.editable ? "1px solid #cbcbcc" : "none"};
  border-radius: 20px;
`;
    
const SelectedValue = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
  padding: 8px 14px;
//   border: 1px solid #ccc;
//   border-radius: 4px;
  font-size: 13px;
  text-align: left;
  
`;

const OptionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #ccc;
  padding: 12px 0px;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
`;

const Option = styled.div`
  padding: 5px 16px;
  cursor: pointer;
  font-size: 13px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Dropdown = ({editable, editedUser, handleInputChange}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(editedUser.gender);

  const options = ["Male", "Female"];

  const handleOptionClick = (option) => {
    setSelectedValue(option);
    handleInputChange("gender", option)
    setIsOpen(false);
  };

  return (
    <CustomSelect editable={editable}>
      <SelectedValue onClick={() => {
        if(editable){
            setIsOpen(!isOpen)
        }
      }}>
        {selectedValue || "Select Gender"}{editable ? <BsChevronDown/> :""}
      </SelectedValue> 
      <OptionsContainer isOpen={isOpen}>
        {options.map((option, index) => (
          <Option key={index} onClick={() => handleOptionClick(option)}>
            {option}
          </Option>
        ))}
      </OptionsContainer>
    </CustomSelect>
  );
};

export default Dropdown;
