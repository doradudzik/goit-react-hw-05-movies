import { FallingLines } from 'react-loader-spinner';
import css from './Loader.module.css';
import PropTypes from 'prop-types';

const Loader = ({ isLoading }) => {
  return (
    <div className={css.loaderBox}>
      <FallingLines
        color="#ffffff"
        width="100"
        visible={isLoading}
        ariaLabel="falling-lines-loading"
      />
    </div>
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool,
};
export default Loader;
