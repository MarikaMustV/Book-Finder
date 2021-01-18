import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions as booksActions } from '../redux/booksSlice';

export default function Book({
  title,
  authors,
  description,
  image,
  id,
  favoritesPanel,
}) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.books.favorites);
  const [favButtonPressed, setFavButtonPressed] = React.useState(false);

  const getAuthors = (authors) => {
    if (!authors) return '-';
    return authors.map((author, index) => {
      if (authors.length > 1 && index + 1 !== authors.length) {
        return `${author}, `;
      } else return author;
    });
  };

  return (
    <div className={`book ${favoritesPanel ? 'favorite-book' : ''}`}>
      {image && (
        <div className="image-side">
          <img className="thumbnail" src={image} alt="thumbnail" />
        </div>
      )}

      <div className="text-side">
        <div className="title">{title}</div>
        <div className="authors">{getAuthors(authors)}</div>
        <div className="description">{description}</div>

        <button
          onClick={() => {
            if (favorites.some((book) => book.id === id)) {
              dispatch(
                booksActions.removeFavoriteBook({
                  title,
                  authors,
                  description,
                  image,
                  id,
                })
              );
            } else {
              dispatch(
                booksActions.favoriteBook({
                  title,
                  authors,
                  description,
                  image,
                  id,
                })
              );
            }
          }}
          onMouseDown={() => setFavButtonPressed(true)}
          onMouseUp={() => setFavButtonPressed(false)}
          className={`favorite-button ${favButtonPressed ? 'pressed' : ''}`}
        >
          {favorites.some((book) => book.id === id)
            ? 'Remove from favorites'
            : 'Add to favorites'}
        </button>
      </div>
    </div>
  );
}
