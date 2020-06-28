import PropTypes from "prop-types";


const artistQuestion = {
  type: PropTypes.oneOf([`artist`]).isRequired,
  song: PropTypes.shape({
    src: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
  }),
  answers: PropTypes.arrayOf(
      PropTypes.shape({
        picture: PropTypes.string.isRequired,
        artist: PropTypes.string.isRequired,
      })
  ),
};

export default artistQuestion;
