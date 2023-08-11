<template>
  <div class="grid w-full place-items-center">
    <button
      class="mt-5 w-max rounded-md border px-4 py-1 text-lg font-bold text-white hover:text-orange-500"
      @click="$emit('handleReset')"
    >
      Restart Game
    </button>
  </div>
</template>
