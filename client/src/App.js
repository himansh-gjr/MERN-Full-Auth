import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/RegisterForm";
import AdminPage from "./components/AdminPage";
import NotFound from "./components/common/NotFound";
import Home from "./components/Home";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <main className="container">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/not-found" component={NotFound} />
          {/* <Redirect exact from="/" to="/login" component={AdminPage} /> */}
          <Route exact path="/" component={Home} />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
