import request from "superagent"

const localApiUrl = '/api/v1/todos'

export async function getAllTodos() {
  const response = await request
    .get(localApiUrl)
  return response.body
}

export async function getTodoById(id) {
  const response = await request
    .get(`${localApiUrl}/${id}`)
  return response.body
}

export async function addTodo(data) {
  const response = await request
    .post(localApiUrl)
    .send(data)
  return response.body
}

export async function updateTodoById(id, data) {
  const reponse = await request
    .patch(`${localApiUrl}/${id}`)
    .send(data)
  return reponse.body
}

export async function deleteTodoById(id) {
  await request
    .delete(`${localApiUrl}/${id}`)
}
