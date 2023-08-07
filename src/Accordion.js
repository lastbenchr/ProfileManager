import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import RoundedImage from "./components/RoundedImage";
import { FlexContainer } from "./components/Styles";
import { BsChevronDown, BsChevronUp, BsPencil } from "react-icons/bs";
import { GoTrash } from "react-icons/go";
import InputFields from "./components/InputFields";

// import Heading from "../Heading";
// import IMAGES from "../../Images";

function Accordion({ title, hiddenPara, hiddenImg, parentfun, pd }) {
  const [active, setActive] = useState(false);
  const accordionDisplay = useRef(null);
  const [height, setHeight] = useState("0px");

  function toggleAccordion() {
    setActive(!active);
    setHeight(active ? "0px" : `${accordionDisplay.current.scrollHeight}px`);
  }

  const CountryInputField = () => {
    const handleKeyPress = (e) => {
      // Prevent entering numeric digits (0-9)
      if (/\d/.test(e.key)) {
        e.preventDefault();
      }
    };
    return (
      <InputWrapper>
        <CountryInput
          type="text"
          placeholder="Name"
          maxLength={30}
          onKeyDown={handleKeyPress}
        />
      </InputWrapper>
    );
  };

  //delete & edit button

  return (
    <AccordionSection>
      <FlexContainer>
        <RoundedImage />
        {/* <p style={{ fontSize: "18px", color: "black" }}>{title}</p> */}
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
        <InputFields />

        <ButtonsWrapper>
          {" "}
          <Delete />
          <Edit />
        </ButtonsWrapper>

        {/* <p style={{ fontSize: "16px" }}>{hiddenPara}</p> */}
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
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #cbcbcc;
  border-radius: 20px;
  padding: 8px 5px;
  margin: 5px;
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

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  margin-top: 18px;

  > * {
    cursor: pointer;
    font-size: 23px;
  }
`;
