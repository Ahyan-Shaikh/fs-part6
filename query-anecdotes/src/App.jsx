import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes } from './components/hooks/useAnecdotes'

const App = () => {

  const { anecdotes, updateVote, isPending, isError } = useAnecdotes()

  const handleVote = (anecdote) => {
    updateVote(anecdote)
  }

  if (isPending) {
    return <div>Loading data...</div>
  }
  
  if (isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App