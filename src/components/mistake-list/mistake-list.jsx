import React from "react";
import PropTypes from "prop-types";


const MistakeList = (props) => {
  const {mistakes} = props;
  const mistakeMarkupList = [];
  for (let index = 0; index < mistakes; index++) {
    mistakeMarkupList.push(<div key={index} className="wrong" />);
  }
  return <div className="game__mistakes">
    {mistakeMarkupList}
  </div>;
};

MistakeList.propTypes = {
  mistakes: PropTypes.number.isRequired,
};

export default MistakeList;
