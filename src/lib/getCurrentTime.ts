export default function getCurrentTime() {
  // returns the current time in the following format: 'Hour:Minute'
  let currentDate = new Date();
  let minute = currentDate.getMinutes() < 10 ? `0${currentDate.getMinutes()}` : currentDate.getMinutes();
  let hour = currentDate.getHours() < 10 ? `0${currentDate.getHours()}` : currentDate.getHours();
  let currentTime = `${hour}:${minute}`;
  return currentTime;
}
