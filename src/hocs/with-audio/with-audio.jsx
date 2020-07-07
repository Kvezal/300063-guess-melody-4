import React, {createRef, PureComponent} from "react";
import PropTypes from "prop-types";


const withAudio = (Component) => {
  class WithAudio extends PureComponent {

    constructor(props) {
      super(props);

      this._audioRef = createRef();

      this.state = {
        isLoading: true,
        isPlaying: props.isPlaying,
        progress: 0,
      };
    }

    componentDidMount() {
      const {source} = this.props;
      const audio = this._audioRef.current;

      audio.src = source;

      audio.oncanplaythrough = () => this.setState({
        isLoading: false,
      });

      audio.onplay = () => this.setState({
        isPlaying: true,
      });

      audio.onpause = () => this.setState({
        isPlaying: false,
      });

      audio.ontimeupdate = () => this.setState({
        progress: Math.floor(audio.currentTime),
      });
    }

    componentDidUpdate() {
      const {isPlaying} = this.state;
      const audio = this._audioRef.current;

      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    render() {
      const {isLoading, isPlaying} = this.state;
      const {onPlayButtonClick} = this.props;

      return <Component
        {...this.props}
        isLoading={isLoading}
        isPlaying={isPlaying}
        onPlayButtonClick={() => {
          this.setState({isPlaying: !isPlaying});
          onPlayButtonClick();
        }}
      >
        <audio ref={this._audioRef}/>
      </Component>;
    }

    componentWillUnmount() {
      const audio = this._audioRef.current;

      audio.oncanplaythrough = null;
      audio.onplay = null;
      audio.onpause = null;
      audio.ontimeupdate = null;
      audio.src = ``;
    }
  }

  WithAudio.propTypes = {
    source: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    onPlayButtonClick: PropTypes.func.isRequired,
  };

  return WithAudio;
};

export default withAudio;
