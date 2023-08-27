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
import DeletePopup from "./components/utils/DeletePopup";

function App() {
  const [users, setUsers] = useState(data);

  const [expanded, setExpanded] = useState(false); //global accordion lock on edit mode other accordion to open.
  const [expandedAccordionId, setExpandedAccordionId] = useState(null); // accordion id, open 1 accordion at a time.
  const [isLocalStorageCheck, setIsLocalStorageCheck] = useState(false);
  const [isDeleteDialogVisible, setDeleteDialogVisible] = useState(true);

  useEffect(() => {
    // Load data from local storage when component mounts
    const storedData = JSON.parse(localStorage.getItem("users"));
    if (storedData) {
      // console.log("got users data from local storage", storedData);
      setUsers(storedData);
    }
    setIsLocalStorageCheck(true);
  }, []);

  const handleActiveAccordion = (userId) => {
    if (expandedAccordionId !== userId) {
      setExpandedAccordionId(userId);
    } else {
      setExpandedAccordionId(null);
    }
  };

  const handleSave = (editedUser) => {
    const updatedUsers = users.map((user) =>
      user.id === editedUser.id ? editedUser : user
    );
    setUsers(updatedUsers);
    // setEditingUserId(null);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  // console.log("data", users);

  return (
    <>
      <GlobalStyle />
      {
        isDeleteDialogVisible && (
          <DeletePopup/>
        )
      }
      <MainContainer>
        <Header />
        {isLocalStorageCheck &&
          users.map((user) => {
            return (
              <Accordion
                key={user.id}
                user={user}
                stateExpanded={{ expanded: expanded, setExpanded: setExpanded }}
                handleActiveAccordion={handleActiveAccordion}
                isActive={expandedAccordionId === user.id}
                handleSave={handleSave}
              />
            );
          })}
        <Footer />
      </MainContainer>
    </>
  );
}

export default App;
