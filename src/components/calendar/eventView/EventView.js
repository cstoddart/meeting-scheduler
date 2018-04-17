import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import './EventView.css';

const createHTML = (htmlString) => ({
  __html: htmlString,
});

const EventView = forwardRef(({ event, resetSelectedEvent }, ref) => (
  <div className="eventView" ref={ref} onClick={(e) => resetSelectedEvent(e)}>
    <div className="eventViewContent">
      {console.log(event)}
      <div className="eventViewBody">
        <h1 className="eventViewTitle">{event.summary}</h1>
        <div className="eventViewCreator">Created by: {event.creator.displayName || event.creator.email}</div>
        <div className="eventViewTime">{format(event.start.dateTime, 'h:mm A')} - {format(event.end.dateTime, 'h:mm A')}</div>
        <div className="eventViewLocation">{event.location}</div>
        <div className="eventViewDescription" dangerouslySetInnerHTML={createHTML(event.description)} />
        <div className="eventViewAttendees">
          <strong>Attendees:</strong>
          {event.attendees.filter((attendee) => (
            !attendee.email.includes('resource.calendar.google.com')
          )).map((attendee) => (
            <div className="eventViewAttendee">{attendee.email}</div>
          ))}
        </div>
      </div>
    </div>
  </div>
));

EventView.propTypes = {
  event: PropTypes.shape({
  }),
  resetSelectedEvent: PropTypes.func,
};

export default EventView;
