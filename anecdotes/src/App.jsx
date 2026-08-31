import { useEffect } from "react"
import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Filter from "./components/Filter"
import { useAnecdoteActions, useNotify } from "./store"
import Notification from "./components/Notification"

const App = () => {
  const { initialize } = useAnecdoteActions()
  const notification = useNotify()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification notification={notification}/>
      <Filter />
      <AnecdoteList/>
      <AnecdoteForm />
    </div>
  )
}

export default App
