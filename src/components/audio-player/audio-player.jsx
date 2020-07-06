import React, {PureComponent, Fragment, createRef} from "react";
import PropTypes from "prop-types";


class AudioPlayer extends PureComponent {
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

  render() {
    const {isPlaying, onPlayButtonClick} = this.props;
    return <Fragment>
      <button
        className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
        type="button"
        onClick={onPlayButtonClick}
      />
      <div className="track__status">
        <audio ref={this._audioRef}/>
      </div>
    </Fragment>;
  }

  componentDidUpdate() {
    const {isPlaying} = this.props;
    const audio = this._audioRef.current;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
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

AudioPlayer.propTypes = {
  source: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired,
};

export default AudioPlayer;
