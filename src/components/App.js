import React from 'react';
import { useSelector } from 'react-redux';
import Book from './Book';

export default function App() {
  const favorites = useSelector((state) => state.books.favorites);
  const [keyword, setKeyword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [results, setResults] = React.useState([]);
  const [submitButtonPressed, setSubmitButtonPressed] = React.useState(false);

  console.log('favorites', favorites);

  const handleChange = (evt) => {
    setKeyword(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setResults([]);
    handleSearch(keyword);
  };

  const handleSearch = async (keyword) => {
    setIsLoading(true);
    const books = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${keyword}`
    ).then((res) => res.json());

    setResults(books.items || []);
    setIsLoading(false);
  };

  return (
    <div className="max-width-wrapper">
      <a href="/">
        <h1>Let's find some books!</h1>
      </a>
      <form onSubmit={handleSubmit}>
        <input
          className="search-bar"
          type="text"
          onChange={handleChange}
          value={keyword}
          required
          placeholder="Enter a keyword..."
        />
        <button
          className={`submit-button ${submitButtonPressed ? 'pressed' : ''}`}
          onMouseDown={() => setSubmitButtonPressed(true)}
          onMouseUp={() => setSubmitButtonPressed(false)}
          type="submit"
        >
          S E A R C H
        </button>
      </form>

      <div className="content">
        <div
          className={`results ${
            favorites.length > 0 ? 'reduced-width' : 'full-width'
          }`}
        >
          {isLoading && <div className="loading">L O A D I N G...</div>}
          {results ? (
            results.map((book) => {
              return (
                <Book
                  title={book.volumeInfo.title}
                  authors={book.volumeInfo.authors}
                  description={book.volumeInfo.description}
                  image={book.volumeInfo.imageLinks?.smallThumbnail}
                  id={book.id}
                />
              );
            })
          ) : (
            <div className={`no-results ${isLoading ? 'deactivated' : ''}`}>
              Sorry, there are no results for this keyword
            </div>
          )}
        </div>
        {favorites.length > 0 && !isLoading && (
          <div
            className={`favorites ${
              favorites.length > 1 ? 'multiple-favorites' : 'one-favorite'
            }`}
          >
            {favorites.map((book) => {
              return (
                <Book
                  title={book.title}
                  authors={book.authors}
                  image={book.image}
                  id={book.id}
                  favoritesPanel
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
