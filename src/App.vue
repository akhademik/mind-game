<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
import CardsDeck from './components/CardsDeck.vue'
import { DECKNAMES, WAITIME } from './utils/CONSTANT'
import { generateDecks } from './utils/helperfunctions'

import type { IFullDeck, TDeck } from './utils/types'
import type { Ref } from 'vue'
import { computed, ref } from 'vue'

const FULLDECK = ref([...generateDecks(DECKNAMES)])
const timer = ref<number>(0)
const playerClick = ref(0)
const playerMoves = computed(() => Math.floor(playerClick.value / 2))

let timerIntervalID: number | undefined = undefined

// NOTE: LOGIC FOR PLAYER STATS
const secondsPlayed = computed(() => {
  const seconds = timer.value % 60
  return seconds < 10 ? `0${seconds}` : seconds
})

const minutesPlayed = computed(() => {
  const mins = Math.floor(timer.value / 60)
  return mins < 10 ? `0${mins}` : mins
})

// FIXME: fixe the interval to stop the counter when all pairs are matched
const startTheTimer = () => {
  timerIntervalID = setInterval(() => {
    timer.value >= 0
      ? (timer.value += 1)
      : matched.value == FULLDECK.value.length / 2 && clearInterval(timerIntervalID)
  }, 1000)
}

const matched = computed(() => {
  // NOTE: Run through elements, if element isMatch true then +1 to acc, if false add 0
  // Array.reduce((acc,element) => acc + element, initAcc)
  // Last one, if count is 0 then print 0, if more than 0 then / 2
  const count = FULLDECK.value.reduce((acc, deck) => acc + (deck.isMatch ? 1 : 0), 0)
  return count === 0 ? 0 : count / 2
})

// CARD LOGIC
const checkMatched = ref<IFullDeck>([])

const handleCardClick = (card: TDeck) => {
  !timerIntervalID && startTheTimer()
  card.isOpen = true
  checkMatched.value.push(card)
  checkChosenCards()
}
const matchedCard = (chosenCards: Ref<IFullDeck>) => {
  FULLDECK.value.forEach((card) => {
    if (chosenCards.value.some((cCard) => cCard.id == card.id)) {
      card.isMatch = true
    }
  })
}
const resetPick = (pick: Ref<IFullDeck>) => {
  pick.value = []
  flipBack()
}

const flipBack = () => {
  setTimeout(() => FULLDECK.value.forEach((deck) => (deck.isOpen = false)), WAITIME)
}

const checkChosenCards = () => {
  const [card1, card2] = checkMatched.value

  if (card1?.id !== card2?.id && checkMatched.value.length === 2) {
    if (card1?.url === card2?.url) {
      matchedCard(checkMatched)
    }
    resetPick(checkMatched)
  }
}
</script>

<template>
  <main class="app">
    <TheHeader
      :seconds-played="secondsPlayed"
      :minutes-played="minutesPlayed"
      :player-moves="playerMoves"
      :matched-pair="matched"
      :full-decks="FULLDECK"
    />
    <CardsDeck
      :player-click="playerClick"
      :full-decks="FULLDECK"
      @card-click="(card) => handleCardClick(card)"
    />
  </main>
</template>
