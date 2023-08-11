<script setup lang="ts">
import { getURL } from '@/utils/helperfunctions'
import type { IFullDeck, TDeck } from '@/utils/types'

const props = defineProps<{
  fullDecks: IFullDeck
  checkMatched: TDeck[]
}>()

const cssBase = {
  deck: 'flex sm:h-[260px] h-[200px] w-full rounded border-2 transition-all duration-150  ease-in-out border-dashed'
}

const css = {
  deck: {
    unclickable: `${cssBase.deck} `,
    isOpen: `${cssBase.deck} !border-solid border-amber-300`,
    isFound: `${cssBase.deck} !border-solid border-4 border-red-500 opacity-75`,
    normal: `${cssBase.deck} hover:border-solid hover:border-amber-300 cursor-pointer hover:scale-110`
  }
}

const chosenCSS = (deck: TDeck) =>
  deck.isOpen && deck.isMatch
    ? css.deck.isFound
    : deck.isOpen
    ? css.deck.isOpen
    : css.deck.unclickable
</script>

<template>
  <div class="grid grid-cols-4 gap-3 m-2 sm:grid-cols-3 lg:grid-cols-6">
    <div
      v-for="deck in fullDecks"
      :key="deck.id"
      @click="$emit('cardClick', deck)"
    >
      <div
        v-if="deck.isOpen || deck.isMatch"
        :class="chosenCSS(deck)"
      >
        <img
          :src="getURL(deck.url)"
          class="`h-full w-full bg-white object-contain"
        />
      </div>
      <!-- no need to worry below -->
      <div
        v-else
        :class="props.checkMatched.length !== 2 ? css.deck.normal : css.deck.unclickable"
      >
        <img
          src="@/assets/img/covered.png"
          class="`h-full w-full object-contain"
        />
      </div>
    </div>
  </div>
</template>
