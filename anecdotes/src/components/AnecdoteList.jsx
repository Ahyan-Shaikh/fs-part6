import { useAnecdoteActions, useAnecdotes, useSetNotify } from "../store"

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { incVote, remove } = useAnecdoteActions()
  const setNotify = useSetNotify()

  const vote = async (id) => {
    const anecdote = anecdotes.find(a => a.id === id)
    await incVote({
      ...anecdote,
      votes: anecdote.votes + 1
    })

    setNotify(`you voted '${anecdote.content}'`)
    setInterval(() => {
      setNotify(null)
    }, 5000)
  }

  const handleRemove = async (anecdote) => {
    await remove(anecdote.id)
    setNotify('You can only delete anecdote with zero votes')
    setInterval(() => {
      setNotify(null)
    }, 5000)
  }

  const sortedAnecdotes = anecdotes.toSorted((a, b) => {
    const result = a.votes - b.votes
    if (result < 0) return 1
    else if (result > 0) return -1
    return 0
  })

  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
            { anecdote.votes > 0 ? null: <button onClick={() => handleRemove(anecdote)}>delete</button>}
          </div>
        </div>
      ))}
    </>
  )
}
// 2 3 4 3
export default AnecdoteList