<script setup lang="ts">
defineProps(['playerMoves', 'secondsPlayed', 'minutesPlayed'])
</script>

<template>
  <div
    class="absolute inset-0 m-auto flex h-screen w-full flex-col items-center justify-center gap-0 bg-cyan-600 text-center font-bold text-white opacity-90"
  >
    <h1 class="text-4xl uppercase">Congratulation</h1>
    <p class="pt-2 text-2xl">You've cleared the game !</p>
    <div class="mt-4 grid w-max grid-cols-2 gap-3 text-2xl [&>p:nth-child(even)]:text-red-600">
      <p>Your moves:</p>
      <p>{{ playerMoves }}</p>
      <p>Your time:</p>
      <p>{{ minutesPlayed }} : {{ secondsPlayed }}</p>
    </div>
    <button
      class="mt-5 w-max rounded-md border px-4 py-1 text-lg font-bold text-white hover:text-orange-500"
      @click="$emit('gameRestart')"
    >
      Restart Game
    </button>
  </div>
</template>
