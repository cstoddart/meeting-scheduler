import React from 'react';
import PropTypes from 'prop-types';

import './Input.css';

const Input = (props) => (
  <div className="inputContainer">
    <div>{props.label}</div>
    {props.type === 'textArea' ?
      <textarea name={props.name} value={props.value} onChange={props.handleChange} />
      : <input type={props.type} name={props.name} value={props.value} onChange={props.handleChange} />
    }
  </div>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Input;
