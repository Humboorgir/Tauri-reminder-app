export default function getCurrentTime({ includeSeconds } = { includeSeconds: false }) {
  // returns the current time in the following format: 'Hour:Minute'
  // includes seconds if includeSeconds is true
  let currentDate = new Date();
  let minute = currentDate.getMinutes() < 10 ? `0${currentDate.getMinutes()}` : currentDate.getMinutes();
  let hour = currentDate.getHours() < 10 ? `0${currentDate.getHours()}` : currentDate.getHours();
  let second = currentDate.getSeconds() < 10 ? `0${currentDate.getSeconds()}` : currentDate.getSeconds();
  const currentTime = includeSeconds ? `${hour}:${minute}:${second}` : `${hour}:${minute}`;
  return currentTime;
}
