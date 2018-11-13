import React, { Component } from "react";
import "./App.css";
import Layout from "./components/layout";
import Preguntas from "./views/preguntas/preguntas";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Examenes from "./views/examenes/examenes";

class App extends Component {
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route path="/preguntas" component={Preguntas} />
            <Route path="/examenes" component={Examenes} />
            <Redirect to="/examenes" />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;
