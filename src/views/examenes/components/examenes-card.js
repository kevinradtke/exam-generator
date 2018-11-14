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
import ExportPDF from '../../../components/export';

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

function ExamenesCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="title" color="secondary">
            {props.titulo}
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
            <b>Numero de preguntas:</b> {props.npreguntas}
          </Typography>
          <Typography variant="subheading">
            <b>Numero de versiones:</b> {props.nversiones}
          </Typography>
          <CardActions>
            <Button onClick={(e) => props.handleDelete(e, props.id)} fullWidth variant="contained" color="secondary" className={classes.button}>
              Borrar
              <DeleteIcon className={classes.rightIcon} />
            </Button>
            <Button onClick={(e) => props.handleEdit(e, props.id)} fullWidth variant="contained" className={classes.button}>
              Editar
            </Button>
            <Button onClick={(e) => props.handleGenPDF(e, props.id)} fullWidth variant="contained" color="primary" className={classes.button}>
              Generar PDF
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

export default withStyles(styles)(ExamenesCard);
