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

// import Heading from "../Heading";
// import IMAGES from "../../Images";

function Accordion({
  accordionData,
  hiddenPara,
  hiddenImg,
  parentfun,
  pd,
  isEditable,
}) {
  const [active, setActive] = useState(false);
  const accordionDisplay = useRef(null);
  const [height, setHeight] = useState("0px");

  const [name, setName] = useState(
    `${accordionData.first} ${accordionData.last}`
  );

  function toggleAccordion() {
    if (!isEditable.edit) {
      setActive(!active);
      setHeight(
        active ? "0px" : `${accordionDisplay.current.scrollHeight + 10}px`
      );
    }
  }

  const handleEdit = () => {
    console.log("handle edit clicked", isEditable);
    let age = calculateAge(accordionData.dob);
    if (age >= 18) {
      isEditable.setedit(true);
      console.log("handle edit changed", isEditable);
    }
  };

  const CountryInputField = ({}) => {
    const handleKeyPress = (e) => {
      // Prevent entering numeric digits (0-9)
      if (/\d/.test(e.key)) {
        e.preventDefault();
      }
      // setName();
    };
    return (
      <InputWrapper editable={isEditable.edit}>
        <CountryInput
          type="text"
          placeholder="Name"
          maxLength={30}
          onKeyDown={handleKeyPress}
          value={name}
          readOnly={isEditable.edit}
        />
      </InputWrapper>
    );
  };

  //delete & edit button

  return (
    <AccordionSection>
      <FlexContainer>
        <RoundedImage imgSrc={accordionData.picture} />
        <CountryInputField />
        <AccordionButton
          className={`accordion ${active ? "active" : ""}`}
          onClick={toggleAccordion}
          pd={pd}
        >
          <span style={{ marginLeft: "20px", fontSize: "20px" }}>
            {active ? <BsChevronUp /> : <BsChevronDown />}
          </span>
        </AccordionButton>
      </FlexContainer>

      <AccordionContent
        ref={accordionDisplay}
        style={{ maxHeight: `${height}` }}
      >
        <InputFields data={accordionData} isEditable={isEditable} />

        <ButtonsWrapper>
          {isEditable.edit ? (
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
  cursor: pointer;

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
  transition: max-height 0.2s ease;
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
