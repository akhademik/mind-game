import { v4 as uuid } from 'uuid'
import type { IFullDeck, TDeck } from './types'

export const getURL = (url: string) => {
  return new URL(`../assets/img/${url}.png`, import.meta.url).href
}

export const shuffleDeck = <T>(deck: T[]): T[] => {
  const shuffled = [...deck]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const generateDecks = (decknames: string[]): IFullDeck => {
  // clone names 2 times to make a new array with 2 set of cards
  const cloneDecknames = [...decknames, ...decknames]
  return shuffleDeck(cloneDecknames).map((name) => {
    const singleDeck: TDeck = {
      id: uuid(),
      url: name,
      isOpen: false,
      isMatch: false
    }
    return singleDeck
  })
}
