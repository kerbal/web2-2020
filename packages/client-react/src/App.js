import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './routes';
import { fetchSessionStorage } from './components/pages/Dashboard/slice/customerAuthSlice';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSessionStorage());
  }, []);
  return (
    <div className="App">
      <Router>
        <Switch>
          {routes.map(route => {
            return (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            );
          })}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
