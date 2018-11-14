import React from "react";
import { Grid, withStyles } from '@material-ui/core';
import PreguntasCard from './preguntas-card'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
});

function PreguntasList(props) {
  return (
    <Grid item xs={12} md={8}>
      {
        props.preguntas && Object.keys(props.preguntas).map((pregunta, id) => (
          <PreguntasCard
            key={id}
            name={props.preguntas[pregunta].name}
            materia={props.preguntas[pregunta].materia}
            tema={props.preguntas[pregunta].tema}
            respuesta={props.preguntas[pregunta].opciones[0]}
            id = {pregunta}
            handleDelete={props.handleDelete}
            handleEdit={props.handleEdit}
          />
        ))
      }
    </Grid>
  );
}

export default withStyles(styles)(PreguntasList);
