interface IFullDeck extends Array<TDeck> {}
type TDeck = {
  id: number
  url: string
}

const shuffleDeck = (deck: string[]) => {
  return deck.sort(() => Math.random() - 0.5)
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

const generateDecks = (): IFullDeck => {
  const newDeck = shuffleDeck(shuffleDeck(shuffleDeck(DECKNAMES)))
  return newDeck.map((name: string) => ({
    id: newDeck.indexOf(name),
    url: name
  }))
}

export const FULLDECK = generateDecks()
