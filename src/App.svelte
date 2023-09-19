<script lang="ts">
  type Task = {
    title: string;
    description: string;
    time: string | Date;
  }

  import { readTextFile, writeFile, BaseDirectory } from '@tauri-apps/api/fs';
  import Button from './components/button.svelte';
  import Task from './components/task.svelte';

 let tasks:Task[] = [];

  async function load() {
const loadedTasks = await readTextFile('tasks.json', {dir: BaseDirectory.AppData})
tasks = JSON.parse(loadedTasks);
};

load();

async function addTask(task:Task) {
  let updatedTasks = [...tasks, task]
  let updatedTasksString = JSON.stringify(updatedTasks)
 const data = await writeFile('tasks.json', updatedTasksString ,{ dir: BaseDirectory.AppData})
 tasks = updatedTasks;
}
</script>

<div class="bg-[#2c2c2c] min-h-screen w-screen flex flex-col items-center py-8">
<h1 class="font-bold text-xl text-neutral-100 w-fit mb-2">What to do next?</h1>

<div class="mb-4">
  {#each tasks as task}
  <Task {...task}/>
  {/each}
</div>

<Button className="px-[152px]" onClick={() => {
  const task = {
    title: "Test task",
    description: "Test task description",
    time: new Date(1695064773820)
  }
  addTask(task)}}>Add</Button>

</div>