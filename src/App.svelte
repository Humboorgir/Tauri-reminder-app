<script lang="ts">
  import type { Task } from "./types";
  import { readTextFile, writeFile, BaseDirectory } from "@tauri-apps/api/fs";
  import Button from "./components/button.svelte";
  import TaskComponent from "./components/task.svelte";
  import TaskModal from "./components/taskmodal.svelte";
  import { showModal } from "./stores";
  import { onMount } from "svelte";
  let tasks: Task[] = [];
  let alarm: HTMLAudioElement;

  window.addEventListener("click", playAudio);
  function playAudio() {
    alarm.play();
    console.log("alarm is now playing");
    window.removeEventListener("click", playAudio);
  }

  onMount(async () => {
    const loadedTasks = await readTextFile("tasks.json", { dir: BaseDirectory.AppData });
    tasks = JSON.parse(loadedTasks);

    let playing = false;

    setInterval(() => {
      // get the current time in the following format: 'Hour:Minute'
      let currentDate = new Date();
      let minute = currentDate.getMinutes() < 10 ? `0${currentDate.getMinutes()}` : currentDate.getMinutes();
      let hour = currentDate.getHours() < 10 ? `0${currentDate.getHours()}` : currentDate.getHours();
      let currentTime = `${hour}:${minute}`;
      // play the audio the current time equals the first tasks specified time,
      // AND if its not already playing
      if (currentTime == tasks[0].time && playing == false) {
        alarm.src = "/alarm.mp3";
        playing = true;
        setTimeout(() => {
          alarm.src = "";
          playing = false;
        }, 30000);
      }
    }, 1000);
  });

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

  <audio bind:this={alarm} />
</div>
