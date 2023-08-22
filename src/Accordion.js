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
import useUserAccordion from "./components/utils/useAccordionUser";

function Accordion({ user, stateExpanded, handleActiveAccordion, isActive }) {
  // const [active, setActive] = useState(false);
  const accordionDisplay = useRef(null);
  const [height, setHeight] = useState("0px");

  //new logic
  const [editable, setEditable] = useState(false); // local state variable for current accordion
  // const [name, setName] = useState(`${user.first} ${user.last}`);

  const { editedUser, handleInputChange } = useUserAccordion(user);

  useEffect(() => {
    if (isActive) {
      setHeight(`${accordionDisplay.current.scrollHeight + 10}px`);
    } else {
      setHeight("0px");
    }
  }, [isActive]);

  function toggleAccordion() {
    if (!stateExpanded.expanded) {
      handleActiveAccordion(user.id);
    }
  }

  const handleEdit = () => {
    let age = calculateAge(user.dob);
    if (age >= 18) {
      setEditable(true);
      stateExpanded.setExpanded(true);
    }
  };

  const handleKeyPress = (e) => {
    const handleSplitName = (newValue) => {
      console.log("Performing logic for name change:", newValue);

      const fullName = newValue;

      // eg:  return value of split method --> ["Sooraj", "Yadav"]; destructured this below.
      const [first, last] = fullName.split(" ");

      handleInputChange("first", first);
      handleInputChange("last", last);
    };

    // Prevent entering numeric digits (0-9)
    if (/\d/.test(e.key)) {
      e.preventDefault();
    } else {
      const newValue = e.target.value;
      handleSplitName(newValue);
    }
  };

  // const CountryInputField = ({}) => {
  //   return (
  //     <InputWrapper editable={editable}>
  //       <CountryInput
  //         type="text"
  //         placeholder="Name"
  //         maxLength={30}
  //         // value={`${editedUser.first} ${editedUser.last}`}
  //         // onKeyDown={handleKeyPress}
  //         onKeyDown={(e) => handleInputChange("first", e.target.value)}
  //         readOnly={!editable} // initally true
  //       />
  //     </InputWrapper>
  //   );
  // };

  //delete & edit button
  console.log("Final edited user", editedUser);

  return (
    <AccordionSection>
      <FlexContainer>
        <RoundedImage imgSrc={editedUser.picture} />
        <InputWrapper editable={editable}>
          <CountryInput
            type="text"
            placeholder="Name"
            maxLength={30}
            value={`${editedUser.first || ""} ${editedUser.last || ""}`}
            // onKeyDown={}
            onChange={(e) => handleKeyPress(e)}
            readOnly={!editable} // initally true
          />
        </InputWrapper>
        <AccordionButton
          // className={`accordion ${active ? "active" : ""}`}
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
            isEditable={{ edit: editable, setedit: setEditable }}
          />

          <ButtonsWrapper>
            {editable ? (
              <>
                <CancelButton /> <SaveButton />
              </>
            ) : (
              <>
                <Delete />
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
const Delete = styled(GoTrash)`
  color: red;
`;

const Edit = styled(BsPencil)`
  color: #3498db;
`;

const SaveButton = styled(BsCheckCircle)`
  color: green;
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
