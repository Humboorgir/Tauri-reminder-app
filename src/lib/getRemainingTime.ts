import type { Task } from "../types";
import getCurrentTime from "./getCurrentTime";

export default function getRemainingTime(task: Task) {
  console.log(task);
  let [hour, minute] = task.time.split(":");
  let [cHour, cMinute, cSecond] = getCurrentTime({ includeSeconds: true }).split(":");
  // convert to seconds
  let total = (Number(hour) * 60 + Number(minute)) * 60;
  let cTotal = (Number(cHour) * 60 + Number(cMinute)) * 60 + Number(cSecond);
  let remaining = total - cTotal;
  if (remaining < 0) remaining += 12 * 3600;
  // Convert back to hours,  minutes and seconds after comparison
  const hours = Math.floor(remaining / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;
  let hoursLabel = hours == 1 ? "hour" : "hours";
  let minutesLabel = minutes == 1 ? "minute" : "minutes";
  let secondsLabel = seconds == 1 ? "second" : "seconds";
  return `${hours} ${hoursLabel}, ${minutes} ${minutesLabel} and ${seconds} ${secondsLabel}`;
}
