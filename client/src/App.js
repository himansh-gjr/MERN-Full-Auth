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
import ProfileUpdateForm from "./components/ProfileUpdateForm";
import "./App.css";
import axios from "axios";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      setUser(user);
      axios.defaults.headers.common["x-auth-token"] = jwt;
    } catch {}
  }, []);

  return (
    <React.Fragment>
      <Navbar user={user} />
      <main className="container">
        <Switch>
          <Route
            path="/login"
            render={(props) => {
              if (user) return <Redirect to="/" />;
              return <LoginForm />;
            }}
          />
          <Route
            path="/register"
            render={(props) => {
              if (user) return <Redirect to="/" />;
              return <RegisterForm />;
            }}
          />
          <Route
            path="/profile/update"
            render={(props) => {
              if (!user) return <Redirect to="/login" />;
              return <ProfileUpdateForm user={user} />;
            }}
          />
          <Route
            path="/admin"
            render={(props) => {
              if (!user) return <Redirect to="/login" />;
              if (user.isAdmin) return <AdminPage />;
              return <Redirect to="/" />;
            }}
          />
          <Route
            path="/logout"
            render={(props) => {
              if (!user) return <Redirect to="/login" />;
              return <Logout />;
            }}
          />
          <Route path="/not-found" component={NotFound} />
          <Route exact path="/" component={Home} />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
