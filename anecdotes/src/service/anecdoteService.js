const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {
  const response = await fetch(baseUrl)
  if (!response.ok) {
    throw new Error("could not fetch the anecdotes")
  }
  const data = await response.json()
  return data
}

const createNew = async (newAnecdote) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newAnecdote),
  })

  if (!response.ok) {
    throw new Error("could not save the anecdote")
  }
  return await response.json()
}

const updateVote = async (newAnecdote, id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newAnecdote),
  })

  if (!response.ok) {
    throw new Error("could not update the anecdote")
  }
  return await response.json()
}

const removeAnecdote = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, { method: "DELETE" })
  if (!response.ok) {
    throw new Error(
      "could not delete the object, please check whether it exists",
    )
  }
  return await response.json()
}

export default { getAll, createNew, updateVote, removeAnecdote }
