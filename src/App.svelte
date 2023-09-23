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

  onMount(async () => {
    // read tasks from tasks.json
    const loadedTasks = await readTextFile("tasks.json", { dir: BaseDirectory.AppData });
    tasks = sortTasks(loadedTasks);

    let playing = false;

    setInterval(() => {
      let currentTime = getCurrentTime();
      if (!tasks[0]?.time) return;
      // play the audio the current time equals the first tasks specified time,
      // AND if its not already playing
      if (currentTime == tasks[0].time && playing == false) {
        tasks = tasks.slice(1);
        let taskString = JSON.stringify(tasks);
        writeFile("tasks.json", taskString, { dir: BaseDirectory.AppData });
        invoke("play");
        playing = true;
        setTimeout(() => {
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
  }

  function handleClick() {
    showModal.set(true);
  }
</script>

<div class="bg-[#2c2c2c] min-h-screen w-screen flex flex-col items-center py-8">
  <h1 class="font-bold text-xl md:text-2xl text-neutral-100 w-fit mb-2">What to do next?</h1>
  <div class="mb-4 flex flex-col gap-2 md:gap-3">
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
