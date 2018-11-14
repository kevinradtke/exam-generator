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
            Crear Pregunta
          </Typography>

          <form className={classes.form} onSubmit={props.handleSubmit}>

            <TextField
              label="Pregunta"
              className={classes.textField}
              margin="normal"
              onChange={(e) => props.handleChange(e, "name")}
              value={props.name}
            />

            <TextField
              select
              label="Materia"
              className={classes.textField}
              SelectProps={{ native: true }}
              margin="normal"
              onChange={(e) => props.handleChange(e, "materia")}
              value={props.materia}
            >
              {Object.keys(props.api.materias).map((materia, id) => (
                <option key={id} value={materia}>
                  {materia}
                </option>
              ))}
            </TextField>

            <TextField
              select
              label="Tema"
              className={classes.textField}
              SelectProps={{ native: true }}
              margin="normal"
              onChange={(e) => props.handleChange(e, "tema")}
              value={props.tema}
            >
            <option hidden value=""></option>
              {Object.keys(props.api.materias[props.materia]).map((tema, id) => (
                <option key={id} value={props.api.materias[props.materia][tema]}>
                  {props.api.materias[props.materia][tema]}
                </option>
              ))}
            </TextField>

            <TextField
              select
              label="Selecciona cantidad de opciones"
              className={classes.textField}
              SelectProps={{ native: true }}
              margin="normal"
              onChange={(e) => props.handleChange(e, "cantidadDeOpciones")}
              value={props.cantidadDeOpciones}
            >
              {[1, 2, 3, 4].map((materia, id) => (
                <option key={id} value={materia}>
                  {materia}
                </option>
              ))}
            </TextField>

            {
              props.opciones.map((opcion,id) => (
                <TextField
                  key={id}
                  id="simple-start-adornment"
                  className={classes.textField}
                  value={props.opciones[id]}
                  onChange={(e) => props.handleOptionChange(e, id)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">{
                        id === 0 ? 'Resp' :
                          id === 1 ? 'Op.1' :
                            id === 2 ? 'Op.2' : 'Op.3'
                      })</InputAdornment>
                    )
                  }}
                />
              ))
            }

          </form>
        </CardContent>
        <CardActions>
          <Button onClick={props.handleSubmit} fullWidth color="primary" variant="contained" size="small">
            Guardar
          </Button>
          <Button onClick={props.handleClickOpen} fullWidth variant="contained" size="small">
            Info
          </Button>
        </CardActions>


        <Dialog
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"¿Cómo crear preguntas dinámicas?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Para usar las funciones dinamicas: use la tecla # para indicar el nombre de una variable,
              seguido de llaves [ ] en donde pondrá los rangos de esa variable separados por una coma.
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              <b>Ejemplo: </b> #a[1,5]
            </DialogContentText>
            <DialogContentText id="alert-dialog-description">
              <b>Ojo: </b> Las opciones tambien deben utilizar esa variable creada para generar la respuesta correcta.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>


      </Card>
    </Grid>
  );
}

export default withStyles(styles)(PreguntaForm);
