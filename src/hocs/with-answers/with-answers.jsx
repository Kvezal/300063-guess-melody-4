import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import Types from "@types";


const withAnswers = (Component) => {
  class WithAnswers extends PureComponent {
    constructor(props) {
      super(props);

      const {question} = props;
      this.state = {
        answers: question.answers.map(() => false),
      };
    }

    render() {
      const {answers} = this.state;
      return <Component
        {...this.props}
        answers={answers}
        onAnswerChange={(checked, index) => {
          const newAnswers = this.state.answers.slice();
          newAnswers.splice(index, 1, checked);
          this.setState({answers: newAnswers});
        }}
      />;
    }
  }

  WithAnswers.propTypes = {
    question: PropTypes.shape(Types.genreQuestion).isRequired,
  };

  return WithAnswers;
};

export default withAnswers;
