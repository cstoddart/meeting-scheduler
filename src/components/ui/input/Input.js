import React from 'react';
import PropTypes from 'prop-types';

import './Input.css';

const Input = (props) => (
  <div className="inputContainer">
    <div>{props.label}</div>
    {props.type === 'textArea' ?
      <textarea name={props.name} value={props.value} onChange={(e) => props.handleChange(e)} />
      : <input type={props.type} name={props.name} value={props.value} onChange={(e) => props.handleChange(e)} />
    }
  </div>
);

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
};

export default Input;
