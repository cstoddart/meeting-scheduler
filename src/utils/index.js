import { format } from 'date-fns';

export function toStandardTime({ hours, minutes = 0 }) {
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  const time = format(date, 'h:mm a');

  return time;
}
