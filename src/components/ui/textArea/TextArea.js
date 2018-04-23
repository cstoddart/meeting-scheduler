import React from 'react';
import PropTypes from 'prop-types';

const TextArea = (props) => (
  <div className="textAreaContainer">
    <div>{props.name}</div>
    <textarea name={props.name} value={props.input.value} onChange={(e) => props.handleChange(e)} />
  </div>
);

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.string.isRequired,
  }),
  handleChange: PropTypes.func.isRequired,
};

export default TextArea;
