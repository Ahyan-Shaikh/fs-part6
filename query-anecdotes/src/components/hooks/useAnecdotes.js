import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { getAnecdotes,  createNew, update } from "../../service"
import useNotify from "./useNotify"
export const useAnecdotes = () => {
  const queryClient = useQueryClient()

  // notification hook to get the error message and display it
  const { notifyWith } = useNotify()

  const addAnecdoteMuation = useMutation({
    mutationFn: createNew,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(anecdote))
    },
    onError: ({ message }) => {
      notifyWith(message)
    }
  })

  const updateVotesMutation = useMutation({
    mutationFn: update,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(a => a.id === updatedAnecdote.id ? updatedAnecdote: a))
    }
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })


  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => {
      addAnecdoteMuation.mutate(content)
    },
    updateVote: (anecdote) => {
      updateVotesMutation.mutate({ ...anecdote, votes: anecdote.votes + 1})
    }
  }
}