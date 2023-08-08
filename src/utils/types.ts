export type TDeck = {
  id: string
  url: string
  isOpen: boolean
  isMatch: boolean
}
export interface IFullDeck extends Array<TDeck> {}
