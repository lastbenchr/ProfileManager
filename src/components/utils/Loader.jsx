import React from "react";
import styled, { keyframes } from "styled-components";

const loaderFigure = keyframes`
  0% {
    height: 0;
    width: 0;
    background-color: #FE665C;
  }
  29% {
    background-color: #FE665C;
  }
  30% {
    height: 2em;
    width: 2em;
    background-color: transparent;
    border-width: 1em;
    opacity: 1;
  }
  100% {
    height: 2em;
    width: 2em;
    border-width: 0;
    opacity: 0;
    background-color: transparent;
  }
}`;

const loaderLabel = keyframes`
  0% {
    opacity: 0.25;
  }
  30% {
    opacity: 1;
  }
  100% {
    opacity: 0.25;
  }
}`;

const LoaderWrapper = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.5);
z-index: 2;
display: flex;
align-items: center;
justify-content: center;
`;

const LoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoaderFigure = styled.div`
  height: 0;
  width: 0;
  box-sizing: border-box;
  border: 0 solid #fe665c;
  border-radius: 50%;
  animation: ${loaderFigure} 1.15s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
`;

const LoaderLabel = styled.p`
  float: left;
  margin-left: 260px;
  transform: translateX(-50%);
  font-size: 0.875em;
  letter-spacing: 0.1em;
  line-height: 1.5em;
  color: #8d3b3e;
  white-space: nowrap;
  animation: ${loaderLabel} 1.15s infinite cubic-bezier(0.215, 0.61, 0.355, 1);
`;

const Loader = () => {
  return (
    <LoaderWrapper>
    <LoaderContainer>
      <LoaderFigure />
    </LoaderContainer>
    <LoaderLabel>Uploading...</LoaderLabel>

    </LoaderWrapper>
  );
};

export default Loader;
