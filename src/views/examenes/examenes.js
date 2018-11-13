import React, { Component } from "react";
import ViewLayout from "../../components/molecules/view-layout";
import { withRouter } from 'react-router-dom'
import ExamenForm from './components/examen-form'

class Examenes extends Component {
  state = {
    examForm: {
      titulo: "",
      materias: "Matemáticas",
      temas: "",
      nPreguntas: ""
    }
  }

  render() {
    return (
      <ViewLayout>
        <ExamenForm 
          {...this.state.examForm}
        />
      </ViewLayout>
    );
  }
}

export default withRouter(Examenes);
