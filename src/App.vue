<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
import CardsDeck from './components/CardsDeck.vue'
import TheReset from './components/TheReset.vue'
import TheModal from './components/TheModal.vue'

import { DECKNAMES, WAITIME } from './utils/CONSTANT'
import { generateDecks } from './utils/helperfunctions'

import type { IComputed, IFullDeck, TDeck } from './utils/types'
import type { Ref } from 'vue'
import { computed, ref } from 'vue'

const FULLDECK = ref([...generateDecks(DECKNAMES)])

const STATE = {
  timer: ref(0),
  playerClick: ref(0)
}

const COMPUTED: IComputed = {
  matchedPairs: computed(() => {
    const count = FULLDECK.value.reduce((acc, deck) => acc + (deck.isMatch ? 1 : 0), 0)
    return count === 0 ? 0 : count / 2
  }),
  isGameFinished: computed(() => COMPUTED.matchedPairs.value === FULLDECK.value.length / 2),
  playerMoves: computed(() => Math.floor(STATE.playerClick.value / 2)),
  timePlayed: computed(() => {
    let seconds = STATE.timer.value % 60
    let minutes = Math.floor(seconds / 60)
    // NOTE: return 2 variables 'seconds' and 'minutes', access it by obj.name
    return {
      seconds: seconds < 10 ? `0${seconds}` : seconds,
      minutes: minutes < 10 ? `0${minutes}` : minutes
    }
  })
}

const checkMatched = ref<IFullDeck>([])

let timerIntervalID: number | undefined = undefined

const startTheTimer = () => {
  if (!timerIntervalID) {
    timerIntervalID = setInterval(() => {
      if (COMPUTED.matchedPairs.value == FULLDECK.value.length / 2) {
        clearInterval(timerIntervalID)
        timerIntervalID = undefined
      } else {
        STATE.timer.value += 1
      }
    }, 1000)
  }
}

// FIXME: Need to guard, when user click same card twice !!
const handleCardClick = (card: TDeck) => {
  if (checkMatched.value.length < 2 && !checkMatched.value.includes(card) && !card.isMatch) {
    checkMatched.value.push(card)
    startTheTimer()
    card.isOpen = true
    STATE.playerClick.value += 1
    checkChosenCards()
  }
}

const matchedCard = (chosenCards: Ref<IFullDeck>) => {
  FULLDECK.value.forEach((card) => {
    if (chosenCards.value.some((cCard) => cCard.id == card.id)) {
      card.isMatch = true
    }
  })
}

const resetPick = (pick: Ref<IFullDeck>) => {
  setTimeout(() => {
    pick.value = []
  }, WAITIME)
  flipBack()
}

const flipBack = () => {
  setTimeout(() => {
    FULLDECK.value.forEach((deck) => !deck.isMatch && (deck.isOpen = false))
  }, WAITIME)
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

const handleReset = () => {
  FULLDECK.value = generateDecks(DECKNAMES)
  STATE.playerClick.value = 0
  clearInterval(timerIntervalID)
  timerIntervalID = undefined
  STATE.timer.value = 0
}
</script>

<template>
  <main
    v-if="!COMPUTED.isGameFinished.value"
    class="m-auto max-w-[1024px]"
  >
    <TheHeader
      :seconds-played="COMPUTED.timePlayed.value.seconds"
      :minutes-played="COMPUTED.timePlayed.value.minutes"
      :player-moves="COMPUTED.playerMoves.value"
      :matched-pairs="COMPUTED.matchedPairs.value"
      :total-pairs="FULLDECK.length / 2"
    />
    <CardsDeck
      :check-matched="checkMatched"
      :full-decks="FULLDECK"
      @card-click="(card) => handleCardClick(card)"
    />
    <TheReset @handle-reset="handleReset" />
  </main>
  <TheModal v-else />
</template>
