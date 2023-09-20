<script lang="ts">
  import type Task from "./task.svelte";
  import Backdrop from "./backdrop.svelte";
  import Button from "./button.svelte";
  export let showModal: boolean;
  export let addTask: Function;

  function handleSubmit(e: Event) {
    if (!(e.target instanceof HTMLFormElement)) {
      console.log("No event target or target is not a form element");
      return;
    }

    const formData = new FormData(e.target);
    console.log(formData);
    addTask(formData);
  }

  function closeModal() {
    showModal = false;
  }
</script>

<Backdrop {closeModal}>
  <form
    on:submit|preventDefault={handleSubmit}
    class="bg-[#242424] rounded-md p-3 text-neutral-200 flex flex-col items-center gap-4"
  >
    <h2>What do you want me to remind you of?</h2>
    <input name="title" placeholder="title" />
    <input name="description" placeholder="description" />
    <input name="time" type="time" placeholder="time" />
    <Button>Submit</Button>
  </form>
</Backdrop>
