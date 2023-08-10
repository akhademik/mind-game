<script setup lang="ts">
import { getURL } from '@/utils/helperfunctions'
import type { IFullDeck, TDeck } from '@/utils/types'

defineProps<{ fullDecks: IFullDeck; isShowingCards: boolean }>()
const baseStyle = `flex sm:h-[260px] h-[200px] w-full rounded border-2 transition-all duration-150 ease-in-out border-dashed`
const styleDeck = `${baseStyle}  hover:border-solid hover:border-amber-300 cursor-pointer hover:scale-110`
const styleDisabled = `${baseStyle} !border-solid border-red-500`
const styleFound = `${styleDisabled} opacity-75`

const chosenStyle = (card: TDeck) =>
  card.isMatch ? styleFound : card.isOpen ? styleDisabled : styleDeck
</script>

<template>
  <div class="grid grid-cols-4 gap-3 m-2 sm:grid-cols-3 lg:grid-cols-6">
    <div
      v-for="deck in fullDecks"
      :key="deck.id"
      :class="chosenStyle(deck)"
      @click="!isShowingCards && $emit('cardClick', deck)"
    >
      <img
        :src="deck.isOpen || deck.isMatch ? getURL(deck.url) : getURL('covered')"
        :class="`h-full w-full object-contain ${(deck.isOpen || deck.isMatch) && 'bg-white'}`"
      />
    </div>
  </div>
</template>
