import { Container, IconButton, Snackbar, Typography, withStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import React, { Component } from 'react';
import NumberInput from './NumberInput';

const styles = theme => ({
  paper: {
    padding: '1em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  space: {
    margin: '1em',
  },
  list: {
    padding: '0',
    margin: '1em',
    marginTop: '5em',
  }
});

class NumberCollector extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      feedbackMsg: '',
      feedbackOpen: false,
      items: [],
      error: null
    };
  }

  /**
   *
   * @param {*} addedNumber
   * @return {Promise<void>}
   *
   */
  handleOnAdd = (ageA, yearA, ageB, yearB) => {
    let promise = fetch(`${process.env.REACT_APP_BASE_URL}/api/avg-kill-by-witch?ageOfDeathA=${ageA}&yearOfDeathA=${yearA}&ageOfDeathB=${ageB}&yearOfDeathB=${yearB}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            items: result.data,
            feedbackMsg: result.message,
            feedbackOpen: true,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            feedbackMsg: `Failed to retrieve data. ${error}`,
            feedbackOpen: true,
          });
        }
      )

    this.setState({
      items: this.items,
      feedbackMsg: "Request data on process...",
      feedbackOpen: true,
    });

    return promise || Promise.resolve();
  }

  handleClearNumbers = () => {
    this.setState({ items: {} });
    this.setState({
      feedbackMsg: `Cleared the data...`,
      feedbackOpen: true,
    })
  }

  render() {
    const { items, feedbackMsg, feedbackOpen } = this.state;
    const { classes } = this.props;

    return (
      <Container className={classes.paper}>
        <Typography component="p">
          Enter data to find the solution
        </Typography>

        <div className={classes.row}>
          <NumberInput onAdd={this.handleOnAdd} />
          <IconButton
            id="clearNumbersBtn"
            aria-label="clear data"
            onClick={e => this.handleClearNumbers(e)}
          >
            <Delete className={classes.rightIcon} />
          </IconButton>
        </div>
        
        <Table className={classes.list}>
          <TableHead>
            <TableRow>
              <TableCell align="center">Year Killed Person A</TableCell>
              <TableCell align="center">Year Killed Person B</TableCell>
              <TableCell align="center">Average Killed Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">{items && items.yearKilledNumberA}</TableCell>
              <TableCell align="center">{items && items.yearKilledNumberB}</TableCell>
              <TableCell align="center">{items && items.avgYearKilledNumber}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={feedbackOpen}
          autoHideDuration={3000}
          message={<Typography>{feedbackMsg}</Typography>}
        />
      </Container>
    );
  }
}

export default withStyles(styles)(NumberCollector);
