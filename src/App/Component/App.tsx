import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';
import { ROUTES } from '../Routes/route';

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Router history={history}>
          <Switch >
            {ROUTES.map((route, i) =>
              <Route key={i} path={route.path} component={route.component} exact={true} />
            )}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;