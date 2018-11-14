import React from "react";
import {
  withStyles,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Divider,
  Button,
  CardActions,
} from "@material-ui/core/";
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: 140,
    width: 100,
  },
  card: {
    marginTop: 10,
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});

function PreguntasCard(props) {
  const { classes } = props;

  //ID AQUI
  console.log(props.id)

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="title" color="secondary">
            {props.name}
          </Typography>
          <br />
          <Divider />
          <br />
          <Typography variant="subheading">
            <b>Materia:</b> {props.materia}
          </Typography>
          <Typography variant="subheading">
            <b>Tema:</b> {props.tema}
          </Typography>
          <Typography variant="subheading">
            <b>Respuesta:</b> {props.respuesta}
          </Typography>
          <CardActions>
            <Button fullWidth variant="contained" color="secondary" className={classes.button}>
              Borrar
              <DeleteIcon className={classes.rightIcon} />
            </Button>
            <Button fullWidth variant="contained" className={classes.button}>
              Editar
            </Button>
          </CardActions>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
      />
    </Card>
  );
}

export default withStyles(styles)(PreguntasCard);
