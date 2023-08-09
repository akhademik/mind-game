<script setup lang="ts">
defineProps(['secondsPlayed', 'minutesPlayed', 'playerMoves', 'matchedPair', 'fullDecks'])
</script>

<template>
  <div class="header">
    <h1>Mind Games</h1>
    <div class="header-board">
      <div class="board board-match">
        <p>{{ matchedPair }}/{{ fullDecks.length / 2 }}</p>
        <p>Matches</p>
      </div>
      <div class="board board-move">
        <p>{{ playerMoves }}</p>
        <p>Move</p>
      </div>
      <div class="board board-timer">
        <p>{{ minutesPlayed }} : {{ secondsPlayed }}</p>
        <p>Timer</p>
      </div>
    </div>
  </div>
</template>
