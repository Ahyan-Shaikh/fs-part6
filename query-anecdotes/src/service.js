const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await fetch(`${baseUrl}`)

  if (!response.ok) {
    throw new Error('Something went wrong whilst fetching the anecdotes')
  }
  return await response.json()
}

export const createNew = async (content) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 })
  }
  const response = await fetch(`${baseUrl}`, options)

  if (!response.ok) {
    throw new Error('Failed to create new anecdote')
  }
  return await response.json()
}

export const update = async (updatedAnecdote) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedAnecdote)
  }

  const response = await fetch(`${baseUrl}/${updatedAnecdote.id}`, options)

  if (!response.ok) {
    throw new Error('Failed to update the vote')
  }
  return await response.json()
}
