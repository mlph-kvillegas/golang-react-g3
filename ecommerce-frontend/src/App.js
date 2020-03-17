import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import 'App.css';
import Login from 'components/main/Login';
import Registration from 'components/main/Registration'
import MainScreen from 'components/main/MainScreen'
import RoutePaths from 'constants/RoutePaths'

function App() {
  return (
    <div className="Login-background">
      <Router>
        <Switch>
          <Route path={ RoutePaths.LOGIN } component={Login}></Route>
          <Route path={ RoutePaths.REGISTER } component={Registration}></Route>
          <Route path={ RoutePaths.MAIN } component={MainScreen}></Route>
          <Redirect exact from="/" to="login" />
        </Switch>  
      </Router>
    </div>
  );
}

export default App;
