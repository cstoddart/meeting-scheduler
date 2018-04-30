import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import Input from '../../ui/input/Input';
import Modal from '../../ui/modal/Modal';
// import { addCalendarEvent } from '../../../services/googleCalendar';
import './CreateEvent.css';

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.createEvent = createRef();

    const timeArray = this.props.eventHours.toString().split('.');
    console.log('TIME ARRAY', timeArray);
    const hours = timeArray[0];
    const minutes = (timeArray[1] / 100) * 60 || 0;
    console.log('hours', hours);
    console.log('minutes', minutes);
    const startTime = new Date();
    startTime.setHours(hours);
    startTime.setMinutes(minutes);
    console.log('START TIME', startTime);

    this.state = {
      title: '',
      startDate: format(new Date(this.props.eventDate), 'YYYY-MM-DD'),
      startTime: format(startTime, 'hh:mm'),
      endDate: '',
      endHours: '',
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

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }

  render() {
    console.log('event hours', this.props.eventHours);
    console.log('time HEY MARI!!', this.state.startTime);
    return (
      <div className="createEvent" ref={this.createEvent}>
        <Modal closeModal={() => this.props.hideCreateEvent()}>
          <h1>Create Event</h1>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <Input label="Title" name="title" value={this.state.value} onChange={(e) => this.handleChange(e)} />
            <div className="createEventInputGroup">
              <Input label="Start Date" name="startDate" type="date" value={this.state.startDate} handleChange={(e) => this.handleChange(e)} />
              <Input label="Start Time" name="startTime" type="time" value={this.state.startTime} handleChange={(e) => this.handleChange(e)} />
            </div>
            <div className="createEventInputGroup">
              <Input label="End Date" name="endDate" type="date" value={this.state.endDate} handleChange={(e) => this.handleChange(e)} />
              <Input label="End Time" name="endHours" type="time" value={this.state.endHours} handleChange={(e) => this.handleChange(e)} />
            </div>
            <Input label="Description" name="description" type="textArea" value={this.state.description} handleChange={(e) => this.handleChange(e)} />
            <Input type="submit" value="Submit" />
          </form>
        </Modal>
      </div>
    );
  }
}

CreateEvent.propTypes = {
  hideCreateEvent: PropTypes.func.isRequired,
  // eventDay: PropTypes.instanceOf(Date).isRequired,
  eventHours: PropTypes.number.isRequired,
};

export default CreateEvent;
