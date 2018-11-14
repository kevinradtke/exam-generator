import React, { Component } from "react";
import ExamenForm from './components/examen-form'
import ExamenesList from './components/examenes-list'
import ViewLayout from "../../components/molecules/view-layout";
import { withRouter } from 'react-router-dom'
import api from '../../api.json'
import { database } from "../../config/firebase"
import ExportPDF from '../../components/export';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'

class Examenes extends Component {

//MODEL

  componentDidMount() {
    this.setObserver();
  }

  state = {
    examForm: {
      titulo: "",
      materia: "Matemáticas",
      tema: "",
      npreguntas: "",
      npreguntas: "",
      nversiones: ""
    },
    examenes: null,
    materias: null,

    //ESTADO PARA GENERAR PDFS
    pdf: {
      titulo: "Examen Final",
      materia: "Matemáticas",
      tema: "Restas",
      preguntas:[
        {
          name: "¿5-3?",
          opciones: ["2","4","6"]
        },
        {
          name: "¿20-5?",
          opciones: ["15", "16"]
        }
      ]
    }

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
      npreguntas: 0,
      nversiones: 0
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
  document.getElementById('toPrint').style.display = 'run-in'
  alert("PDF generado para el examen con id " + id)
  this.printDocument()
}

handleEdit = (event, id) => {
  alert("Edicion de examen con id " + id)
}

printDocument = () =>  {
  const input = document.getElementById('toPrint');
  html2canvas(input)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("download.pdf");
    })
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

          <div id="toPrint" className="toPrint">
            <p> {this.state.pdf.titulo} </p>
            <p>Materia: {this.state.pdf.materia} / Tema: {this.state.pdf.tema}</p>
            <p>Nombre del alumno: ______________________________</p>

            {this.state.pdf.preguntas && (this.state.pdf.preguntas).map((pregunta,id) => (
              <p>
              {id+1}. {pregunta.name} <br></br>
              </p>
            ))}
          </div>


      </ViewLayout>
    );
  }
}

export default withRouter(Examenes);
