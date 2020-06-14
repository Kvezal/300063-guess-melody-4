import PropTypes from "prop-types";


const welcomeScreenModel = {
  errorLimit: PropTypes.number.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
};

export default welcomeScreenModel;
