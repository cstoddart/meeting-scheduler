import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import Modal from '../../ui/modal/Modal';
import './EventView.css';

const createHTML = (htmlString) => ({
  __html: htmlString,
});

const EventView = (props) => (
  <div className="eventView" onClick={(e) => props.hideEventView(e)}>
    <Modal closeModal={() => props.hideEventView()}>
      <div className="eventViewBody">
        <h1 className="eventViewTitle">{props.event.summary}</h1>
        <div className="eventViewCreator">Created by: {props.event.creator.displayName || props.event.creator.email}</div>
        <div className="eventViewTime">{format(props.event.start.dateTime, 'h:mm A')} - {format(props.event.end.dateTime, 'h:mm A')}</div>
        <div className="eventViewLocation">{props.event.location}</div>
        <div className="eventViewDescription" dangerouslySetInnerHTML={createHTML(props.event.description)} />
        <div className="eventViewAttendees">
          <strong>Attendees:</strong>
          {props.event.attendees.filter((attendee) => (
            !attendee.email.includes('resource.calendar.google.com')
          )).map((attendee) => (
            <div className="eventViewAttendee">{attendee.email}</div>
          ))}
        </div>
      </div>
    </Modal>
  </div>
);

EventView.propTypes = {
  event: PropTypes.shape({
    summary: PropTypes.string.isRequired,
    creator: PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
    start: PropTypes.shape({
      dateTime: PropTypes.instanceOf(Date).isRequired,
    }).isRequired,
    end: PropTypes.shape({
      dateTime: PropTypes.instanceOf(Date).isRequired,
    }).isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    attendees: PropTypes.arrayOf({}),
  }),
  hideEventView: PropTypes.func,
};

export default EventView;
