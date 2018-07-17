import { format } from 'date-fns';

export function toStandardTime({ hours, minutes = 0 }) {
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  const time = format(date, 'h:mm a');

  return time;
}

export const alphabetize = (array, key) => { // Use key when sorting array of objects
  const alphabetizedArray = array.sort((a, b) => {
    if ((key ? a[key] : a) < (key ? b[key] : b)) return -1;
    return 1;
  });

  return alphabetizedArray;
};
