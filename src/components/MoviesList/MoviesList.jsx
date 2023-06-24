import { Link } from 'react-router-dom';
import css from './MoviesList.module.css';
import PropTypes from 'prop-types';

const MoviesList = ({ movies, location, path }) => {
  return (
    <ul className={css.movieList}>
      {movies.map(({ title, original_title, id }) => (
        <li key={id}>
          <Link to={`${path}${id}`} state={{ from: location }}>
            {title ? title : original_title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  location: PropTypes.object,
  path: PropTypes.string,
};
export default MoviesList;
