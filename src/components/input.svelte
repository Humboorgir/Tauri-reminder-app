<script lang="ts">
  import type { HTMLInputTypeAttribute } from "svelte/elements";
  export let placeholder: string;
  export let name: string;
  export let type: HTMLInputTypeAttribute = "text";
</script>

<input
  class="rounded-md py-1 px-2 bg-transparent text-neutral-400 border-2 border-neutral-500
focus:border-neutral-300 focus:text-neutral-200 outline-none transition-all"
  {placeholder}
  {type}
  {name}
/>
