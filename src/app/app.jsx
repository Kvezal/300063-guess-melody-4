import React from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";

import WelcomeScreen from "@app/welcome-screen";
import GameScreen from "@app/game-screen";


const App = (props) => {
  const {errorLimit} = props;

  return <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <WelcomeScreen errorLimit={errorLimit}/>
      </Route>
      <Route exact path="/game">
        <GameScreen/>
      </Route>
    </Switch>
  </BrowserRouter>;
};

App.propTypes = {
  errorLimit: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  errorLimit: state.errorLimit,
});

export {App};
export default connect(mapStateToProps, null)(App);
