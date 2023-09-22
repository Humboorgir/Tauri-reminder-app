import type { Task } from "../types";
import getCurrentTime from "./getCurrentTime";

export default function sortTasks(tasks: Task[] | string) {
  if (typeof tasks == "string") tasks = JSON.parse(tasks) as Task[];

  let currentTime = getCurrentTime();
  // sort tasks based on which is closer to the current time
  tasks.sort((a: Task, b: Task) => {
    let [aHour, aMinute] = a.time.split(":");
    let [bHour, bMinute] = b.time.split(":");

    let aTotal = Number(aHour) * 60 + Number(aMinute);
    let bTotal = Number(bHour) * 60 + Number(bMinute);

    // c stands for current
    let [hour, minute] = currentTime.split(":");
    let cTimeTotal = Number(hour) * 60 + Number(minute);
    return Math.abs(cTimeTotal - aTotal) - Math.abs(cTimeTotal - bTotal);
  });
  return tasks;
}
