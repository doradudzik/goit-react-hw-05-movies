import { Link } from 'react-router-dom';
import css from './MoviesList.module.css';
import PropTypes from 'prop-types';

const MoviesList = ({ movies }) => {
  return (
    <ul className={css.movieList}>
      {movies.map(({ title, original_title, id }) => (
        <li key={id}>
          <Link to={`/movies/${id}`}>{title ? title : original_title} </Link>
        </li>
      ))}
    </ul>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
};
export default MoviesList;
