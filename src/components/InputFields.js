import React, { useCallback } from "react";
import { BsChevronDown } from "react-icons/bs"; // Replace 'fa' with the appropriate icon package you want to use
import styled from "styled-components";
import { useState, useEffect } from "react";
import { calculateAge, calculateDob } from "./utils/DRYmethods";
import Dropdown from "./Dropdown";

const InputFields = ({ editedUser, isEditable, handleInputChange }) => {
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
    const [age, setAge] = useState(calculateAge(editedUser.dob));

    return (
      <div>
        <Label>
          <p>Age</p>
        </Label>
        <InputWrapper editable={isEditable.edit}>
          <StyledInput
            type="text"
            placeholder="Age"
            value={age}
            maxLength={2}
            readOnly={!isEditable.edit} // isEditable.edit= false
            onChange={(e) => {
              if (isEditable.edit) {
                setAge(e.target.value);
              }
            }}
            onBlur={() => {
              // console.log("age back to dob", typeof calculateDob(age));
              handleInputChange("dob", calculateDob(age));
            }}
          />
        </InputWrapper>
      </div>
    );
  };

  const GenderSelect = () => {
    const [selectedGender, setSelectedGender] = useState(editedUser.gender);

    const handleSelectClick = (event) => {
      if (!isEditable.edit) {
        // Allow the default click behavior if editable
        return;
      }
      event.preventDefault(); // Prevent the default click behavior
    };
    return (
      <div>
        <Label>
          <p>Gender</p>
        </Label>
        {/* <InputWrapper editable={isEditable.edit}> */}
        <Dropdown
          editable={isEditable.edit}
          editedUser={editedUser}
          handleInputChange={handleInputChange}
        />
        {/* </InputWrapper> */}
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
  };

  const DescriptionInput = () => {
    const [description, setDescription] = useState(editedUser.description);
  };

  return (
    <>
      <FlexContainerInput style={{ marginTop: "17px" }}>
        <AgeInput />
        <GenderSelect />
        {/* <CountryInputField /> */}
        <div>
          <Label>
            <p>Country</p>
          </Label>
          <InputWrapper editable={isEditable.edit}>
            <CountryInput
              type="text"
              placeholder="Country"
              value={editedUser.country}
              maxLength={30}
              readOnly={!isEditable.edit} // isEditable.edit= false
              // onKeyDown={handleKeyPress}
              onChange={(e) => handleInputChange("country", e.target.value)}
            />
          </InputWrapper>
        </div>
      </FlexContainerInput>
      {/* <DescriptionInput /> */}
      <div style={{ marginTop: "20px" }}>
        <Label>
          <p>Description</p>
        </Label>

        <InputWrapper editable={isEditable.edit}>
          <DescriptionTextarea
            rows="5"
            placeholder="Enter description"
            value={editedUser.description}
            readOnly={!isEditable.edit} // isEditable.edit= false
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </InputWrapper>
      </div>
    </>
  );
};

export default InputFields;

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
  border: ${(props) => (props.editable ? "1px solid #cbcbcc" : "none")};
  border-radius: 20px;
  padding: 8px 5px;
  & > * {
    width: 15px;
    font-size: 13px;
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

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
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
  font-family: "Poppins", sans-serif;
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
