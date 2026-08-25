import { useFeedbackStore } from "../store"

const Buttons = () => {
  const incGood = useFeedbackStore(state => state.actions.incGood)
  const incNeutral = useFeedbackStore(state => state.actions.incNeutral)
  const incBad = useFeedbackStore(state => state.actions.incBad)
  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={incGood}>good</button>
      <button onClick={incNeutral}>neutral</button>
      <button onClick={incBad}>bad</button>
    </div>
  )
}

export default Buttons
