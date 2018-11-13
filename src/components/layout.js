import React, { Fragment } from 'react';
import AppBar from './templates/app-bar';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: "block"
  },
  content: {
    padding: theme.spacing.unit * 3,
    height: "100%",
    overflow: "auto"
  },
});

function Layout(props) {
  return(
    <Fragment>
      <AppBar />
      <main className={props.classes.content}>
        <div className={props.classes.appBarSpacer} />
        {props.children}
      </main>
  </Fragment>
  )
}

export default withStyles(styles)(Layout);