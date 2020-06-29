import React from "react";
import PropTypes from "prop-types";


const Result = (props) => {
  const {children} = props;
  return <section className="result">
    <div className="result__logo">
      <img
        src="img/melody-logo.png"
        alt="Угадай мелодию"
        width="186"
        height="83"
      />
    </div>
    {children}
  </section>;
};

Result.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Result;
