import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './routes';
import { fetchSessionStorage } from './components/pages/Dashboard/slice/customerAuthSlice';

const App = () => {
  const dispatch = useDispatch();
  const isReady = useSelector(state => state.customerAuth.ready);

  useEffect(() => {
    dispatch(fetchSessionStorage());
  }, []);

  if (!isReady) {
    return <div />;
  }

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
