import React from "react";
import { Switch, Route } from "react-router-dom";
import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import CreateItem from "./pages/CreateItem";
import EditItem from "./pages/EditItem";
import FormProfile from "./components/Forms/FormProfile";

function App() {
  return (
    <div className="App">
      <NavMain />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/items/create" component={CreateItem} />
        <Route exact path="/items/:id" component={EditItem} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <ProtectedRoute  exact path="/profile/settings" component={FormProfile}/>
      </Switch>
    </div>
  );
}

export default App;
