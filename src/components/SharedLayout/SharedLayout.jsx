import { Suspense } from 'react';
import { Outlet, Link } from 'react-router-dom';
import css from './SharedLayout.module.css';
import Loader from 'components/Loader/Loader';

const SharedLayout = () => {
  return (
    <div className={css.container}>
      <nav>
        <ul className={css.navList}>
          <li>
            <Link to="/" className={css.navList__item}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/movies" className={css.navList__item}>
              Movies
            </Link>
          </li>
        </ul>
      </nav>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};
export default SharedLayout;
