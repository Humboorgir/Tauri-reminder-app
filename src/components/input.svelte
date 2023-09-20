<script lang="ts">
  import type { HTMLInputTypeAttribute } from "svelte/elements";
  import { twMerge } from "tailwind-merge";
  export let placeholder: string;
  export let name: string;
  export let type: HTMLInputTypeAttribute = "text";
  export let required: boolean = false;
  export let className: string = "";
  let classes = `rounded-md py-1 px-2 bg-transparent text-neutral-400 border-2 border-neutral-500
     focus:border-neutral-300 focus:text-neutral-200 outline-none transition-all`;
</script>

<input class={twMerge(classes, className)} {required} {placeholder} {type} {name} />
