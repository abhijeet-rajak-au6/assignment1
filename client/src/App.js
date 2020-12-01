import React from "react";
import "./App.css";
import { Switch, Redirect, BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
// import RouteProtection from "./components/common/RouteProtection";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import HomePage from './components/pages/HomePage';
import EditUser from "./components/EditUser";
import RouteProtection from './components/common/RouteProtection';

import store from "./redux/store";

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            {/* <RouteProtection exact path="/login" component={Login} />
            <RouteProtection exact path="/register" component={Register} /> */}
            <RouteProtection exact path="/login" component={Login}/>
            <RouteProtection exact path="/register" component={Register}/>
            <RouteProtection exact path="/createUser" component={Register}/>
            <RouteProtection exact path="/homePage" component={HomePage}/>
            <RouteProtection exact path="/editUser/:id" component={EditUser}/>
            <Redirect to="/login"/>
          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
