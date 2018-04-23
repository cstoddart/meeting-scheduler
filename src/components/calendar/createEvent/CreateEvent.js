import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import Form from '../../ui/form/Form';
import Modal from '../../ui/modal/Modal';
// import { addCalendarEvent } from '../../../services/googleCalendar';
import './CreateEvent.css';

const formInputs = {
  summary: { value: '' },
  startDate: { value: '' },
  startHours: { value: '' },
  startMinutes: { value: '' },
  endDate: { value: '' },
  endHours: { value: '' },
  endMinutes: { value: '' },
  description: {
    value: '',
    type: 'textarea',
  },
};

function createEvent(data) {
  const event = data;
  console.log('NEW EVENT', event);
  // addCalendarEvent(event);
}

class CreateEvent extends Component {
  constructor() {
    super();
    this.createEvent = createRef();
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div className="createEvent" ref={this.createEvent}>
        <Modal closeModal={() => this.props.hideCreateEvent()}>
          <h1>Create Event</h1>
          <Form inputs={formInputs} handleSubmit={(data) => createEvent(data)} />
        </Modal>
      </div>
    );
  }
}

CreateEvent.propTypes = {
  hideCreateEvent: PropTypes.func,
};

export default CreateEvent;
