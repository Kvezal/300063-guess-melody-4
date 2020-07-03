import React from "react";
import PropTypes from "prop-types";

import Result from "@components/result";


const FailedResult = (props) => {
  const {onResetLinkClick} = props;
  return <Result>
    <h2 className="result__title">Какая жалость!</h2>
    <p className="result__total result__total--fail">У вас закончились все попытки. Ничего, повезёт в следующий раз!</p>
    <button
      className="replay"
      type="button"
      onClick={onResetLinkClick}
    >Попробовать ещё раз</button>
  </Result>;
};

FailedResult.propTypes = {
  onResetLinkClick: PropTypes.func.isRequired,
};

export default FailedResult;
