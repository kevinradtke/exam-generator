import React, {Component, PropTypes} from 'react';

// download html2canvas and jsPDF and save the files in app/ext, or somewhere else
// the built versions are directly consumable
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf'


export default class Export extends Component {

  constructor(props) {
    super(props);
    console.log(props.examenes)
  }

  printDocument() {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
  }

  render() {
    return (
      <div>
      <div className="mb5">
        <button onClick={this.printDocument}>Print</button>
      </div>

      <div id="divToPrint" className="mt4">
        <h4>Examen de Matematicas I </h4>
        <h5>Tema: Restas</h5>
        <div>Nombre del alumno: _________________________</div>
      </div>
    </div>);
  }
}
