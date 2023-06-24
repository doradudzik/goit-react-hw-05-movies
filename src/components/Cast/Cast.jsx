import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from './Cast.module.css';
import Api from 'components/Api/Api';
import person from './images/person.jpg';
import Loader from 'components/Loader/Loader';

const Cast = () => {
  const { id } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const credits = await Api.getMovieCredits(id);

        setCast(credits.cast);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setCast, id]);

  return (
    <>
      {cast.length > 0 ? (
        <ul className={css.castList}>
          {cast.map(({ id, name, character, profile_path }) => (
            <li key={id} className={css.castList__item}>
              <div className={css.photoBox}>
                <img
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/original${profile_path}`
                      : person
                  }
                  alt={name + 'photo'}
                  loading="lazy"
                  className={
                    profile_path ? css.profileImage : css.defaultProfileImage
                  }
                />
              </div>
              <div className={css.castList__name}>
                <h4>{name ? name : 'Unknown name'}</h4>
                <p> {character ? character : 'Unknown character'}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>There is no information about cast</p>
      )}
      {isLoading && cast.length > 0 && <Loader />}
    </>
  );
};

export default Cast;
