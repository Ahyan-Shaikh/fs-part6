import { useAnecdoteActions, useSetNotify } from "../store"

const AnecdoteForm = () => {
  const { add } = useAnecdoteActions()
  const setNofify = useSetNotify()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    await add(anecdote)
    e.target.reset()
    setNofify(`You added '${anecdote}'`)
    setInterval(() => {
      setNofify(null)
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={ handleSubmit }>
        <div>
          <input data-testid="new" name="anecdote"/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}
export default AnecdoteForm