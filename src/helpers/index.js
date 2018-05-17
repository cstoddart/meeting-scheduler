export const alphabetize = (array, key) => {
  const alphabetizedArray = array.sort((a, b) => {
    if ((key ? a[key] : a) < (key ? b[key] : b)) return -1;
    return 1;
  });

  return alphabetizedArray;
};
