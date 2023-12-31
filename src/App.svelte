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
  import getRemainingTime from "./lib/getRemainingTime";
  import sortTasks from "./lib/sortTasks";

  let tasks: Task[] = [];
  let remainingTime = "";
  let playing = false;

  onMount(async () => {
    // read tasks from tasks.json
    try {
      const loadedTasks = await readTextFile("tasks.json", { dir: BaseDirectory.AppData });
      tasks = sortTasks(loadedTasks);
      remainingTime = getRemainingTime(tasks[0]);
    } catch (err) {
      console.log(err);
    }

    setInterval(async () => {
      remainingTime = getRemainingTime(tasks[0]);
      let currentTime = getCurrentTime();
      console.log(currentTime);
      console.log(tasks[0].time);
      if (!tasks[0]?.time) return;
      // play the audio the current time equals the first tasks specified time,
      // AND if its not already playing
      if (currentTime == tasks[0].time && playing == false) {
        console.log("Playing");
        let taskString = JSON.stringify(tasks.slice(1));
        let t = await writeFile("tasks.json", taskString, { dir: BaseDirectory.AppData });
        console.log(t);
        invoke("play");
        playing = true;

        setTimeout(() => {
          tasks = tasks.slice(1);
          playing = false;
        }, 30000);
      }
    }, 1000);
  });

  async function addTask(task: Task) {
    let updatedTasks = [...tasks, task];
    let updatedTasksString = JSON.stringify(updatedTasks);
    await writeFile("tasks.json", updatedTasksString, { dir: BaseDirectory.AppData });
    tasks = sortTasks(updatedTasks);
    remainingTime = getRemainingTime(tasks[0]);
  }

  function handleClick() {
    showModal.set(true);
  }
</script>

<div class="bg-[#2c2c2c] min-h-screen w-screen flex flex-col justify-center pb-[7%] items-center py-8">
  {#if tasks.length && !playing}
    <h1 class="font-bold text-xl md:text-2xl text-neutral-100 w-fit mb-1 mb:mb-2">Next task in...</h1>
    <div class="text-neutral-200 mx-auto text-sm md:text-lg mb-3 mb:mb-4">
      {remainingTime}
    </div>
  {/if}

  {#if playing}
    <h1 class="font-bold text-xl md:text-2xl text-neutral-100 w-fit mb-2">Time to {tasks[0].title}</h1>
  {/if}

  {#if !tasks.length && !playing}
    <h1 class="font-bold text-xl md:text-2xl text-neutral-100 w-fit mb-2">What to do next?</h1>
  {/if}

  <div class="mb-3 flex flex-col">
    {#each tasks as task}
      <TaskComponent {...task} {playing} />
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
