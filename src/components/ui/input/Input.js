import React from 'react';
import PropTypes from 'prop-types';

import { alphabetize } from '../../../helpers';
import './Input.css';

const Input = (props) => (
  <div className="inputContainer">
    <div>{props.label}</div>
    {props.type === 'text' &&
      <input type="text" name={props.name} value={props.value} onChange={(e) => props.handleChange(e)} />
    }
    {props.type === 'textArea' &&
      <textarea name={props.name} value={props.value} onChange={(e) => props.handleChange(e)} />
    }
    {props.type === 'dropdown' &&
      <select name={props.name} onChange={(e) => props.handleChange(e)} defaultValue={props.defaultValue}>
        {alphabetize(props.value).map((option) => (
          <option key={option} value={option}>{option}</option>
        ))
        }
      </select>
    }
    {props.type === 'date' &&
      <input type="date" name={props.name} value={props.value} onChange={(e) => props.handleChange(e)} />
    }
    {props.type === 'time' &&
      <input type="time" name={props.name} value={props.value} onChange={(e) => props.handleChange(e)} />
    }
  </div>
);

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(['text', 'textArea', 'dropdown', 'date', 'time']).isRequired,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  handleChange: PropTypes.func,
  defaultValue: PropTypes.string,
};

export default Input;
