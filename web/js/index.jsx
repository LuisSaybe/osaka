import React from 'react';
import ReactDOM from 'react-dom';

import { Application } from 'js/application';

speechSynthesis.getVoices()

ReactDOM.render(<Application />, document.querySelector('body > div'));
