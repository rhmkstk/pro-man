import axios from 'axios'

const URL = 'https://takenote-d0374.firebaseio.com/user2/workspaces.json'

export default {
  saveNewWorkspace(ws) {
    return axios.post(URL, ws)
  },
  getWorkspaces() {
    return axios.get(URL)
  },
  deleteWorkspace(key) {
    const trimUrl = URL.substr(0, URL.length - 5)
    const deleteURL = `${trimUrl}/${key}.json`
    return axios.delete(deleteURL)
  },
  editWorkspace(editedWorkspace) {
    const trimUrl = URL.substr(0, URL.length - 5)
    const editURL = `${trimUrl}/${editedWorkspace.key}.json`
    return axios.put(editURL, editedWorkspace)
  },

  // CARD TRANSACTİONS
  getCards(key) {
    const trimUrl = URL.substr(0, URL.length - 5)
    const editURL = `${trimUrl}/${key.key}/cards.json`
    return axios.get(editURL)
  },
  addNewCard(card) {
    const trimUrl = URL.substr(0, URL.length - 5)
    const addURL = ` ${trimUrl}/${card.key}/cards.json `
    return axios.post(addURL, card.newCard)
  }
}
