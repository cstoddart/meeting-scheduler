import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

import { alphabetize } from '../../../helpers';
import './Input.css';

const Input = (props) => (
  <div className="inputContainer">
    <div className="inputLabel">{props.label}</div>
    {props.type === 'text' &&
      <input type="text" name={props.name} value={props.value} onChange={(e) => props.handleChange(e)} />
    }
    {props.type === 'textArea' &&
      <textarea name={props.name} value={props.value} onChange={(e) => props.handleChange(e)} />
    }
    {props.type === 'date' &&
      <input type="date" name={props.name} value={props.value} onChange={(e) => props.handleChange(e)} />
    }
    {props.type === 'time' &&
      <input type="time" name={props.name} value={props.value} onChange={(e) => props.handleChange(e)} />
    }
    {props.type === 'dropdown' &&
      <select name={props.name} onChange={(e) => props.handleChange(e)} defaultValue={props.defaultValue}>
        {alphabetize(props.value).map((option) => (
          <option key={option} value={option}>{option}</option>
        ))
        }
      </select>
    }
    {props.type === 'select' &&
      <Select
        className="react-select"
        onChange={(e) => props.handleChange({ target: { value: e.map((event) => event.value), name: props.name } })}
        isMulti='true'
        defaultValue={props.defaultValue}
        options={props.options.map((option) => ({
          'value': option,
          'label': option,
        }))}
      />
    }
  </div>
);

Input.propTypes = {
  defaultValue: PropTypes.string,
  handleChange: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.oneOf(['text', 'textArea', 'date', 'time', 'dropdown', 'select']).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

export default Input;
