import PropTypes from "prop-types";


const genreQuestion = {
  type: PropTypes.oneOf([`genre`]).isRequired,
  genre: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
      })
  ),
};

export default genreQuestion;
