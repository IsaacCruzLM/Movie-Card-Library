import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

import * as movieAPI from '../services/movieAPI';
import SearchBar from '../components/SearchBar';

import Loading from '../components/Loading';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      fullList: [],
      loading: true,
      searchText: '',
      bookmarkedOnly: false,
      selectedGenre: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.filterMovies = this.filterMovies.bind(this);
  }

  componentDidMount() {
    const { getMovies } = movieAPI;
    getMovies().then((res) => {
      this.setState({
        movies: res,
        fullList: res,
      }, () => this.setState({ loading: false }));
    });
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.filterMovies());
  }

  filterMovies() {
    const { searchText, bookmarkedOnly, selectedGenre, fullList } = this.state;
    let moviesFiltered = fullList.filter((movie) => movie.title.includes(searchText)
      || movie.subtitle.includes(searchText.toLowerCase())
      || movie.storyline.includes(searchText.toLowerCase()));
    if (bookmarkedOnly === true) {
      moviesFiltered = moviesFiltered.filter((movie) => movie.bookmarked === true);
    }
    moviesFiltered = moviesFiltered.filter(
      (movie) => movie.genre.includes(selectedGenre),
    );

    this.setState({
      movies: moviesFiltered,
    });
  }

  render() {
    const { movies, loading, searchText, bookmarkedOnly, selectedGenre } = this.state;

    // Render Loading here if the request is still happening
    if (loading) return <Loading />;

    return (
      <div data-testid="movie-list">
        <SearchBar
          searchText={ searchText }
          onSearchTextChange={ this.handleChange }
          bookmarkedOnly={ bookmarkedOnly }
          onBookmarkedChange={ this.handleChange }
          selectedGenre={ selectedGenre }
          onSelectedGenreChange={ this.handleChange }
        />
        <Link className="addMovie" to="/movies/new">ADICIONAR CARTÃO</Link>
        <div className="movieList">
          {movies.map((movie) => <MovieCard key={ movie.title } movie={ movie } />)}
        </div>
      </div>
    );
  }
}

export default MovieList;
