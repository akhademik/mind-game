<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
import CardsDeck from './components/CardsDeck.vue'
import { computed, ref } from 'vue'
import { IFullDeck } from './utils/types'

// NOTE: All variables for the timer
const timer = ref<number>(0)

const secondsTimer = computed(() => {
  const seconds = timer.value % 60
  return seconds < 10 ? `0${seconds}` : seconds
})

const minutesTimer = computed(() => {
  const mins = Math.floor(timer.value / 60)
  return mins < 10 ? `0${mins}` : mins
})

let intervalID: number | undefined = undefined

// Start the timer/counter when hit the first card
const runTimer = () => {
  intervalID = setInterval(() => {
    if (timer.value >= 0) {
      timer.value += 1
    } else {
      clearInterval(intervalID)
    }
  }, 1000)
}

// NOTE: Stats for user
const playerClick = ref(0)

const playerMoves = computed(() => {
  return Math.floor(playerClick.value / 2)
})

let count: number = 0
const fullDecks = ref<IFullDeck>([])
const matched = computed(() => {
  let newCount = count
  fullDecks.value.forEach((deck) => {
    deck.isMatch && (count = count + 1)
  })
  return count === 0 ? count / 2 : (count - newCount) / 2
})

const getUpdate = (newArr: []) => {
  fullDecks.value = newArr
}
</script>

<template>
  <main class="app">
    <TheHeader
      :seconds-timer="secondsTimer"
      :minutes-timer="minutesTimer"
      :player-moves="playerMoves"
      :matched-pair="matched"
      :full-decks="fullDecks"
    />
    <CardsDeck
      :run-timer="runTimer"
      :interval-ID="intervalID"
      :player-click="playerClick"
      @update-full="getUpdate"
      @card-click="() => (playerClick += 1)"
    />
    <h1>{{ matched }}</h1>
  </main>
</template>
