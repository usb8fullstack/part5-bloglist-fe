import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config = {}

const setToken = newToken => {
  token = `bearer ${newToken}`
  config = {
    headers: { Authorization: token },
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const del = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.status
}
export default { getAll, create, setToken, update, del }