import React from "react";
import { Card, Button } from "antd";
import "./card.scss";

interface Book {
  title: string;
  author: string;
  description: string;
  coverImage?: string;
  publicationDate: string;
  genre: string;
  onViewDetails: () => void;
  onUpdate: () => void;
  onDelete: () => void;
}

const BookCard: React.FC<Book> = ({
  title,
  author,
  description,
  coverImage,
  publicationDate,
  genre,
  onViewDetails,
  onUpdate,
  onDelete,
}) => {
  const placeholderImage = "https://via.placeholder.com/100";

  return (
    <Card
      title={title}
      bordered={false}
      cover={
        <img
          alt={title}
          src={coverImage || placeholderImage}
          className="cover-image"
        />
      }
      className="book-card"
    >
      <p>
        <strong>Author:</strong> {author}
      </p>
      <p>
        <strong>Publication Date:</strong> {publicationDate}
      </p>
      <p>
        <strong>Genre:</strong> {genre}
      </p>
      <p>{description}</p>
      <div className="card-buttons">
        <Button className="details-button" onClick={onViewDetails}>
          View Details
        </Button>
        <Button className="update-button" onClick={onUpdate}>
          Update
        </Button>
        <Button className="delete-button" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default BookCard;
