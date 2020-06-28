import React, {Fragment} from "react";
import PropTypes from "prop-types";


const Result = (props) => {
  const {type, rightAnswers, mistakes} = props;
  return <section className="result">
    <div className="result__logo">
      <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
    </div>
    {
      type === `success`
        ? <Fragment>
          <h2 className="result__title">Вы настоящий меломан!</h2>
          <p className="result__total">Вы ответили правильно на {rightAnswers} вопросов и совершили {mistakes} ошибки</p>
          <button className="replay" type="button">Сыграть ещё раз</button>
        </Fragment>
        : <Fragment>
          <h2 className="result__title">Какая жалость!</h2>
          <p className="result__total result__total--fail">У вас закончились все попытки. Ничего, повезёт в следующий раз!</p>
          <button className="replay" type="button">Попробовать ещё раз</button>
        </Fragment>
    }


  </section>;
};

Result.propTypes = {
  type: PropTypes.oneOf([`success`, `failed`]).isRequired,
  rightAnswers: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
};

export default Result;
