import React, { useState } from "react";
import styled from "styled-components";
import { RiCloseLine } from "react-icons/ri"; // Import the close icon

const DeleteDialog = styled.div`
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

const DialogBox = styled.div`
  background-color: white;
  padding: 18px;
  border-radius: 8px;
  text-align: center;
  max-width: 400px;
  width: 100%;

  p {
    display: flex;
    margin: 0px;
    justify-content: space-between;
    align-items: center;
  }
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 8px;
  cursor: pointer;
`;

const ButtonsContainer = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: flex-end;
`;

const DeleteButton = styled.button`
  background-color: #ff3500;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
`;

const CancelButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid #cbcbcc;
  margin-right: 10px;
`;

function DeletePopup() {
    const [isDeleteDialogVisible, setDeleteDialogVisible] = useState(false);

    const handleDeleteClick = () => {
        setDeleteDialogVisible(true);
        document.body.classList.add("lock-scroll");
    };

    const handleDeleteConfirm = () => {
        // Perform delete logic here
        setDeleteDialogVisible(false);
        document.body.classList.remove("lock-scroll");
    };

    const handleCancelDelete = () => {
        setDeleteDialogVisible(false);
        document.body.classList.remove("lock-scroll");
    };

    return (
        <div>
            {/* Trigger the delete dialog */}
            <button onClick={handleDeleteClick}>Delete</button>

            {/* Delete Dialog */}
            {isDeleteDialogVisible && (
                <DeleteDialog>
                    <DialogBox>
                        <p>
                            <span>Are you sure you want to delete?</span>
                            <CloseButton onClick={handleCancelDelete}>
                                <RiCloseLine size={18} />
                            </CloseButton>
                        </p>
                        <ButtonsContainer>
                            <CancelButton onClick={handleCancelDelete}>Cancel</CancelButton>
                            <DeleteButton onClick={handleDeleteConfirm}>Delete</DeleteButton>
                        </ButtonsContainer>
                    </DialogBox>
                </DeleteDialog>
            )}
        </div>
    );
}

export default DeletePopup;