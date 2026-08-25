import { create } from "zustand"

const useFeedbackStore = create(set => ({
  good: 0,
  neutral: 0,
  bad: 0,
  actions: {
    incGood: () => set(state => ({ good: state.good + 1 })),
    incNeutral: () => set(state => ({ neutral: state.neutral + 1})),
    incBad: () => set(state => ({ bad: state.bad + 1}))
  }
}))

export const useGood = () => useFeedbackStore(state => state.good)
export const useNeutral = () => useFeedbackStore(state => state.neutral)
export const useBad = () => useFeedbackStore(state => state.bad)

export const useIncGood = () => useFeedbackStore(state => state.actions.incGood)
export const useIncNeutral = () => useFeedbackStore(state => state.actions.incNeutral)
export const useIncBad = () => useFeedbackStore(state => state.actions.incBad)