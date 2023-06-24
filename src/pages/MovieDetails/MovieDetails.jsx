import { Suspense, useEffect, useState, useRef } from 'react';
import { Link, useParams, Outlet, useLocation } from 'react-router-dom';
import css from './MovieDetails.module.css';
import Api from 'components/Api/Api';
import noImg from './images/noimg.jpg';
import { BackLink } from 'components/BackLink/BackLink';
import Loader from 'components/Loader/Loader';

const MovieDetails = () => {
  const { id } = useParams();

  const [movieDetails, setMovieDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const backLinkHref = useRef(location.state?.from ?? '/');

  useEffect(() => {
    (async () => {
      try {
        const movie = await Api.getMovieDetails(id);

        setMovieDetails([movie]);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setMovieDetails, setIsLoading, id]);

  return (
    <div>
      {!isLoading && <BackLink to={backLinkHref.current}>Go back</BackLink>}
      {movieDetails.map(
        ({
          id,
          poster_path,
          title,
          original_title,
          release_date,
          vote_average,
          overview,
          genres,
        }) => (
          <div key={id}>
            <div className={css.movieDetails}>
              <div className={css.moviePoster}>
                <img
                  src={
                    poster_path
                      ? `https://image.tmdb.org/t/p/original${poster_path}`
                      : noImg
                  }
                  alt={title ? title + ' poster' : original_title + ' poster'}
                  loading="lazy"
                  className={css.movieImg}
                />
              </div>
              <div>
                <h3>
                  {title ? title : original_title}(
                  {release_date ? release_date.slice(0, 4) : 'No date'})
                </h3>
                <p>User score: {vote_average}</p>
                <div>
                  <h5>Overview</h5>
                  <p>{overview ? overview : 'There is no overview'}</p>
                </div>
                <div>
                  <h5>Genres</h5>
                  {genres && genres.length > 0 ? (
                    <p>{genres.map(genre => genre.name).join(', ')}</p>
                  ) : (
                    <p>No genres available</p>
                  )}
                </div>
              </div>
            </div>
            {!isLoading && (
              <div className={css.additionalInf}>
                <p>Additional information</p>
                <ul>
                  <li>
                    {' '}
                    <Link to="cast">Cast</Link>
                  </li>
                  <li>
                    <Link to="reviews">Reviews</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )
      )}
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <Loader isLoading={isLoading} />
    </div>
  );
};

export default MovieDetails;
