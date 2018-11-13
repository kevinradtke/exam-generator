import React, { Component } from "react";
import ViewLayout from "../../components/molecules/view-layout";
import { withRouter } from 'react-router-dom'
import ExamenForm from './components/examen-form'
import ExamenesList from './components/examenes-list'
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
  }

  setObserver = () => {
    database
      .ref("/")
      .on("value", snapshot => {
      this.setState({
        ...this.state,
        examenes: snapshot.val().examenes,
      })
      console.log(this.state.examenes)
    });
  }

  render() {
    console.log(this.state.examenes)
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
