import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Landing from "./landing/Landing";
import Dashboard from "./dashboard/Dashboard"
import './App.css';
import Register from './auth/Register';
import Login from './auth/Login';
import PrivateRoute from './routing/PrivateRoute';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import Alerts from './common/alert/Alerts';
import SideNav from './sideNav/SideNav';
import BookState from './context/book/BookState';

function App(props) {
  console.log(props)
  return (
    <AlertState>
      <AuthState>
        <BookState>
          <div className="App">
          <Alerts />
            <Router>
              <Switch>
                {/* <PrivateRoute exact path="/dashboard" component={SideNav} /> */}
                <PrivateRoute exact path="/dashboard" component={SideNav} />
                <PrivateRoute exact path="/viewInventories" component={SideNav} />
                <PrivateRoute exact path="/addInventory" component={SideNav} />
                <PrivateRoute exact path="/viewInventories/:id" component={SideNav} />
                <Route exact path="/" component={Landing} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </Router >
          </div>
        </BookState>
      </AuthState>
    </AlertState>
  );
}

export default App;
