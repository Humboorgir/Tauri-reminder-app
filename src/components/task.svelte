<script lang="ts">
  export let title: string;
  export let description: string;
  export let time: string;

  //  formatting the time;
  let hour = Number(time.split(":")[0]);
  let minute = time.split(":")[1];
  const zone = hour < 12 ? "AM" : "PM";
  if (hour > 12) hour -= 12;

  const timeFormatted = `${hour}:${minute} ${zone}`;
</script>

<div
  class="relative text-neutral-200 flex items-start bg-[#3b3b3b] rounded-md p-2 w-[90vw] max-w-lg
mb-2 md:mb-2.5 last-of-type:!mb-0"
>
  <div
    class="h-16 w-16 bg-neutral-500 rounded-md grid place-items-center text-3xl
  mr-2 font-bold shrink-0 md:h-24 md:w-24 md:text-5xl"
  >
    {title.split("")[0].toUpperCase()}
  </div>
  <div class="flex flex-col w-full h-full pb-6">
    <h2 class="text-lg text-neutral-200 md:text-xl md:mb-0.5">{title}</h2>
    <p class="text-xs text-neutral-400 md:text-sm md:mb-2.5 pr-2">{description}</p>
    <p class="absolute bottom-2 text-xs text-neutral-400 self-end mt-auto">{timeFormatted}</p>
  </div>
</div>
