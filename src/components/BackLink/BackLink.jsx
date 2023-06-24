import { Link } from 'react-router-dom';
import css from './BackLink.module.css';

export const BackLink = ({ to, children }) => {
  return (
    <button className={css.backBtn}>
      <Link to={to}>{children}</Link>
    </button>
  );
};
