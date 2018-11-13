import React, { Component } from "react";
import PreguntaForm from "./components/pregunta-form";
import ViewLayout from "../../components/molecules/view-layout";
import { withRouter } from 'react-router-dom'
import PreguntasList from './components/preguntas-list';
import api from '../../api.json'
import { database } from "../../config/firebase";

class Preguntas extends Component {
  componentDidMount() {
    this.setObserver();
  }

  state = {
    questionForm: {
      name: "",
      materia: "Matemáticas",
      tema: "",
      cantidadDeOpciones: "1",
      opciones: [""]
    },
    preguntas: null,
    materias: null
  };

  setObserver = () => {
    database
      .ref("/")
      .on("value", snapshot => {
      this.setState({
        ...this.state,
        preguntas: snapshot.val().preguntas,
        materias: snapshot.val().materias
      })
    });
  }

  resetForm = () => {
    this.setState({
      ...this.state,
      questionForm: {
        name: "",
        materia: "Matemáticas",
        tema: "",
        cantidadDeOpciones: "1",
        opciones: [""]
        }
    })
  }

  handleSubmit = () => {
    let id = Date.now();
    database
      .ref("/preguntas/" + id)
      .update(this.state.questionForm)
      .then(status => {
        console.log(status)
        this.resetForm();
      })
      .catch(error => console.log(error))
  }

  handleDelete = (event, pid) => {
    console.log(pid)
  }

  handleOptionChange = (event, id) => {
    let newState = { ...this.state };
    newState.questionForm.opciones[id] = event.target.value;
    this.setState(newState);
  };

  handleChange = (event, id) => {
    let newState = { ...this.state };
    newState.questionForm[id] = event.target.value;
    if (id === "cantidadDeOpciones") {
      let newArray = [];
      for (let i = 0; i < event.target.value; i++) {
        newArray.push("");
      }
      newState.questionForm["opciones"] = newArray;
    }
    this.setState(newState);
  };

  render() {
    return (
      <ViewLayout>
        <PreguntaForm
          {...this.state.questionForm}
          handleChange={this.handleChange}
          handleOptionChange={this.handleOptionChange}
          handleSubmit={this.handleSubmit}
          api={api}
        />
        <PreguntasList
          preguntas={this.state.preguntas}
        />
      </ViewLayout>
    );
  }
}

export default withRouter(Preguntas);
