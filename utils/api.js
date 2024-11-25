import axios from 'axios'

const BASE_URL = "http://localhost:8000/"

async function getAllDestinations() {
    const endpoint = BASE_URL + "destinations/"

    try {
        const response = await axios.get(endpoint)
        return response.data
    } catch (err) { console.error(err) }
}

async function getDestinationById(id) {
    const endpoint = BASE_URL + "destinations/" + id

    try {
        const response = await axios.get(endpoint)
        return response.data
    } catch (err) { console.error(err) }
}

async function createDestination(name, description, difficulty, favorites) {
    const endpoint = BASE_URL + "destinations/"

    let destination = { name, description, difficulty, favorites }

    try {
        const response = await axios.post(endpoint, destination)
        return response.data
    } catch (err) { console.error(err) }
}

async function updateDestination(id, name, description, difficulty, favorites) {
    const endpoint = BASE_URL + "destinations/" + id

    let destination = { name, description, difficulty, favorites }

    try {
        const response = await axios.put(endpoint, destination)
        return response.data
    } catch (err) { console.error(err) }
}

async function deleteDestination(id) {
    const endpoint = BASE_URL + "destinations/" + id

    try {
        const response = await axios.delete(endpoint)
        return response.data
    } catch (err) { console.error(err) }
}

export { getAllDestinations, getDestinationById, createDestination, updateDestination, deleteDestination }