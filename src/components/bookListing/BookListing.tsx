import React, { useState, useEffect } from "react";
import { Col, Row, Input } from "antd";
import BookCard from "../Card/BookCard";
import CustomButton from "../../shared/button";
import "./bookListing.scss";
import AddUpdateModal from "../modal/AddUpdateModal";
import ViewBookDetails from "../modal/ViewBookDetails";
import {
  initializeBooksInLocalStorage,
  getBooksFromLocalStorage,
  addBookToLocalStorage,
  updateBookInLocalStorage,
  deleteBookFromLocalStorage,
} from "../../shared/localStorageUtils";
import { Toaster } from "../../shared/Toaster";
import { Book } from "../../utiils/constType";
import DeleteModal from "../modal/delateModal";

const { Search } = Input;

const BookListing: React.FC = () => {
  const [showAddUpdateModal, setShowAddUpdateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    initializeBooksInLocalStorage();
    const storedBooks = getBooksFromLocalStorage();
    setBooks(storedBooks);
  }, []);

  const handleAddBook = () => {
    setSelectedBook(null);
    setShowAddUpdateModal(true);
  };

  const handleAddUpdateBook = (newBook: Book) => {
    if (selectedBook) {
      updateBookInLocalStorage(newBook);
      setBooks(
        books.map((book) =>
          book.title === selectedBook.title ? newBook : book
        )
      );
      Toaster("success", "Book updated successfully");
    } else {
      addBookToLocalStorage(newBook);
      setBooks([...books, newBook]);
      Toaster("success", "Book added successfully");
    }
    setShowAddUpdateModal(false);
  };

  const handleViewDetails = (book: Book) => {
    setSelectedBook(book);
    setShowViewModal(true);
  };

  const handleUpdateBook = (book: Book) => {
    setSelectedBook(book);
    setShowAddUpdateModal(true);
  };

  const handleDeleteBook = (book: Book) => {
    setSelectedBook(book);
    setShowDeleteModal(true);
  };

  const confirmDeleteBook = () => {
    if (selectedBook) {
      deleteBookFromLocalStorage(selectedBook.title);
      setBooks(books.filter((book) => book.title !== selectedBook.title));
      setShowDeleteModal(false);
      Toaster("success", "Book deleted successfully");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="bookListing-container">
      <div className="search-add-container">
        <Search
          placeholder="Search books"
          value={searchInput}
          onChange={handleSearch}
          className="search-bar"
        />
        <CustomButton
          className="add-book-btn"
          size="large"
          shape="round"
          onClick={handleAddBook}
        >
          Add Book
        </CustomButton>
      </div>
      {filteredBooks.length === 0 ? (
        <div className="no-data-message text--center">No books found.</div>
      ) : (
        <Row gutter={16}>
          {filteredBooks.map((book, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <BookCard
                {...book}
                onViewDetails={() => handleViewDetails(book)}
                onUpdate={() => handleUpdateBook(book)}
                onDelete={() => handleDeleteBook(book)}
              />
            </Col>
          ))}
        </Row>
      )}
      <AddUpdateModal
        showModal={showAddUpdateModal}
        setShowModal={setShowAddUpdateModal}
        onAddUpdateBook={handleAddUpdateBook}
        initialBookData={selectedBook}
      />
      <ViewBookDetails
        showModal={showViewModal}
        setShowModal={setShowViewModal}
        book={selectedBook}
      />
      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        onConfirmDelete={confirmDeleteBook}
      />
    </div>
  );
};

export default BookListing;
