<script setup lang="ts">
import TheHeader from './components/TheHeader.vue'
import CardsDeck from './components/CardsDeck.vue'
import { DECKNAMES, WAITIME } from './utils/CONSTANT'
import { generateDecks } from './utils/helperfunctions'

import type { IFullDeck, TDeck } from './utils/types'
import type { Ref } from 'vue'
import { computed, ref } from 'vue'

const FULLDECK = ref([...generateDecks(DECKNAMES)])
const checkMatched = ref<IFullDeck>([])
const isShowingCards = ref(false)
const timer = ref<number>(0)
const playerClick = ref(0)
const playerMoves = computed(() => Math.floor(playerClick.value / 2))

const matched = computed(() => {
  // NOTE: Run through elements, if element isMatch true then +1 to acc, if false add 0
  // Array.reduce((acc,element) => acc + element, initAcc)
  // Last one, if count is 0 then print 0, if more than 0 then / 2
  const count = FULLDECK.value.reduce((acc, deck) => acc + (deck.isMatch ? 1 : 0), 0)
  return count === 0 ? 0 : count / 2
})

let timerIntervalID: number | undefined = undefined

// NOTE: LOGIC FOR PLAYER STATS
const timePlayed = computed(() => {
  let seconds = timer.value % 60
  let minutes = Math.floor(seconds / 60)
  return {
    seconds: seconds < 10 ? `0${seconds}` : seconds,
    minutes: minutes < 10 ? `0${minutes}` : minutes
  }
})

const startTheTimer = () => {
  if (!timerIntervalID) {
    timerIntervalID = setInterval(() => {
      if (matched.value == FULLDECK.value.length / 2) {
        clearInterval(timerIntervalID)
        timerIntervalID = undefined
      } else {
        timer.value += 1
      }
    }, 1000)
  }
}

const handleCardClick = (card: TDeck) => {
  if (checkMatched.value.length === 2) {
    return
  } else {
    checkMatched.value.push(card)
    startTheTimer()
    card.isOpen = true
    playerClick.value += 1
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
  isShowingCards.value = true
  setTimeout(() => {
    FULLDECK.value.forEach((deck) => !deck.isMatch && (deck.isOpen = false))
    isShowingCards.value = false
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
</script>

<template>
  <main class="m-auto max-w-[1024px] items-center justify-center">
    <TheHeader
      :seconds-played="timePlayed.seconds"
      :minutes-played="timePlayed.minutes"
      :player-moves="playerMoves"
      :matched-pair="matched"
      :full-decks="FULLDECK"
    />
    <CardsDeck
      :check-matched="checkMatched"
      :full-decks="FULLDECK"
      @card-click="(card) => handleCardClick(card)"
    />
  </main>
</template>
