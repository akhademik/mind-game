<script setup lang="ts"></script>

<template>
  <div
    class="absolute inset-0 flex flex-col items-center justify-center w-full h-screen gap-0 m-auto font-bold text-center text-white bg-cyan-600 opacity-90"
  >
    <h1 class="text-4xl uppercase">Congratulation</h1>
    <p class="pt-2 text-2xl">You've cleared the game !</p>
    <div class="mt-4 grid w-max grid-cols-2 gap-3 text-2xl [&>p:nth-child(even)]:text-red-600">
      <p>Your moves:</p>
      <p>13</p>
      <p>Your time:</p>
      <p>13:13</p>
    </div>
    <h2 class="mt-5 text-lg">You will be redirected back to homepage</h2>
  </div>
</template>
