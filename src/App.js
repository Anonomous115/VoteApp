import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom"
import Header from "./components/Header";
import Polls from "./components/Polls";
import SinglePoll from "./components/SinglePoll"

import { db } from "./firebase";
import "./App.css";

export default function App() {
  return (
    <>
    <Header />
    <Router>
        <Switch>
          <Route exact path="/" render={(props) => <Polls {...props}/> } />
          <Route path="/poll/:id" render={(props) => <SinglePoll {...props}/> } />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
    </Router>
    </>
  )
}
