import React from "react";
import PropTypes from "prop-types";

import Result from "@components/result";


const SuccessResult = (props) => {
  const {rightAnswers, mistakes} = props;
  return <Result>
    <h2 className="result__title">Вы настоящий меломан!</h2>
    <p className="result__total">Вы ответили правильно на {rightAnswers} вопросов и совершили {mistakes} ошибки</p>
    <button className="replay" type="button">Сыграть ещё раз</button>
  </Result>;
};

SuccessResult.propTypes = {
  rightAnswers: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
};

export default SuccessResult;