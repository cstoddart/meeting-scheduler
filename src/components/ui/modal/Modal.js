import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import './Modal.css';

class Modal extends Component {
  constructor() {
    super();
    this.modal = createRef();
  }

  componentDidMount() {
    document.addEventListener('keyup', this.modalShortcuts);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.modalShortcuts);
  }

  modalShortcuts = (event) => {
    if (event.key === 'Escape') {
      this.props.closeModal();
    }
  }

  closeModal = (event) => {
    if (event.target.className === 'modal' || event.target.className === 'modalExit')
      {this.props.closeModal();}
  }

  render() {
    return (
      <div className="modal" ref={this.modal} onClick={this.closeModal}>
        <div className="modalExit" onClick={this.closeModal} />
        <div className="modalContent">
          <div className="modalBody">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
