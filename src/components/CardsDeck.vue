<script setup lang="ts">
import { FULLDECK } from '@/assets/CONSTANT'
import { getURL } from '@/utils/helperfunctions'
</script>

<template>
  <div class="cards-deck">
    <div v-for="deck in FULLDECK" :key="deck.id" class="deck">
      <img :src="getURL(deck.url)" />
    </div>
  </div>
</template>
