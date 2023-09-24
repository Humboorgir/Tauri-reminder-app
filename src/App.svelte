<script lang="ts">
  import type { Task } from "./types";
  import { readTextFile, writeFile, BaseDirectory } from "@tauri-apps/api/fs";
  import { invoke } from "@tauri-apps/api/tauri";
  import Button from "./components/button.svelte";
  import TaskComponent from "./components/task.svelte";
  import TemplateTask from "./components/templatetask.svelte";
  import TaskModal from "./components/taskmodal.svelte";
  import { showModal } from "./stores";
  import { onMount } from "svelte";

  import getCurrentTime from "./lib/getCurrentTime";
  import sortTasks from "./lib/sortTasks";

  let tasks: Task[] = [];
  let remainingTime = "";
  let playing = false;

  onMount(async () => {
    // read tasks from tasks.json
    const loadedTasks = await readTextFile("tasks.json", { dir: BaseDirectory.AppData });
    tasks = sortTasks(loadedTasks);

    setInterval(() => {
      let currentTime = getCurrentTime();
      if (!tasks[0]?.time) return;
      // play the audio the current time equals the first tasks specified time,
      // AND if its not already playing
      if (currentTime == tasks[0].time && playing == false) {
        console.log("Playing");
        tasks = tasks.slice(1);
        let taskString = JSON.stringify(tasks);
        writeFile("tasks.json", taskString, { dir: BaseDirectory.AppData });
        invoke("play");
        playing = true;
        setTimeout(() => {
          playing = false;
        }, 30000);
      } else {
        console.log("Not yet " + getCurrentTime());
      }
    }, 1000);

    // TODO: complete this
    // update the remaining time
    function getRemainingTime() {
      let [hour, minute] = tasks[0].time.split(":");
      let [cHour, cMinute] = getCurrentTime().split(":");
      // convert to minutes
      let total = Number(hour) * 60 + Number(minute);
      let cTotal = Number(cHour) * 60 + Number(cMinute);
      let remaining = total - cTotal;
      // Convert back to hours and minutes after comparison
      return `${remaining} minutes`;
    }
    remainingTime = getRemainingTime();
  });

  async function addTask(task: Task) {
    let updatedTasks = [...tasks, task];
    let updatedTasksString = JSON.stringify(updatedTasks);
    await writeFile("tasks.json", updatedTasksString, { dir: BaseDirectory.AppData });
    tasks = sortTasks(updatedTasks);
  }

  function handleClick() {
    showModal.set(true);
  }
</script>

<div class="bg-[#2c2c2c] min-h-screen w-screen flex flex-col justify-center pb-[7%] items-center py-8">
  {#if tasks.length}
    <h1 class="font-bold text-xl md:text-2xl text-neutral-100 w-fit mb-2">Next task in...</h1>
    <div class="text-neutral-200 p-3 text-xl">
      {remainingTime}
    </div>
  {/if}

  {#if !tasks.length}
    <h1 class="font-bold text-xl md:text-2xl text-neutral-100 w-fit mb-2">What to do next?</h1>
  {/if}

  <div class="mb-3 flex flex-col">
    {#each tasks as task}
      <TaskComponent {...task} />
    {/each}

    {#if !tasks.length}
      <TemplateTask />
    {/if}
  </div>

  <Button className="w-[90vw] max-w-lg py-2 md:py-3" onClick={handleClick}>Add</Button>

  {#if $showModal}
    <TaskModal {addTask} />
  {/if}
</div>
