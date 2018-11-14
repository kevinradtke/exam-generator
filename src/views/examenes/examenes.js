import React, { Component } from "react";
import ExamenForm from './components/examen-form'
import ExamenesList from './components/examenes-list'
import ViewLayout from "../../components/molecules/view-layout";
import { withRouter } from 'react-router-dom'
import api from '../../api.json'
import { database } from "../../config/firebase"

class Examenes extends Component {

//MODEL

  componentDidMount() {
    this.setObserver();
  }

  state = {
    examForm: {
      titulo: "",
      materia: "Matemáticas",
      temas: "",
      npreguntas: ""
    },
    examenes: null,
    // materias: null
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


//CONTROLLER

resetForm = () => {
  this.setState({
    ...this.state,
    examForm: {
      titulo: "",
      materia: "Matemáticas",
      tema: "",
      npreguntas: 0
      }
  })
}

handleSubmit = () => {
  let id = Date.now();
  database
    .ref("/examenes/" + id)
    .update(this.state.examForm)
    .then(status => {
      console.log(status)
      this.resetForm();
    })
    .catch(error => console.log(error))
}

handleDelete = (event, id) => {
  console.log(id)
  database
    .ref("/examenes/" + id).remove()
    .then(status => {
      console.log(status)
      this.resetForm();
    })
    .catch(error => console.log(error))
};

handleChange = (event, id) => {
  let newState = { ...this.state };
  newState.examForm[id] = event.target.value;
  this.setState(newState);
}

handleGenPDF = (event, id) => {
  alert("PDF generado para el examen con id " + id)
}

handleEdit = (event, id) => {
  alert("Edicion de examen con id " + id)
}

//RENDERS VIEW

  render() {


    return (
      <ViewLayout>
        <ExamenForm
          {...this.state.examForm}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          api={api}
        />
        <ExamenesList
          examenes={this.state.examenes}
          handleDelete={this.handleDelete}
          handleGenPDF={this.handleGenPDF}
          handleEdit={this.handleEdit}
        />
      </ViewLayout>
    );
  }
}

export default withRouter(Examenes);
