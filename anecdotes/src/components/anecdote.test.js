import { renderHook, act, render } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"

vi.mock("../service/anecdoteService", () => ({
  default: {
    getAll: vi.fn(),
    updateVote: vi.fn(),
  }
}))

import anecdoteService from "../service/anecdoteService"
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from "../store"


beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: "" })
  vi.clearAllMocks()
})

describe('anecdotes tests', () => {
  it('initilaized the state with returned anecdotes', async () => {
    const mockAnecdotes = [{ id: 1, content: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", votes: 0 }]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockAnecdotes)
  })

  it("anecdotes returned by store are sorted", async () => {
    const initialAnecdotes = [
      {
        id: 1,
        content: 'If it hurts, do it more often',
        votes: 0,
      },
      {
        id: 2,
        content: 'Premature optimization is the root of all evil.',
        votes: 5,
      }
    ]
    useAnecdoteStore.setState({ anecdotes: initialAnecdotes })
    const { result } = renderHook(() => useAnecdotes())

    expect(result.current[0].votes).toBeGreaterThan(result.current[initialAnecdotes.length -1].votes)
  })

  it("display correctly filtered anecdotes", async () => {
    const initialAnecdotes = [
      {
        id: 1,
        content: 'If it hurts, do it more often',
        votes: 0,
      },
      {
        id: 2,
        content: 'Premature optimization is the root of all -evil.',
        votes: 5,
      }
    ]
    useAnecdoteStore.setState({ anecdotes: initialAnecdotes })

    const { result } = renderHook(() => useAnecdoteActions())
    result.current.setFilter("hurts")

    const { result: anecdoteResults } = renderHook(() => useAnecdotes())
    expect(anecdoteResults.current[0].content).toBe('If it hurts, do it more often')
  })

  it("voting increases votes of anecdotes", async () => {
    const anecdote = { id: 1, content: 'If it hurts, do it more often', votes: 0 }
    useAnecdoteStore.setState({ anecdotes: [anecdote] })

    anecdoteService.updateVote.mockResolvedValue({ ...anecdote, votes: 1})

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.incVote(1)
    })
    const { result: anecdotesResult } = renderHook(() => useAnecdotes())

    expect(anecdotesResult.current[0].votes).toBe(1)
  })
})