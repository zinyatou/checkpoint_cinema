import React, { useState } from 'react';
import MovieList from './MovieList';
import Filter from './Filter';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const handleAddMovie = movie => {
    setMovies([...movies, movie]);
  };

  const handleFilter = filter => {
    const { title, rating } = filter;

    if (title || rating) {
      const filtered = movies.filter(movie => {
        const matchTitle = title ? movie.title.toLowerCase().includes(title.toLowerCase()) : true;
        const matchRating = rating ? movie.rating.toString() === rating.toString() : true;
        return matchTitle && matchRating;
      });
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies([]);
    }
  };

  return (
    <div>
      <h1>Cinema App</h1>
      <Filter onFilter={handleFilter} />
      <MovieList movies={filteredMovies.length > 0 ? filteredMovies : movies} />
      <h2>Add a New Movie</h2>
      <form
        onSubmit={event => {
          event.preventDefault();
          const { title, description, posterURL, rating } = event.target.elements;
          handleAddMovie({
            title: title.value,
            description: description.value,
            posterURL: posterURL.value,
            rating: parseFloat(rating.value),
          });
          event.target.reset();
        }}
      >
        <input type="text" name="title" placeholder="Title" required />
        <input type="text" name="description" placeholder="Description" required />
        <input type="text" name="posterURL" placeholder="Poster URL" required />
        <input type="number" name="rating" placeholder="Rating" step="0.1" min="0" max="10" required />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default App;
