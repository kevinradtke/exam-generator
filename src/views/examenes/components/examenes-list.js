import React from "react";
import { Grid, withStyles } from '@material-ui/core';
import ExamenesCard from './examenes-card'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
});

function ExamenesList(props) {
  const { classes } = props;
  return (
    <Grid item xs={12} md={8}>
      {
        props.examenes && Object.keys(props.examenes).map((examen, id) => (
          <ExamenesCard
            key={id}
            titulo={props.examenes[examen].titulo}
            materia={props.examenes[examen].materia}
            tema={props.examenes[examen].tema}
            npreguntas={props.examenes[examen].npreguntas}
          />
        ))
      }
    </Grid>
  );
}

export default withStyles(styles)(ExamenesList);
