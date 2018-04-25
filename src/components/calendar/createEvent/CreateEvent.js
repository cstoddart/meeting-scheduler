import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

import Input from '../../ui/input/Input';
import Modal from '../../ui/modal/Modal';
// import { addCalendarEvent } from '../../../services/googleCalendar';
import './CreateEvent.css';

class CreateEvent extends Component {
  constructor() {
    super();
    this.createEvent = createRef();
    this.state = {
      title: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      description: '',
    };
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
          <form onSubmit={() => this.handleSubmit()}>
            <Input label="Title" name="title" value={this.state.value} onChange={(e) => this.handleChange(e)} />
            <div className="createEventInputGroup">
              <Input label="Start Date" name="startDate" type="date" value={this.state.startDate} onChange={(e) => this.handleChange(e)} />
              <Input label="Start Time" name="startTime" type="time" value={this.state.startTime} onChange={(e) => this.handleChange(e)} />
            </div>
            <div className="createEventInputGroup">
              <Input label="End Date" name="endDate" type="date" value={this.state.endDate} onChange={(e) => this.handleChange(e)} />
              <Input label="End Time" name="endTime" type="time" value={this.state.endTime} onChange={(e) => this.handleChange(e)} />
            </div>
            <Input label="Description" name="description" type="textArea" value={this.state.description} onChange={(e) => this.handleChange(e)} />
            <Input type="submit" value="Submit" />
          </form>
        </Modal>
      </div>
    );
  }
}

CreateEvent.propTypes = {
  hideCreateEvent: PropTypes.func,
};

export default CreateEvent;
