<script lang="ts">
  import type { Task } from "./types";
  import { readTextFile, writeFile, BaseDirectory } from "@tauri-apps/api/fs";
  import Button from "./components/button.svelte";
  import TaskComponent from "./components/task.svelte";
  import TaskModal from "./components/taskmodal.svelte";
  import { showModal } from "./stores";
  let tasks: Task[] = [];

  async function load() {
    const loadedTasks = await readTextFile("tasks.json", { dir: BaseDirectory.AppData });
    tasks = JSON.parse(loadedTasks);
    console.log(tasks);
  }

  load();

  async function addTask(task: Task) {
    let updatedTasks = [...tasks, task];
    let updatedTasksString = JSON.stringify(updatedTasks);
    await writeFile("tasks.json", updatedTasksString, { dir: BaseDirectory.AppData });
    tasks = updatedTasks;
  }

  function handleClick() {
    showModal.set(true);
  }
</script>

<div class="bg-[#2c2c2c] min-h-screen w-screen flex flex-col items-center py-8">
  <h1 class="font-bold text-xl text-neutral-100 w-fit mb-2">What to do next?</h1>
  <div class="mb-4 flex flex-col gap-2 md:gap-3">
    {#each tasks as task}
      <TaskComponent {...task} />
    {/each}
  </div>

  <Button className="w-[90vw] max-w-xl py-2 md:py-3" onClick={handleClick}>Add</Button>

  {#if $showModal}
    <TaskModal {addTask} />
  {/if}
</div>
