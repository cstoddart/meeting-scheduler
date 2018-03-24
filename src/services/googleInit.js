export const googleInit = async () => {
  const result = await window.gapi.load('client:auth2', {
    callback: (result) => {
      console.log("gapi loaded...", result);
    },
    onerror: () => {
      alert('gapi.client failed to load');
    },
    timeout: 5000,
    ontimeout: () => {
      alert('gapi.client could not load in a timely manner');
    }
  });

  return result;
}
