import Api from 'components/Api/Api';
import css from './Home.module.css';
import MoviesList from 'components/MoviesList/MoviesList';
import Loader from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const movies = await Api.getTrendingMovies();
        setMovies(movies);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setMovies, setIsLoading]);

  return (
    <div>
      <h1 className={css.header}>Trending today</h1>
      {movies.length > 0 && (
        <MoviesList movies={movies} path={'movies/'} location={location} />
      )}
      {isLoading && movies.length > 0 && <Loader />}
    </div>
  );
};

export default Home;
