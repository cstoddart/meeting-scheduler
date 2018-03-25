export const googleInit = (callback) => {
  console.log("INITIALIZING GAPI...");
  window.gapi.load('client:auth2', () => callback());
}
