import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faArrowRight, faArrowLeft, faEye, faDice } from '@fortawesome/free-solid-svg-icons';

import words from 'js/resources/words.json';
import './style.scss';

export class Application extends React.Component {
  state = {
    show: false,
    index: 0,
  }

  onVolumeClick = () => {
    const utterance = new SpeechSynthesisUtterance(words[this.state.index]);
    const voice = speechSynthesis
      .getVoices()
      .find(voice => voice.lang.includes('ja'));

    utterance.voice = voice;
    utterance.lang = voice.lang;
    speechSynthesis.speak(utterance);
  }

  onShow = () => {
    this.setState({ show: !this.state.show });
  }

  onPrevious = () => {
    let index = this.state.index - 1;

    if (index < 0) {
      index = words.length - 1;
    }

    this.setState({ show: false, index});
  }

  onNext = () => {
    this.setState({ show: false, index: (this.state.index + 1) % words.length });
  }

  onRandom = () => {
    this.setState({ show: false, index: Math.floor(Math.random() * words.length) });
  }

  render() {
    const content = this.state.show ?  words[this.state.index] : '?';

    return (
      <div styleName='root'>
        <span styleName='text'>
          {content}
        </span>
        <span>
          {this.state.index}
        </span>
        <button styleName='button' onClick={this.onShow}>
          <FontAwesomeIcon icon={faEye} />
        </button>
        <button styleName='button' onClick={this.onVolumeClick}>
          <FontAwesomeIcon icon={faVolumeUp} />
        </button>
        <button styleName='button' onClick={this.onPrevious}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <button styleName='button' onClick={this.onNext}>
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
        <button styleName='button next' onClick={this.onRandom}>
          <FontAwesomeIcon icon={faDice} />
        </button>
      </div>
    );
  }
}
