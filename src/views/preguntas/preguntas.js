import React, { Component } from "react";
import PreguntaForm from "./components/pregunta-form";
import MateriaForm from "./components/materia-form";
import TemaForm from "./components/tema-form";
import PreguntasList from './components/preguntas-list';
//import PreguntasCard from './components/preguntas-card';
import ViewLayout from "../../components/molecules/view-layout";
import { withRouter } from 'react-router-dom'
import api from '../../api.json'
import { database } from "../../config/firebase";
//import {Container, Col} from 'reactstrap';

class Preguntas extends Component {

  //MODEL

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
    open: false,
    // materias: null
  };

  setObserver = () => {
    database
      .ref("/")
      .on("value", snapshot => {
      this.setState({
        ...this.state,
        preguntas: snapshot.val().preguntas,
        // materias: snapshot.val().materias
      })
    });
  }


  //CONTROLLER

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



  handleDelete = (event, id) => {
    database
      .ref("/preguntas/" + id).remove()
      .then(status => {
        console.log(status)
        this.resetForm();
      })
      .catch(error => console.log(error))
  };

  handleEdit = (event, id) => {
    alert("Edicion activada para la pregunta con id " + id)
  };

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

  handleChangeM = () => {
    alert("Materia creada")
  }

  handleDeleteM = () => {
    alert("Materia eliminada")
  }

  handleEditM = () => {
    alert("Materia modificada")
  }

  handleChangeT = () => {
    alert("Tema creado")
  }

  handleDeleteT = () => {
    alert("Tema eliminado")
  }

  handleEditT = () => {
    alert("Tema modificado")
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  //RENDERS VIEW

  render() {
    return (
      <ViewLayout>


        <PreguntaForm
          {...this.state.questionForm}
          handleChange={this.handleChange}
          handleOptionChange={this.handleOptionChange}
          handleSubmit={this.handleSubmit}
          handleClose={this.handleClose}
          handleClickOpen={this.handleClickOpen}

          api={api}
          open={this.state.open}
        />
      <PreguntasList
          preguntas={this.state.preguntas}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
        />

                  <MateriaForm
                    {...this.state.materiaForm}
                    handleChangeM={this.handleChangeM}
                    handleDeleteM={this.handleDeleteM}
                    handleEditM={this.handleEditM}
                    api={api}
                    open={this.state.open}
                  />

                  <TemaForm
                    {...this.state.temaForm}
                    handleChangeT={this.handleChangeT}
                    handleDeleteT={this.handleDeleteT}
                    handleEditT={this.handleEditT}
                    api={api}
                    open={this.state.open}
                  />
    </ViewLayout>
    );
  }
}

export default withRouter(Preguntas);
