<script lang="ts">
  import Backdrop from "./backdrop.svelte";
  import Input from "./input.svelte";
  import Button from "./button.svelte";
  import { showModal } from "../stores";
  import { scale } from "svelte/transition";
  export let addTask: Function;

  function handleSubmit(e: Event) {
    e.stopPropagation();
    if (!(e.target instanceof HTMLFormElement)) {
      console.log("No event target or target is not a form element");
      return;
    }

    const data = {
      title: (e.target.title as any).value,
      description: e.target.description.value,
      time: e.target.time.value,
    };
    addTask(data);
  }

  function closeModal(e: Event) {
    showModal.set(false);
  }
</script>

<Backdrop {closeModal}>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <form
    on:click={(e) => e.stopPropagation()}
    on:submit|preventDefault={handleSubmit}
    class="bg-[#242424] rounded-md w-[500px] max-w-full py-3 px-5 text-neutral-200 flex flex-col items-center gap-4"
    transition:scale={{ duration: 150, start: 0.75 }}
  >
    <h2 class="text-xl">Remind me of...</h2>
    <Input className="w-full" name="title" placeholder="title" required />
    <Input className="w-full" name="description" placeholder="description" required />
    <Input className="w-full" type="time" name="time" placeholder="time" required />
    <Button className="w-full">Submit</Button>
  </form>
</Backdrop>
