<script setup lang="ts">
import { getURL } from '@/utils/helperfunctions'
import type { IFullDeck, TDeck } from '@/utils/types'

defineProps<{
  fullDecks: IFullDeck
}>()
const emit = defineEmits(['cardClick'])

const handleCardClick = (card: TDeck) => {
  emit('cardClick', card)
}
</script>

<template>
  <div class="cards-deck">
    <div
      v-for="deck in fullDecks"
      :key="deck.id"
      :class="` ${deck.isMatch ? 'disable' : 'deck'}`"
      @click="handleCardClick(deck)"
    >
      <img :src="deck.isOpen || deck.isMatch ? getURL(deck.url) : getURL('covered')" />
    </div>
  </div>
</template>
