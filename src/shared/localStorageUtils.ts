import { Book } from "../utiils/constType";
import { Books as initialBooks } from "../utiils/utils";

const LOCAL_STORAGE_KEY = "books";

export const getBooksFromLocalStorage = (): Book[] => {
  const books = localStorage.getItem(LOCAL_STORAGE_KEY);
  return books ? JSON.parse(books) : [];
};

export const setBooksToLocalStorage = (books: Book[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(books));
};

export const addBookToLocalStorage = (book: Book) => {
  const books = getBooksFromLocalStorage();
  books.push(book);
  setBooksToLocalStorage(books);
};

export const updateBookInLocalStorage = (updatedBook: Book) => {
  const books = getBooksFromLocalStorage();
  const updatedBooks = books.map((book) =>
    book.title === updatedBook.title ? updatedBook : book
  );
  setBooksToLocalStorage(updatedBooks);
};

export const deleteBookFromLocalStorage = (title: string) => {
  const books = getBooksFromLocalStorage();
  const updatedBooks = books.filter((book) => book.title !== title);
  setBooksToLocalStorage(updatedBooks);
};

export const initializeBooksInLocalStorage = () => {
  const books = getBooksFromLocalStorage();
  if (books.length === 0) {
    setBooksToLocalStorage(initialBooks);
  }
};
