import React from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MobXTypes } from 'mobx-react';
import { format } from 'date-fns';

import Modal from '../../ui/modal/Modal';
import './EventDetails.css';

const createHTML = (htmlString) => ({
  __html: htmlString,
});

const EventDetails = (props) => (
  <div className="eventDetails">
    <Modal closeModal={() => props.hideEventDetails()}>
      <h1 className="eventDetailsTitle">{props.event.summary}</h1>
      <div className="eventDetailsCreator">Created by: {props.event.creator.displayName || props.event.creator.email}</div>
      <div className="eventDetailsTime">{format(props.event.start.dateTime, 'h:mm A')} - {format(props.event.end.dateTime, 'h:mm A')}</div>
      <div className="eventDetailsLocation">{props.event.location}</div>
      <div className="eventDetailsDescription" dangerouslySetInnerHTML={createHTML(props.event.description)} />
      <div className="eventDetailsAttendees">
        <strong>Attendees:</strong>
        {props.event.attendees && props.event.attendees.filter((attendee) => (
          !attendee.email.includes('resource.calendar.google.com')
        )).map((attendee) => (
          <div key={`${attendee.email}${props.event.id}`} className="eventDetailsAttendee">{attendee.email}</div>
        ))}
      </div>
    </Modal>
  </div>
);

EventDetails.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    creator: PropTypes.shape({
      displayName: PropTypes.string,
      email: PropTypes.string.isRequired,
    }).isRequired,
    start: PropTypes.shape({
      dateTime: PropTypes.string.isRequired,
    }).isRequired,
    end: PropTypes.shape({
      dateTime: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.string,
    description: PropTypes.string,
    attendees: MobXTypes.observableArray,
  }),
  hideEventDetails: PropTypes.func,
};

export default EventDetails;
