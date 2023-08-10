<script setup lang="ts">
import { getURL } from '@/utils/helperfunctions'
import type { IFullDeck } from '@/utils/types'

defineProps<{ fullDecks: IFullDeck; isShowingCards: boolean }>()
const styleDeck =
  'flex sm:h-[260px] h-[200px] w-full cursor-pointer rounded border border-dashed transition-all duration-150 ease-in-out hover:scale-110 hover:border-solid hover:border-amber-300'
const styleFound = `${styleDeck} + '!border-red-300'`
const styleDisabled = ''
</script>

<template>
  <div class="m-2 grid grid-cols-4 gap-3 sm:grid-cols-3 lg:grid-cols-6">
    <div
      v-for="deck in fullDecks"
      :key="deck.id"
      :class="deck.isMatch ? styleFound : isShowingCards ? styleDisabled : styleDeck"
      @click="!isShowingCards && $emit('cardClick', deck)"
    >
      <img
        :src="deck.isOpen || deck.isMatch ? getURL(deck.url) : getURL('covered')"
        class="h-full w-full object-contain"
      />
    </div>
  </div>
</template>

<!-- :class="` ${deck.isMatch ? 'found' : isShowingCards ? 'disable' : 'deck'}`" -->
<!-- :class="
        deck.isMatch
          ? 'border-solid bg-white'
          : isShowingCards
          ? 'border-2 border-red-300 text-white'
          : 'flex h-[200px] w-full cursor-pointer rounded border border-dashed transition-all duration-150 ease-in-out hover:scale-110 hover:border-solid hover:border-amber-300 sm:h-[260px]'
      " -->
