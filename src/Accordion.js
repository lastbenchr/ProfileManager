import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import RoundedImage from "./components/RoundedImage";
import { FlexContainer } from "./components/Styles";
import {
  BsChevronDown,
  BsChevronUp,
  BsPencil,
  BsCheckCircle,
} from "react-icons/bs";
import { GoTrash } from "react-icons/go";
import { RxCrossCircled } from "react-icons/rx";

import InputFields from "./components/InputFields";
import { calculateAge } from "./components/utils/DRYmethods";

function Accordion({
  user,
  stateExpanded,
  handleActiveAccordion,
  isActive,
  handleSave,
  handleDeleteClick,
}) {
  const accordionDisplay = useRef(null);
  const [height, setHeight] = useState("0px");
  const [editable, setEditable] = useState(false); // local state variable for current edit mode & border accordion
  const [editedUser, setEditedUser] = useState({ ...user }); // shallow copy

  useEffect(() => {
    if (isActive) {
      setHeight(`${accordionDisplay.current.scrollHeight + 10}px`);
    } else {
      setHeight("0px");
    }
    // Update the local state when the 'user' prop changes
    setEditedUser(user);
  }, [isActive, user]);

  const handleInputChange = (field, value) => {
    setEditedUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  function toggleAccordion() {
    if (!stateExpanded.expanded) {
      handleActiveAccordion(user.id);
    }
  }

  const handleEdit = () => {
    let age = calculateAge(user.dob);
    if (age >= 18) {
      setEditable(true); // Open local edit mode, border accordion.
      stateExpanded.setExpanded(true); //lock globally other accordion to open.
    }
  };

  const handleLocalSave = () => {
    handleSave(editedUser);
    setEditable(false); // closes local edit mode, border accordion.
    stateExpanded.setExpanded(false); // unlock globally other accordion to open.
  };

  const handleLocalCancel = () => {
    setEditedUser({ ...user });
    setEditable(false); // closes local edit mode, border accordion.
    stateExpanded.setExpanded(false); // unlock globally other accordion to open.
  };

  function isAnyFieldValueEmpty(obj) {
    const emptyFields = Object.keys(obj).filter((key) => {
      const value = obj[key];
      return value === null || value === undefined || value === ""; // if true then insert data into emptyFields array.
    });

    return emptyFields.length > 0; // returns true if any data inside emptyFields array.
  }

  function hasUserChanged(originalUser, editedUser) {
    const keys = Object.keys(originalUser);

    for (const key of keys) {
      if (originalUser[key] !== editedUser[key]) {
        return true; // If any value is different, return true
      }
    }

    return false; // If all values are the same, return false
  }

  const handleKeyPress = (e) => {
    const handleSplitName = (splitValue) => {
      const fullName = splitValue;

      // eg:  return value of split method --> ["Sooraj", "Yadav"]; destructured this below.
      const [first, last] = fullName.split(" ");

      handleInputChange("first", first);
      handleInputChange("last", last);
    };

    // Prevent entering numeric digits (0-9)
    let newValue = e.target.value;
    if (/\d/.test(newValue)) {
      // If it contains digits, remove them
      newValue = newValue.replace(/\d/g, "");
    } else {
      console.log("coming value inside name", newValue);
      handleSplitName(newValue);
    }
  };

  const isDisableSave =
    isAnyFieldValueEmpty(editedUser) || !hasUserChanged(user, editedUser);

  return (
    <AccordionSection>
      <FlexContainer>
        <RoundedImage
          imgSrc={editedUser.picture}
          isEditable={editable}
          handleInputChange={handleInputChange}
        />
        <InputWrapper editable={editable}>
          <CountryInput
            type="text"
            placeholder="Name"
            maxLength={30}
            value={`${editedUser.first || ""} ${editedUser.last || ""}`}
            onChange={(e) => handleKeyPress(e)}
            readOnly={!editable} // initally true
          />
        </InputWrapper>
        <AccordionButton
          onClick={toggleAccordion}
          isExpanded={stateExpanded.expanded}
        >
          <span style={{ marginLeft: "20px", fontSize: "20px" }}>
            {isActive ? <BsChevronUp /> : <BsChevronDown />}
          </span>
        </AccordionButton>
      </FlexContainer>
      {isActive && (
        <AccordionContent
          ref={accordionDisplay}
          style={{ maxHeight: `${height}` }}
        >
          <InputFields
            editedUser={editedUser}
            handleInputChange={handleInputChange}
            isEditable={editable}
          />

          <ButtonsWrapper>
            {editable ? (
              <>
                <CancelButton onClick={() => handleLocalCancel()} />{" "}
                <BaseButton
                  onClick={() => handleLocalSave()}
                  disabled={isDisableSave}
                >
                  <SaveButton disabled={isDisableSave} />
                </BaseButton>
              </>
            ) : (
              <>
                <Delete onClick={() => handleDeleteClick(editedUser.id)} />
                <Edit onClick={handleEdit} />
              </>
            )}
          </ButtonsWrapper>
        </AccordionContent>
      )}
    </AccordionSection>
  );
}

export default Accordion;

// name input field
const CountryInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  margin-left: 5px;
  font-weight: bold;
  font-size: 18px;
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #cbcbcc;
  border-radius: 20px;
  padding: 8px 5px;
  border: ${(props) => (props.editable ? "1px solid #cbcbcc" : "none")};
  & > * {
  }
`;

//

const AccordionSection = styled.div`
  max-width: 550px;
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #cbcbcc;
  border-radius: 12px;
  padding: 10px 20px;
  box-sizing: border-box;   
`;

const AccordionButton = styled.div`
  color: grey;
  cursor: ${(props) => (props.isExpanded ? "not-allowed" : "pointer")};
  outline: none;
  transition: background-color 0.3s ease;
  //new for left align
  margin-left: auto;

  .rotate {
    transform: rotate(90deg);
  }

  .accordion__icon {
    margin-left: auto;
    transition: transform 0.6s ease;
  }
`;

const AccordionContent = styled.div`
  background-color: white;
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

//trash

const BaseButton = styled.button`
  padding: 0px;
  border: none;
  background-color: inherit;
`;

const Delete = styled(GoTrash)`
  color: red;
`;

const Edit = styled(BsPencil)`
  color: #3498db;
`;

const SaveButton = styled(BsCheckCircle)`
  color: green;
  font-size: 23px;
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
`;

const CancelButton = styled(RxCrossCircled)`
  color: red;
  font-size: 25px !important;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin-top: 10px;

  > * {
    cursor: pointer;
    font-size: 23px;
  }
`;
