import PropTypes from "prop-types";

import artistQuestion from "./artist-question.type";
import genreQuestion from "./genre-question.type";


const question = PropTypes.oneOfType([
  PropTypes.shape(artistQuestion),
  PropTypes.shape(genreQuestion),
]);

export default question;
