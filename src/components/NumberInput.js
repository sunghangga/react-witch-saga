import {
  Input,
  Typography,
  withStyles,
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React from 'react';

const styles = theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  button: {
    display: 'flex',
  }
});

class NumberInput extends React.Component {
  static propTypes = {
    onAdd: PropTypes.func,
  };

  static defaultProps = {
    onAdd: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      ageA: '',
      errorsAgeA: {
        number: false,
      },
      yearA: '',
      errorsYearA: {
        number: false,
      },
      ageB: '',
      errorsAgeB: {
        number: false,
      },
      yearB: '',
      errorsYearB: {
        number: false,
      },
    };
  }

  /**
   * @returns boolean
   */
  get isStateValid() {
    if (this.state.ageA && !this.state.errorsAgeA.number &&
      this.state.yearA && !this.state.errorsYearA.number &&
      this.state.ageB && !this.state.errorsAgeB.number &&
      this.state.yearB && !this.state.errorsYearB.number) {
        return true;
    }
    else {
      return false;
    }
  }

  /**
   * Bound to the onChange of the number input
   * @param {Event} event
   */
  handleInputChangeAgeA = (event) => {
    const value = event.target.value;
    const isNumber = !Number.isNaN(Number(value));

    this.setState({
      ageA: value,
      errorsAgeA: {
        number: !isNumber,
      },
    });
  }
  handleInputChangeYearA = (event) => {
    const value = event.target.value;
    const isNumber = !Number.isNaN(Number(value));

    this.setState({
      yearA: value,
      errorsYearA: {
        number: !isNumber,
      },
    });
  }
  handleInputChangeAgeB = (event) => {
    const value = event.target.value;
    const isNumber = !Number.isNaN(Number(value));

    this.setState({
      ageB: value,
      errorsAgeB: {
        number: !isNumber,
      },
    });
  }
  handleInputChangeYearB = (event) => {
    const value = event.target.value;
    const isNumber = !Number.isNaN(Number(value));

    this.setState({
      yearB: value,
      errorsYearB: {
        number: !isNumber,
      },
    });
  }

  /**
   * Bound to the onClick of the button and onSubmit
   * @param {*} event
   */
  handleAddNumber = (event) => {
    event.preventDefault();
    if (this.isStateValid) {
      this.props.onAdd(
        this.state.ageA,
        this.state.yearA,
        this.state.ageB,
        this.state.yearB);
      this.setState({ 
        ageA: '',
        yearA: '',
        ageB: '',
        yearB: ''
      });
    }
  }

  render() {
    const { ageA, errorsAgeA } = this.state;
    const { yearA, errorsYearA } = this.state;
    const { ageB, errorsAgeB } = this.state;
    const { yearB, errorsYearB } = this.state;
    const valid = this.isStateValid;
    return (
      <form className={this.props.classes.root} onSubmit={e => this.handleAddNumber(e)} noValidate>
        <FormControl>
          <InputLabel htmlFor="input-age-a">Enter Age of Death A</InputLabel>
          <Input
            id="input-age-a"
            aria-label="Age of Death A"
            value={ageA}
            onChange={e => this.handleInputChangeAgeA(e)}
          />
          {errorsAgeA && errorsAgeA.number && (
            <Typography color="error">Please enter a number</Typography>
          )}
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="input-year-a">Enter Year of Death A</InputLabel>
          <Input
            id="input-year-a"
            aria-label="Year of Death A"
            value={yearA}
            onChange={e => this.handleInputChangeYearA(e)}
          />
          {errorsYearA && errorsYearA.number && (
            <Typography color="error">Please enter a number</Typography>
          )}
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="input-age-b">Enter Age of Death B</InputLabel>
          <Input
            id="input-age-b"
            aria-label="Age of Death B"
            value={ageB}
            onChange={e => this.handleInputChangeAgeB(e)}
          />
          {errorsAgeB && errorsAgeB.number && (
            <Typography color="error">Please enter a number</Typography>
          )}
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="input-year-b">Enter Year of Death B</InputLabel>
          <Input
            id="input-year-b"
            aria-label="Year of Death B"
            value={yearB}
            onChange={e => this.handleInputChangeYearB(e)}
          />
          {errorsYearB && errorsYearB.number && (
            <Typography color="error">Please enter a number</Typography>
          )}
        </FormControl>
        <Button className={this.props.classes.button}
          disabled={!valid}
          type="submit" 
          variant="contained" 
          color="primary">
          Submit
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(NumberInput);
