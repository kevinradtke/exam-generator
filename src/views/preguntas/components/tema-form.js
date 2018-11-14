import React from "react";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  withStyles,
  Grid,
  TextField,
  InputAdornment
} from "@material-ui/core";

import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  pos: {
    marginBottom: 12
  },
  form: {
    width: "100%"
  },
  textField: {
    width: "100%"
  }
};

function PreguntaForm(props) {
  const { classes } = props;
  return (
    <Grid item xs={12} md={4}>
      <Card className={classes.card}>
        <CardContent>

          <Typography
            color="primary"
            gutterBottom
            variant="title"
            component="h1"
          >
            Crear Tema
          </Typography>

          <form className={classes.form} onSubmit={props.handleSubmit}>


            <TextField
              select
              label="Materia"
              className={classes.textField}
              SelectProps={{ native: true }}
              margin="normal"
            >
              {Object.keys(props.api.materias).map((materia, id) => (
                <option key={id} >
                  {materia}
                </option>
              ))}
            </TextField>

            <TextField
              label="Nombre de tema"
              className={classes.textField}
              margin="normal"
            />


          </form>
        </CardContent>
        <CardActions>
          <Button onClick={props.handleChangeT} fullWidth color="primary" variant="contained" size="small">
            Guardar
          </Button>

        </CardActions>

        <CardContent>

          <Typography
            color="primary"
            gutterBottom
            variant="title"
            component="h1"
          >
            Modificar Tema
          </Typography>

          <form className={classes.form} onSubmit={props.handleSubmit}>


          <TextField
            select
            label="Materia"
            className={classes.textField}
            SelectProps={{ native: true }}
            margin="normal"
            value={props.materia}
          >
            {Object.keys(props.api.materias).map((materia, id) => (
              <option key={id} value={materia}>
                {materia}
              </option>
            ))}
          </TextField>

<<<<<<< HEAD
=======
        { /* <TextField
            select
            label="Tema"
            className={classes.textField}
            SelectProps={{ native: true }}
            margin="normal"
            value={props.tema}
          >
          <option hidden value=""></option>
            {Object.keys(props.api.materias[props.materia]).map((tema, id) => (
              <option key={id} value={props.api.materias[props.materia][tema]}>
                {props.api.materias[props.materia][tema]}
              </option>
            ))}
          </TextField> */}
>>>>>>> 8227f064396c7ebfba0e5b15a668e02718bb0a7b




          </form>
        </CardContent>
        <CardActions>
<<<<<<< HEAD
        <Button  fullWidth variant="contained" color="secondary" className={classes.button}>
          Borrar
          <DeleteIcon className={classes.rightIcon} />
        </Button>
        <Button  fullWidth variant="contained" className={classes.button}>
=======
        <Button  onClick={props.handleDeleteT} fullWidth variant="contained" color="secondary" className={classes.button}>
          Borrar
          <DeleteIcon className={classes.rightIcon} />
        </Button>
        <Button  onClick={props.handleEditT} fullWidth variant="contained" className={classes.button}>
>>>>>>> 8227f064396c7ebfba0e5b15a668e02718bb0a7b
          Editar
        </Button>

        </CardActions>


      </Card>

    </Grid>
  );
}

export default withStyles(styles)(PreguntaForm);
