import { create } from 'zustand'
import anecodteService from "./service/anecdoteService"

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

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: "",
  actions: {
    incVote: async (id) => {
      const anecdote = get().anecdotes.find(a => a.id === id)
      const newAnecdote = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      const updatedAnecdote = await anecodteService.updateVote(newAnecdote, id)
      set(state => ({
        anecdotes: state.anecdotes.map(a => a.id === id ? updatedAnecdote: a)
      }))
    },
    add: async (anecdote) => {
      const newAnecdote = {
        content: anecdote,
        votes: 0
      }
      const savedAnecdote = await anecodteService.createNew(newAnecdote)
      set(state => ({ anecdotes: state.anecdotes.concat(savedAnecdote) }))
    },
    remove: async (id) => {
      const deletedAnecdote = await anecodteService.removeAnecdote(id)
      set(state => ({ anecdotes: state.anecdotes.filter(a => a.id !== deletedAnecdote.id)}))
    },
    setFilter: (value) => set(() => ({ filter: value })),
    initialize: async () => {
      const anecdotes = await anecodteService.getAll()
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
  let anecdotes = useAnecdoteStore(state => state.anecdotes)
  const filter = useAnecdoteStore(state => state.filter).toLowerCase()

  // sorting the anecdotes
  anecdotes = anecdotes.toSorted((a, b) => {
    const result = a.votes - b.votes
    if (result < 0) return 1
    else if (result > 0) return -1
    return 0
  })

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
export default useAnecdoteStore