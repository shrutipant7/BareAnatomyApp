import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { Switch, Route, Router } from 'react-router-dom';
import { ROUTES } from '../../Configuration/config';

const history = createBrowserHistory()

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Router history={history}>
          <Switch >
            {ROUTES.map((route, i) =>
              <Route key={i} path={route.path} component={route.component} exact={route.exact} />
            )}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;