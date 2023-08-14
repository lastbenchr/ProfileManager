import logo from "./logo.svg";
import "./App.css";
import Accordion from "./Accordion";
import { MainContainer } from "./components/Styles";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { GlobalStyle } from "./components/utils/globalStyles";

function App() {
  const [celebritiesData, setCelebritiesData] = useState([]);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    axios
      .get("/celebrities.json")
      .then((response) => setCelebritiesData(response.data));
  }, []);

  console.log("data", celebritiesData);

  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <Header />
        {celebritiesData &&
          celebritiesData.map((ele, ind) => {
            return (
              <Accordion
                key={ind}
                accordionData={ele}
                isEditable={{ edit: editable, setedit: setEditable }}
                // hiddenPara={ele.hiddenPara}
                // parentfun={handleImg}
                // hiddenImg={ele.hiddenImg}
                // pd={pd}
              />
            );
          })}
        <Footer />
      </MainContainer>
    </>
  );
}

export default App;
