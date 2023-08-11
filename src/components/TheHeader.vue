<script setup lang="ts">
defineProps(['secondsPlayed', 'minutesPlayed', 'playerMoves', 'matchedPair', 'fullDecks'])

const style = {
  card: 'flex aspect-square w-[100px] flex-col items-center justify-between border py-2 text-white rounded-md'
}
</script>

<template>
  <div class="justify-between p-2 mb-4 md:flex">
    <h1 class="mt-auto text-center font-nice text-[3rem] text-blue-600">Mind Games</h1>
    <div class="flex items-center justify-center gap-2">
      <div :class="style.card">
        <p>{{ matchedPair }}/{{ fullDecks.length / 2 }}</p>
        <p>Matches</p>
      </div>
      <div :class="style.card">
        <p>{{ playerMoves }}</p>
        <p>Move</p>
      </div>
      <div :class="style.card">
        <p>{{ minutesPlayed }} : {{ secondsPlayed }}</p>
        <p>Timer</p>
      </div>
    </div>
  </div>
</template>
