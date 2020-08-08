import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import routes from './routes';
import { fetchSessionStorage } from './components/pages/Dashboard/slice/customerAuthSlice';
import * as adminAuthActions from './components/pages/Admin/slice/adminAuthSlice';

const App = () => {
  const dispatch = useDispatch();
  const isReady = useSelector(state => state.customerAuth.ready);

  useEffect(() => {
    dispatch(fetchSessionStorage());
    dispatch(adminAuthActions.fetchSessionStorage());
  }, [dispatch]);

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
          <Redirect from="*" to="/404" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
