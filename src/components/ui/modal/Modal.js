import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import './Modal.css';

class Modal extends Component {
  constructor() {
    super();
    this.modal = createRef();
  }

  closeModal(e) {
    if (e.target !== this.modal.current) {
      return;
    }
    this.props.closeModal();
  }

  render() {
    return (
      <div className="modal" ref={this.modal} onClick={(e) => this.closeModal(e)}>
        <div className="modalContent">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
