const jsonTasks = [{ time: "01:01" }, { time: "14:20" }, { time: "14:16" }, { time: "16:01" }];
log();

console.log("\n \n \n");
jsonTasks.sort((a, b) => {
  let [aHour, aMinute] = a.time.split(":");
  let [bHour, bMinute] = b.time.split(":");

  let aTotal = Number(aHour) * 60 + Number(aMinute);
  let bTotal = Number(bHour) * 60 + Number(bMinute);

  if (bTotal > aTotal) return -1;
  if (aTotal > bTotal) return 1;
  else return 0;
});
log();

function log() {
  console.log(jsonTasks);
}
