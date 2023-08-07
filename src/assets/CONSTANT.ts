import { v4 as uuid } from 'uuid'

interface IFullDeck extends Array<TDeck> {}
type TDeck = {
  id: string
  url: string
  isOpen: boolean
  isMatch: boolean
}

const DECKNAMES = [
  'bulldozer',
  'excavator',
  'garbage_truck',
  'hoisting_crane',
  'road_roller',
  'skid_loader',
  'tractor'
]

const shuffleDeck = (deck: string[]) => {
  return deck.sort(() => Math.random() - 0.5)
}

const generateDecks = (): IFullDeck => {
  const newDeck = shuffleDeck(shuffleDeck(shuffleDeck(DECKNAMES)))
  return newDeck.map((name) => ({
    id: uuid(),
    url: name,
    isOpen: false,
    isMatch: false
  }))
}

export const FULLDECK = generateDecks()
