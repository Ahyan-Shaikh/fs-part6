import { create } from 'zustand'
import { getAll, createNew, updateVote, removeAnecdote } from "./service/anecdoteService"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => ({
  content: anecdote,
  id: getId(),
  votes: 0
})

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: "",
  actions: {
    incVote: async (anecdote) => {
      const updatedAnecdote = await updateVote(anecdote, anecdote.id)
      set(state => ({anecdotes: state.anecdotes.map(a => a.id === anecdote.id ? updatedAnecdote: a)}))
    },
    add: async (anecdote) => {
      const newAnecdote = {
        content: anecdote,
        votes: 0
      }
      const savedAnecdote = await createNew(newAnecdote)
      set(state => ({ anecdotes: state.anecdotes.concat(savedAnecdote) }))
    },
    remove: async (id) => {
      const deletedAnecdote = await removeAnecdote(id)
      set(state => ({ anecdotes: state.anecdotes.filter(a => a.id !== deletedAnecdote.id)}))
    },
    setFilter: (value) => set(() => ({ filter: value })),
    initialize: async () => {
      const anecdotes = await getAll()
      set(() => ({ anecdotes }))
    }
  },
}))
// Need to update this 
const useNotifyStore = create((set) => ({
  message: null,
  setMessage: (notify) => set(() => ({ message: notify }))
}))


export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore(state => state.anecdotes)
  const filter = useAnecdoteStore(state => state.filter).toLowerCase()

  if (filter !== "") {
    return anecdotes.filter(anecdote => {
      const content = anecdote.content.toLowerCase()
      return content.indexOf(filter) !== -1
    })
  }

  return anecdotes
}
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
export const useNotify = () => useNotifyStore((state) => state.message)
export const useSetNotify = () => useNotifyStore(state => state.setMessage)