import axios from 'axios'

const BaseURL = 'https://takenote-d0374.firebaseio.com/user2/workspaces'

export default {
  saveNewWorkspace(ws) {
    const URL = `${BaseURL}.json`
    return axios.post(URL, ws)
  },
  getWorkspaces() {
    const URL = `${BaseURL}.json`
    return axios.get(URL)
  },
  deleteWorkspace(key) {
    const deleteURL = `${BaseURL}/${key}.json`
    return axios.delete(deleteURL)
  },
  editWorkspace(editedWorkspace) {
    const editURL = `${BaseURL}/${editedWorkspace.key}.json`
    return axios.put(editURL, editedWorkspace)
  },

  // CARD TRANSACTİONS

  getCards(key) {
    const editURL = `${BaseURL}/${key.key}/tasks.json`
    return axios.get(editURL)
  },
  addNewCard(card) {
    const addURL = ` ${BaseURL}/${card.key}/tasks/${card.i}/cards.json `
    return axios.post(addURL, card.newCard)
  },
  deleteCard(infos) {
    const cardDeleteURL = `${BaseURL}/${infos.activeWsKey}/tasks/${infos.stage}/cards/${infos.cardKey}.json`
    return axios.delete(cardDeleteURL)
  },
  moveCard(infos) {
    const addURL = ` ${BaseURL}/${infos.activeWsKey}/tasks/${infos.stage}/cards.json `
    return axios.post(addURL, infos.card)
  },
  updateCardInfos(infos) {
    const reOrderURL = ` ${BaseURL}/${infos.activeWsKey}/tasks/${infos.stage}/cards/${infos.card.key}.json `
    return axios.put(reOrderURL, infos.card)
  },
}
