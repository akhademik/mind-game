<script setup lang="ts">
import { getURL } from '@/utils/helperfunctions'
import type { IFullDeck } from '@/utils/types'

defineProps<{ fullDecks: IFullDeck }>()
</script>

<template>
  <div class="cards-deck">
    <div
      v-for="deck in fullDecks"
      :key="deck.id"
      :class="` ${deck.isMatch ? 'disable' : 'deck'}`"
      @click="$emit('cardClick', deck)"
    >
      <img :src="deck.isOpen || deck.isMatch ? getURL(deck.url) : getURL('covered')" />
    </div>
  </div>
</template>
