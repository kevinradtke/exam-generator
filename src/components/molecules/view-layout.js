import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

function ViewLayout(props){
  const { classes } = props;
  return(
    <Grid container className={classes.root} spacing={16}>
      {props.children}
    </Grid>
  )
}

export default withStyles(styles)(ViewLayout);
