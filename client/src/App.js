import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Navbar from "./components/Navbar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/RegisterForm";
import AdminPage from "./components/AdminPage";
import NotFound from "./components/common/NotFound";
import Home from "./components/Home";
import Logout from "./components/common/Logout";
import "./App.css";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      setUser(user);
    } catch {}
  }, []);

  return (
    <React.Fragment>
      <Navbar user={user} />
      <main className="container">
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={RegisterForm} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/not-found" component={NotFound} />
          <Route exact path="/" component={Home} />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
