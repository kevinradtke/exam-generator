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
      nversiones: ""
    },
    examenes: null,
    preguntas: null,
    materias: null,

    //ESTADO PARA GENERAR PDFS
    pdf: {
      titulo: "Examen Final",
      materia: "Matemáticas",
      tema: "Restas",
      preguntas: "",
      nversiones: 0
    }

  }

  setObserver = () => {
    database
      .ref("/")
      .on("value", snapshot => {
      this.setState({
        ...this.state,
        examenes: snapshot.val().examenes,
        preguntas: snapshot.val().preguntas,
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
  let pdfInfo = ""
  let pdfPreguntas = []
  this.state.examenes && Object.keys(this.state.examenes).map((examen, index) => (
    (id === examen) && (pdfInfo = this.state.examenes[examen])
  ))

  this.state.preguntas && Object.keys(this.state.preguntas).map((preg, index) => (
    (this.state.preguntas[preg].tema === pdfInfo.tema) &&
    ( pdfPreguntas.push(this.state.preguntas[preg]))
  ))

  console.log(pdfPreguntas)

  this.setState({
    ...this.state,
    pdf: {
      titulo: pdfInfo.titulo,
      materia: pdfInfo.materia,
      nversiones: pdfInfo.nversiones,
      tema: pdfInfo.tema,
      preguntas: pdfPreguntas
      }
  })

  document.getElementById('toPrint').style.color = 'black'
  document.getElementById('toPrintA').style.color = 'black'
  this.printDocument()
  alert("PDF generado para el examen con id " + id)
}

handleEdit = (event, id) => {
  alert("Edicion de examen con id " + id)
}

printDocument = () =>  {

  // for (var i =0; i<this.state.pdf.nversiones; i++){
    let input = document.getElementById('toPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save(this.state.pdf.titulo+".pdf");
      }
    )
  // }
  input = document.getElementById('toPrintA');
  html2canvas(input)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      // pdf.output('dataurlnewwindow');
      pdf.save("Respuestas "+ this.state.pdf.titulo +".pdf");
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


            {this.state.pdf.preguntas && Object.keys(this.state.pdf.preguntas).map((pregunta,id) => (
              <p>
              {id+1}. {this.state.pdf.preguntas[pregunta].name} <br></br>
              {
                (this.state.pdf.preguntas[pregunta].opciones).map((opcion, oid) =>
                <p>
                {oid===0 ? "a" :
                  oid===1 ? "b" :
                    oid===2 ? "c": "d"}) {this.state.pdf.preguntas[pregunta].opciones[oid]}
                </p>)
              }
              </p>
            ))}

        </div>

        <div id="toPrintA" className="toPrint">
          <p> {this.state.pdf.titulo} </p>
          <p>Materia: {this.state.pdf.materia} / Tema: {this.state.pdf.tema}</p>
          <p>Hoja de Respuestas</p>

            {this.state.pdf.preguntas && Object.keys(this.state.pdf.preguntas).map((pregunta,id) => (
              <p>
              {id+1}. {this.state.pdf.preguntas[pregunta].name} <br></br>
              {
                <p>
                 Respuesta: {this.state.pdf.preguntas[pregunta].opciones[0]}
                </p>
              }
              </p>
            ))}

        </div>

      </ViewLayout>
    );
  }
}

export default withRouter(Examenes);
