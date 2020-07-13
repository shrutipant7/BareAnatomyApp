import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { Route, Router } from 'react-router-dom';
import Intro from '../../IntroPage/Container/cont';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Router history={history}>
          <Route path={'/home'} component={Intro} exact={true} />
        </Router>
      </div>
    );
  }
}

export default App;