import { withStyles } from '@material-ui/core';
import React from 'react';

import NumberCollector from './components/NumberCollector';

const styles = theme => ({
  column: {
    margin: '1em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

function App(props) {
  const { classes } = props;
  return (
    <div className={classes.column}>
      <NumberCollector />
    </div>
  );
}

export default withStyles(styles)(App);
