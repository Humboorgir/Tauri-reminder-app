<script lang="ts">
    import { twMerge } from 'tailwind-merge'

    const classes = "bg-neutral-700 rounded-md py-2 px-3 text-slate-200"
    
	export let className:string = "";
</script>

<button class={twMerge(classes, className)}><slot/></button>