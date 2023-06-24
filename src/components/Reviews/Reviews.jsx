import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './Reviews.module.css';
import Api from 'components/Api/Api';
import Loader from 'components/Loader/Loader';

const Reviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const reviewsApi = await Api.getMovieReviews(id);

        setReviews(reviewsApi);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setReviews, id]);

  return (
    <>
      {reviews.length > 0 ? (
        <ul className={css.reviewsList}>
          {reviews.map(
            ({ id, author_details: { username, name }, content }) => (
              <li key={id} className={css.reviewsList__item}>
                <h4>{username || name || 'Unknown'} </h4>
                <p>{content} </p>
              </li>
            )
          )}
        </ul>
      ) : (
        <p className={css.reviewsList__message}>
          We don't have any reviews for this movie
        </p>
      )}
      {isLoading && reviews.length > 0 && <Loader />}
    </>
  );
};

export default Reviews;
