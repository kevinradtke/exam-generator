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
import DeleteIcon from '@material-ui/icons/Delete';

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

function MateriaForm(props) {
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
            Crear Materia
          </Typography>

          <form className={classes.form} onSubmit={props.handleSubmit}>

            <TextField
              label="Materia"
              className={classes.textField}
              margin="normal"

            />

          </form>
        </CardContent>
        <CardActions>
<<<<<<< HEAD
          <Button  fullWidth color="primary" variant="contained" size="small">
=======
          <Button  onClick={props.handleChangeM} fullWidth color="primary" variant="contained" size="small">
>>>>>>> 8227f064396c7ebfba0e5b15a668e02718bb0a7b
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
              Modificar Materia
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





            </form>
          </CardContent>
          <CardActions>

          <Button  fullWidth variant="contained" color="secondary" className={classes.button}>
            Borrar
            <DeleteIcon className={classes.rightIcon} />
          </Button>
          <Button  fullWidth variant="contained" className={classes.button}>

          <Button onClick={props.handleDeleteM} fullWidth variant="contained" color="secondary" className={classes.button}>
            Borrar
            <DeleteIcon className={classes.rightIcon} />
          </Button>
          <Button onClick={props.handleEditM} fullWidth variant="contained" className={classes.button}>

                    Editar
          </Button>

          </CardActions>


      </Card>
    </Grid>
  );
}

export default withStyles(styles)(MateriaForm);
