import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";


class WelcomeScreen extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {errorLimit} = this.props;

    return <section className="welcome">
      <div className="welcome__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
      </div>
      <Link to="/game">
        <button className="welcome__button">
          <span className="visually-hidden">Начать игру</span>
        </button>
      </Link>
      <h2 className="welcome__rules-title">Правила игры</h2>
      <p className="welcome__text">Правила просты:</p>
      <ul className="welcome__rules-list">
        <li>Нужно ответить на все вопросы.</li>
        <li>Можно допустить {errorLimit} ошибки.</li>
      </ul>
      <p className="welcome__text">Удачи!</p>
    </section>;
  }
}

WelcomeScreen.propTypes = {
  errorLimit: PropTypes.number.isRequired,
};

export default WelcomeScreen;
