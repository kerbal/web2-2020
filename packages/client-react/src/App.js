import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import routes from './routes';
import './App.css';

const generateRoutes = (routes) => {
  var result = null;
  if (routes.length > 0) {
    result = routes.map((route, index) => {
      return (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.main}
        />
      );
    });
  }
  return result;
}

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {generateRoutes(routes)}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
