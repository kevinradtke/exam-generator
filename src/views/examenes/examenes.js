import React, { Component } from "react";
import ExamenForm from './components/examen-form'
import ExamenesList from './components/examenes-list'
import ViewLayout from "../../components/molecules/view-layout";
import { withRouter } from 'react-router-dom'
import api from '../../api.json'
import { database } from "../../config/firebase"

class Examenes extends Component {

  componentDidMount() {
    this.setObserver();
  }

  state = {
    examForm: {
      titulo: "",
      materias: "Matemáticas",
      temas: "",
      nPreguntas: ""
    },
    examenes: null,
    materias: null
  }

  setObserver = () => {
    database
      .ref("/")
      .on("value", snapshot => {
      this.setState({
        ...this.state,
        examenes: snapshot.val().examenes,
      })
    });
  }

  render() {
    return (
      <ViewLayout>
        <ExamenForm
          {...this.state.examForm}
        />
        <ExamenesList
          examenes={this.state.examenes}
        />
      </ViewLayout>
    );
  }
}

export default withRouter(Examenes);
