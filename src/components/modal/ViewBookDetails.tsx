import React from "react";
import CustomModal from "../../shared/CustomModal";
import { Book } from "../../utiils/constType";
import "./ViewBookDetails.scss";

interface ViewBookDetailsProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  book: Book | null;
}

const ViewBookDetails: React.FC<ViewBookDetailsProps> = ({
  showModal,
  setShowModal,
  book,
}) => {
  if (!book) return null;

  return (
    <CustomModal
      show={showModal}
      onCancel={() => setShowModal(false)}
      centered={true}
      className="view-book-details__modal"
    >
      <div className="book-details-container">
        <h2 className="book-title">{book.title}</h2>
        <img
          alt={book.title}
          src={book.coverImage}
          className="book-cover-image"
        />
        <p>
          <strong>Author:</strong> {book.author}
        </p>
        <p>
          <strong>Publication Date:</strong> {book.publicationDate}
        </p>
        <p>
          <strong>Genre:</strong> {book.genre}
        </p>
        <p>
          <strong>Description:</strong> {book.description}
        </p>
      </div>
    </CustomModal>
  );
};

export default ViewBookDetails;
