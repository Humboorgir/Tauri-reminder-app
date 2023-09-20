<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";

  export let closeModal: MouseEventHandler<HTMLDivElement>;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  on:click={closeModal}
  class="absolute top-0 left-0 h-full w-full bg-black/30 flex items-center justify-center"
>
  <slot />
</div>
