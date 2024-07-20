import React from "react";
import { Button } from "antd";
import CustomModal from "../../shared/CustomModal";
import "./DeleteModal.scss";

interface DeleteModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirmDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  showModal,
  setShowModal,
  onConfirmDelete,
}) => {
  return (
    <CustomModal
      show={showModal}
      onCancel={() => setShowModal(false)}
      centered={true}
      className="delete-book__modal"
    >
      <div className="delete-modal-content">
        <p className="delete-message">
          Are you sure you want to delete this book?
        </p>
        <div className="delete-modal-buttons">
          <Button className="delete-button" onClick={onConfirmDelete}>
            Yes
          </Button>
          <Button className="cancel-button" onClick={() => setShowModal(false)}>
            No
          </Button>
        </div>
      </div>
    </CustomModal>
  );
};

export default DeleteModal;
