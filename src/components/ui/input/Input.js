import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => (
  <div className="inputContainer">
    <div>{props.name}</div>
    <input type="text" name={props.name} value={props.input.value} onChange={(e) => props.handleChange(e)} />
  </div>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }),
  handleChange: PropTypes.func.isRequired,
};

export default Input;
