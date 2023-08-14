import React from "react";
import { BsChevronDown } from "react-icons/bs"; // Replace 'fa' with the appropriate icon package you want to use
import styled from "styled-components";
import { useState, useEffect } from "react";
import { calculateAge } from "./utils/DRYmethods";
import Dropdown from "./Dropdown";

const InputFields = ({ data, isEditable }) => {
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
    const [age, setAge] = useState("");

    useEffect(() => {
      setAge(calculateAge(data.dob));
    }, [data.dob]);

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
            onKeyDown={handleKeyDown}
          />
        </InputWrapper>
      </div>
    );
  };

  const GenderSelect = () => {
    const [selectedGender, setSelectedGender] = useState(data.gender);

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
        <Dropdown editable={isEditable.edit} />
        {/* </InputWrapper> */}
      </div>
    );
  };

  const CountryInputField = () => {
    const [ucountry, setUcountry] = useState(data.country);

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
        <InputWrapper editable={isEditable.edit}>
          <CountryInput
            type="text"
            placeholder="Country"
            value={ucountry}
            maxLength={30}
            readOnly={!isEditable.edit} // isEditable.edit= false
            onKeyDown={handleKeyPress}
          />
        </InputWrapper>
      </div>
    );
  };

  const DescriptionInput = () => {
    const [description, setDescription] = useState(data.description);
    return (
      <div style={{ marginTop: "20px" }}>
        <Label>
          <p>Description</p>
        </Label>

        <InputWrapper editable={isEditable.edit}>
          <DescriptionTextarea
            rows="5"
            placeholder="Enter description"
            value={description}
            readOnly={!isEditable.edit} // isEditable.edit= false
          />
        </InputWrapper>
      </div>
    );
  };

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
