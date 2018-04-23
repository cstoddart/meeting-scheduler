import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Input from '../input/Input';
import TextArea from '../textArea/TextArea';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: this.props.inputs,
    };
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const inputs = this.state.inputs;
    inputs[name].value = value;
    this.setState({
      inputs,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleSubmit(this.state.inputs);
  }

  render() {
    return (
      <div className="form">
        <h1>FORM</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          {Object.keys(this.props.inputs).map((inputName) => {
            if (this.state.inputs[inputName].type === 'textarea') {
              return <TextArea key={inputName} name={inputName} input={this.state.inputs[inputName]} handleChange={(e) => this.handleChange(e)} />;
            }
            return <Input key={inputName} name={inputName} input={this.state.inputs[inputName]} handleChange={(e) => this.handleChange(e)} />;
          })}
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  inputs: PropTypes.shape({
    value: PropTypes.string, // eslint-disable-line
    type: PropTypes.oneOf(['text', 'textarea']), // eslint-disable-line
  }),
  handleSubmit: PropTypes.func,
};

export default Form;
