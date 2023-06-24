import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const APIKEY = '775c071d6bf771d9c27bbbe414ac595c';

const getTrendingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
      params: {
        api_key: APIKEY,
      },
    });

    return await response.data.results;
  } catch (err) {
    console.error(err);
  }
};

const searchMovies = async query => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: APIKEY,
        query,
      },
    });

    return await response.data.results;
  } catch (err) {
    console.error(err);
  }
};

const getMovieDetails = async id => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: {
        api_key: APIKEY,
      },
    });
    return await response.data;
  } catch (err) {
    console.error(err);
  }
};

const getMovieCredits = async id => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}/credits`, {
      params: {
        api_key: APIKEY,
      },
    });

    return await response.data;
  } catch (err) {
    console.error(err);
  }
};

const getMovieReviews = async id => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}/reviews`, {
      params: {
        api_key: APIKEY,
      },
    });
    return await response.data.results;
  } catch (err) {
    console.error(err);
  }
};

const Api = {
  getTrendingMovies,
  searchMovies,
  getMovieDetails,
  getMovieCredits,
  getMovieReviews,
};

export default Api;
