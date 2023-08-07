import styled from "styled-components";

const FlexContainer = styled.div`
  display: flex;
  //   flex-direction: column;
  align-items: center;
  gap: ${(props) => props.gap || "1rem"};
  justify-content: ${(props) => props.jfycont || "space-between"};

  @media (min-width: 1020px) {
    flex-direction: ${(props) => props.flxdrn || "row"};
  }

  > div {
    flex: ${(props) => props.flex || ""};
  }
`;

const MainContainer = styled.div`
  margin: 0 auto;
  max-width: 1240px;
  padding: calc(16px + 1.5625vw);
  text-align: center;
  //to center inside contents
  display: grid;
  place-items: center;
  gap: 10px;
  gap: 20px @media (min-width: 1020px) {
    text-align: left;
  }
`;

export { FlexContainer, MainContainer };
