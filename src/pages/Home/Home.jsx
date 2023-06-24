import Api from 'components/Api/Api';
import css from './Home.module.css';
import MoviesList from 'components/MoviesList/MoviesList';
import Loader from 'components/Loader/Loader';
import { useEffect, useState } from 'react';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
      <MoviesList movies={movies} />
      {isLoading && movies.length > 0 && <Loader />}
    </div>
  );
};

export default Home;
