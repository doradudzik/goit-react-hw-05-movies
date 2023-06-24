import { useEffect, useState } from 'react';
import { useSearchParams, Link, useLocation } from 'react-router-dom';
import css from './Movies.module.css';
import moviesListCss from '../../components/MoviesList/MoviesList.module.css';
import Api from 'components/Api/Api';
import Loader from 'components/Loader/Loader';
import { Notify } from 'notiflix';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const movieQuery = searchParams.get('query') ?? '';
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const moviesList = await Api.searchMovies(movieQuery);

        setMovies(moviesList);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setMovies, setIsLoading, movieQuery]);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      setIsLoading(true);

      const form = event.currentTarget;
      const query = form.elements.query.value;

      if (query === '') {
        Notify.warning('Please, fill the main field');
        return;
      }

      const moviesList = await Api.searchMovies(query.toLowerCase().trim());
      if (moviesList.length === 0) {
        Notify.failure('No movies found');
      }
      const nextParams = query !== '' ? { query } : {};
      setSearchParams(nextParams);
      setMovies(moviesList);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={css.form}>
        <input type="text" name="query" className={css.input} />
        <button type="submit" className={css.form__btn}>
          Search
        </button>
      </form>
      {movies.length > 0 && (
        <ul className={moviesListCss.movieList}>
          {movies.map(({ id, title }) => (
            <li key={id}>
              <Link to={`/movies/${id}`} state={{ from: location }}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      )}
      {isLoading && movies.length > 0 && <Loader />}
    </>
  );
};
export default Movies;
