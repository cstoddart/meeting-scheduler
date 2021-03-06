import React from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MobXTypes } from 'mobx-react';
import { format } from 'date-fns';

import Modal from '../../ui/modal/Modal';
import './EventDetails.css';

const createHTML = (htmlString) => ({
  __html: htmlString,
});

const EventDetails = ({ event, ...props }) => (
  <div className="eventDetails">
    <Modal closeModal={props.hideEventDetails}>
      <h1 className="eventDetailsTitle">{event.summary}</h1>
      <div className="eventDetailsCreator">Created by: {event.creator && event.creator.displayName || event.creator && event.creator.email}</div>
      <div className="eventDetailsTimeAndLocation">
        {event.start.dateTime ?
          <div className="eventDetailsTime">{format(event.start.dateTime, 'h:mm A')} - {format(event.end.dateTime, 'h:mm A')}</div>
          : <div className="eventDetailsTime">All Day</div>
        }
        <div className="eventDetailsLocation">{event.location}</div>
      </div>
      <div className="eventDetailsBody">
        {event.description &&
          <div className="eventDetailsDescription">
            <h2 className="eventDetailsDescriptionTitle">Event Description</h2>
            <div className="eventDetailsDescriptionContent" dangerouslySetInnerHTML={createHTML(event.description)} /> {/* necessary to render html tags <a> <br> <strong> etc. */}
          </div>
        }
        <div className="eventDetailsAttendees">
          <h2 className="eventDetailsAttendeesTitle">Attendees</h2>
          {event.attendees && event.attendees.filter((attendee) => (
            !attendee.email.includes('resource.calendar.google.com')
          )).map((attendee) => (
            <div key={`${attendee.email}${event.id}`} className="eventDetailsAttendee">{attendee.email}</div>
          ))}
        </div>
      </div>
    </Modal>
  </div>
);

EventDetails.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    summary: PropTypes.string,
    creator: PropTypes.shape({
      displayName: PropTypes.string,
      email: PropTypes.string.isRequired,
    }),
    start: PropTypes.shape({
      dateTime: PropTypes.string,
    }).isRequired,
    end: PropTypes.shape({
      dateTime: PropTypes.string,
    }).isRequired,
    location: PropTypes.string,
    description: PropTypes.string,
    attendees: MobXTypes.observableArray,
  }),
  hideEventDetails: PropTypes.func,
};

export default EventDetails;
