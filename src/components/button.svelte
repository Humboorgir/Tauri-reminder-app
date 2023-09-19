<script lang="ts">
  import type { MouseEventHandler } from 'svelte/elements';
    import { twMerge } from 'tailwind-merge'

    const classes = "bg-neutral-700 rounded-md py-2 px-3 text-slate-200"
    
	export let className:string = "";
    export let onClick:MouseEventHandler<HTMLButtonElement> = () => null;
</script>

<button class={twMerge(classes, className)} on:click={onClick}><slot/></button>