import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { parse, format, addMinutes, setMinutes, setHours } from 'date-fns';

import { ROOMS, EMAILS } from '../../../constants';
import Input from '../../ui/input/Input';
import Modal from '../../ui/modal/Modal';
import { addCalendarEvent } from '../../../services/google/calendar';
import './CreateEvent.css';

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.createEvent = createRef();

    const timeArray = this.props.eventHours.toString().split('.');
    const hours = timeArray[0];
    let minutes = (timeArray[1] / 100) * 60 || 0;

    if (minutes < 10) minutes = minutes * 10;

    const startTime = new Date();
    startTime.setHours(hours);
    startTime.setMinutes(minutes);

    const endTime = addMinutes(startTime, 30);

    this.state = {
      creator: props.user,
      title: '',
      room: props.room,
      start: '',
      startDate: format(new Date(this.props.eventDate), 'YYYY-MM-DD'),
      startTime: format(startTime, 'HH:mm'),
      end: '',
      endDate: format(new Date(this.props.eventDate), 'YYYY-MM-DD'),
      endTime: format(endTime, 'HH:mm'),
      attendees: [],
      description: '',
    };
  }

  handleChange(e, type = undefined) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(e) {
    console.log('EVENT', this.state);
    e.preventDefault();
    const event = this.state;

    const startHours = this.state.startTime.split(':')[0];
    const startMinutes = this.state.startTime.split(':')[1];
    let start = parse(this.state.startDate);
    start = setHours(start, startHours);
    start = setMinutes(start, startMinutes);
    event.start = start;

    const endHours = this.state.endTime.split(':')[0];
    const endMinutes = this.state.endTime.split(':')[1];
    let end = parse(this.state.endDate);
    end = setHours(end, endHours);
    end = setMinutes(end, endMinutes);
    event.end = end;

    await addCalendarEvent(event);
    window.location.reload();
  }

  render() {
    return (
      <div className="createEvent" ref={this.createEvent}>
        <Modal closeModal={() => this.props.hideCreateEvent()}>
          <h1 className="createEventTitle">Create Event</h1>
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <Input label="Title" name="title" type="text" value={this.state.title} handleChange={(e) => this.handleChange(e)} />
            <Input label="Room" name="room" type="dropdown" value={ROOMS.map((room) => room.name)} defaultValue={this.state.room} handleChange={(e) => this.handleChange(e)} />
            <div className="createEventInputGroup">
              <Input label="Start Date" name="startDate" type="date" value={this.state.startDate} handleChange={(e) => this.handleChange(e)} />
              <Input label="Start Time" name="startTime" type="time" value={this.state.startTime} handleChange={(e) => this.handleChange(e)} />
            </div>
            <div className="createEventInputGroup">
              <Input label="End Date" name="endDate" type="date" value={this.state.endDate} handleChange={(e) => this.handleChange(e)} />
              <Input label="End Time" name="endTime" type="time" value={this.state.endTime} handleChange={(e) => this.handleChange(e)} />
            </div>
            <Input label="Attendees" name="attendees" type="select" value={this.state.attendees} handleChange={(e, type) => this.handleChange(e, type)} options={EMAILS} />
            <Input label="Description" name="description" type="textArea" value={this.state.description} handleChange={(e) => this.handleChange(e)} />
            <input type="submit" value="Submit" />
          </form>
        </Modal>
      </div>
    );
  }
}

CreateEvent.propTypes = {
  hideCreateEvent: PropTypes.func.isRequired,
  room: PropTypes.string,
  eventDate: PropTypes.instanceOf(Date).isRequired,
  eventHours: PropTypes.number.isRequired,
};

export default CreateEvent;
