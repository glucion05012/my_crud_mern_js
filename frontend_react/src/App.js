import React from 'react';
import { BrowserRouter as  Router, Route, Switch }  from "react-router-dom";

// components/pages DECLARATION
import Home from "./components/home-component";
import NavBar from "./components/navbar-component";
import List from "./components/list-component";
import Update from "./components/edit-component";
import Delete from "./components/delete-component";
import Create from "./components/create-component";

export const dbConnection = "http://localhost:5000/profile/";

function App() {
  return (
      <div className="App">
          <Router>

          {/* Navbar path=components/Navbar.js */}
          <NavBar />

          {/* components/pages ROUTES */}
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/list" component={List} />
            <Route path="/create" component={Create} />
            <Route path="/update/:id" component={Update} />
            <Route path="/delete/:id" component={Delete} />
          </Switch>

      </Router>
      </div>
    );
}

export default App;
