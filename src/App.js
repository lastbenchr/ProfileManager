import logo from "./logo.svg";
import "./App.css";
import Accordion from "./Accordion";
import { MainContainer } from "./components/Styles";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { GlobalStyle } from "./components/utils/globalStyles";
import data from "./celebrities.json";

function App() {
  const [users, setUsers] = useState(data);
  //global accordion lock on edit mode.
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Load data from local storage when component mounts
    const storedData = JSON.parse(localStorage.getItem("users"));
    if (storedData) {
      setUsers(storedData);
    }
  }, []);

  console.log("data", users);

  return (
    <>
      <GlobalStyle />
      <MainContainer>
        <Header />
        {users &&
          users.map((user) => {
            return (
              <Accordion
                key={user.id}
                user={user}
                stateExpanded={{ expanded: expanded, setExpanded: setExpanded }}
              />
            );
          })}
        <Footer />
      </MainContainer>
    </>
  );
}

export default App;
