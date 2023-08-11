<script setup lang="ts">
defineProps(['secondsPlayed', 'minutesPlayed', 'playerMoves', 'matchedPairs', 'totalPairs'])

const style = {
  card: 'flex aspect-square w-[100px] flex-col items-center justify-between border py-2 text-white rounded-md pt-6 [&>*:first-child]:text-red-500 [&>*:first-child]:text-xl [&>p]:font-bold '
}
</script>

<template>
  <div class="justify-between p-2 mb-4 md:flex">
    <h1 class="mt-auto text-center font-nice text-[3rem] text-blue-600">Matching Games</h1>
    <div class="flex items-center justify-center gap-2">
      <div :class="style.card">
        <p>{{ matchedPairs }} / {{ totalPairs }}</p>
        <p class="uppercase">Matches</p>
      </div>
      <div :class="style.card">
        <p>{{ playerMoves }}</p>
        <p class="uppercase">Move</p>
      </div>
      <div :class="style.card">
        <p>{{ minutesPlayed }} : {{ secondsPlayed }}</p>
        <p class="uppercase">Timer</p>
      </div>
    </div>
  </div>
</template>
