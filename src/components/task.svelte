<script lang="ts">
    export let title:string;
    export let description:string;
    export let time:string|Date;

//  formatting the time 
const timeDate = new Date(time);
const hour = timeDate.getHours();
const minutes = timeDate.getMinutes();
const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
const hour12 = hour % 12 || 12;
const amPm = hour < 12 ? 'AM' : 'PM';

const timeFormatted = `${hour12}:${paddedMinutes} ${amPm}`;
</script>

<div class="text-neutral-200 flex items-start bg-[#3b3b3b] rounded-md p-2 mb-1.5">
    <div class="h-16 w-16 bg-neutral-500 rounded-md grid place-items-center text-3xl mr-2 font-bold">{title.split("")[0]}</div>
    <div class="flex flex-col">
      <h2 class="text-lg text-neutral-200">{title}</h2>
      <p class="text-xs text-neutral-400 pr-2 mb-2">{description}</p>
      <p class="text-xs text-neutral-500 self-end">{timeFormatted}</p>
    </div>
  </div>