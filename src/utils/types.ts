import type { ComputedRef } from 'vue'

export type TDeck = {
  id: string
  url: string
  isOpen: boolean
  isMatch: boolean
}
export interface IFullDeck extends Array<TDeck> {}

export interface IComputed {
  matchedPairs: ComputedRef<number>
  isGameFinished: ComputedRef<boolean>
  playerMoves: ComputedRef<number>
  timePlayed: ComputedRef<{
    seconds: number | string
    minutes: number | string
  }>
}
