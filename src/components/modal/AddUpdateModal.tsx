import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import CustomModal from "../../shared/CustomModal";
import { Book } from "../../utiils/constType";
import "./add-modal.scss";

interface AddUpdateModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onAddUpdateBook: (book: Book) => void;
  initialBookData?: Book | null;
}

const AddUpdateModal: React.FC<AddUpdateModalProps> = ({
  showModal,
  setShowModal,
  onAddUpdateBook,
  initialBookData,
}) => {
  const initialValues: Book = initialBookData || {
    title: "",
    author: "",
    description: "",
    coverImage: "",
    publicationDate: "",
    genre: "",
    link: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    author: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    coverImage: Yup.string().required("Required"),
    publicationDate: Yup.date().required("Required"),
    genre: Yup.string().required("Required"),
    link: Yup.string().required("Required"),
  });

  const handleSubmit = (values: Book) => {
    onAddUpdateBook(values);
    setShowModal(false);
  };

  return (
    <CustomModal
      show={showModal}
      onCancel={() => setShowModal(false)}
      centered={true}
      className="add-update-book__modal"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="form-container">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <Field name="title" className="form-field" />
              <ErrorMessage
                name="title"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-group">
              <label htmlFor="author">Author</label>
              <Field name="author" className="form-field" />
              <ErrorMessage
                name="author"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <Field name="description" as="textarea" className="form-field" />
              <ErrorMessage
                name="description"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-group">
              <label htmlFor="coverImage">Cover Image URL</label>
              <Field name="coverImage" className="form-field" />
              <ErrorMessage
                name="coverImage"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-group">
              <label htmlFor="publicationDate">Publication Date</label>
              <Field
                name="publicationDate"
                type="date"
                className="form-field"
              />
              <ErrorMessage
                name="publicationDate"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-group">
              <label htmlFor="genre">Genre</label>
              <Field name="genre" className="form-field" />
              <ErrorMessage
                name="genre"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-group">
              <label htmlFor="link">Link</label>
              <Field name="link" className="form-field" />
              <ErrorMessage
                name="link"
                component="div"
                className="error-message"
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-button">
                {initialBookData ? "Update Book" : "Add Book"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default AddUpdateModal;
