import React from "react";
import { BsChevronDown } from "react-icons/bs"; // Replace 'fa' with the appropriate icon package you want to use
import styled from "styled-components";

const FlexContainerInput = styled.div`
  display: flex;
  //   flex-direction: column;
  align-items: center;
  gap: ${(props) => props.gap || "1rem"};
  justify-content: ${(props) => props.jfycont || "space-between"};

  @media (min-width: 1020px) {
    flex-direction: ${(props) => props.flxdrn || "row"};
  }

  > div {
    flex: ${(props) => props.flex || "1"};
  }
`;
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #cbcbcc;
  border-radius: 20px;
  padding: 8px 5px;
  margin: 5px;
  & > * {
    width: 15px;
  }
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  margin-left: 5px;
`;

const GenderDropdown = styled.select`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  margin-left: 5px;
`;

const CountryInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  margin-left: 5px;
`;

const DescriptionTextarea = styled.textarea`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  resize: none; /* Disable textarea resizing */
  margin-left: 5px;
`;

const Label = styled.label`
  color: grey;
  p {
    text-align: left;
    padding: 0px;
    margin: 0px;
    padding-left: 12px;
    font-size: 14px;
  }
`;

const handleKeyDown = (e) => {
  // Allow only numeric digits (0-9) and some special keys like Backspace, Arrow keys, etc.
  const allowedKeys = [
    "Backspace",
    "Delete",
    "ArrowLeft",
    "ArrowRight",
    "Tab",
    "Home",
    "End",
  ];

  if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key)) {
    e.preventDefault();
  }
};

const AgeInput = () => {
  return (
    <div>
      <Label>
        <p>Age</p>
      </Label>
      <InputWrapper>
        <StyledInput
          type="text"
          placeholder="Age"
          maxLength={2}
          onKeyDown={handleKeyDown}
        />
      </InputWrapper>
    </div>
  );
};

const GenderSelect = () => {
  return (
    <div>
      <Label>
        <p>Gender</p>
      </Label>
      <InputWrapper>
        <GenderDropdown>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </GenderDropdown>
      </InputWrapper>
    </div>
  );
};

const CountryInputField = () => {
  const handleKeyPress = (e) => {
    // Prevent entering numeric digits (0-9)
    if (/\d/.test(e.key)) {
      e.preventDefault();
    }
  };
  return (
    <div>
      <Label>
        <p>Country</p>
      </Label>
      <InputWrapper>
        <CountryInput
          type="text"
          placeholder="Country"
          maxLength={30}
          onKeyDown={handleKeyPress}
        />
      </InputWrapper>
    </div>
  );
};

const DescriptionInput = () => {
  return (
    <div style={{ marginTop: "8px" }}>
      <Label>
        <p>Description</p>
      </Label>

      <InputWrapper>
        <DescriptionTextarea rows="4" placeholder="Enter description" />
      </InputWrapper>
    </div>
  );
};

const InputFields = () => {
  return (
    <>
      <FlexContainerInput style={{ marginTop: "17px" }}>
        <AgeInput />
        <GenderSelect />
        <CountryInputField />
      </FlexContainerInput>
      <DescriptionInput />
    </>
  );
};

export default InputFields;
