<script setup lang="ts">
import { DECKNAMES, WAITIME } from '@/utils/CONSTANT'
import { getURL, generateDecks } from '@/utils/helperfunctions'
import type { TDeck, IFullDeck } from '@/utils/types'
import { ref, computed, type Ref } from 'vue'

const FULLDECK = ref([...generateDecks(DECKNAMES)])

const congras = computed(() => {
  return FULLDECK.value.every((card) => card.isMatch)
})

const checkMatched = ref<IFullDeck>([])

const resetPick = (pick: Ref<IFullDeck>) => {
  pick.value = []
  flipBack()
}

const matchedCard = (chosenCards: Ref<IFullDeck>) => {
  FULLDECK.value.forEach((card) => {
    if (chosenCards.value.some((cCard) => cCard.id == card.id)) {
      card.isMatch = true
    }
  })
}

const flipBack = () => {
  setTimeout(() => {
    FULLDECK.value.forEach((deck) => (deck.isOpen = false))
  }, WAITIME)
}

const handleCardClick = (card: TDeck) => {
  card.isOpen = true
  checkMatched.value.push(card)
  checkChosenCards()
}

const checkChosenCards = () => {
  const cardLength = checkMatched.value.length
  const card1 = checkMatched.value[0]
  const card2 = checkMatched.value[1]

  if (!cardLength) return
  if (cardLength == 2) {
    if (card1.id == card2.id) {
      return
    } else if (card1.id != card2.id && card1.url == card2.url) {
      matchedCard(checkMatched)
      resetPick(checkMatched)

      return
    } else {
      resetPick(checkMatched)
    }
  }
}
</script>

<template>
  <div class="cards-deck">
    <div
      v-for="deck in FULLDECK"
      :key="deck.id"
      :class="` ${deck.isMatch ? 'disable' : 'deck'}`"
      @click="!deck.isMatch && handleCardClick(deck)"
    >
      <img :src="deck.isOpen || deck.isMatch ? getURL(deck.url) : getURL('covered')" />
    </div>
    <div v-show="congras">
      <h1>Congratulation</h1>
    </div>
  </div>
</template>
