import axios from 'axios'


const userId = localStorage.getItem("userId") || "";
const BaseURL = `https://takenote-d0374.firebaseio.com/`
axios.defaults.baseURL = `${BaseURL}${userId}`
// const BaseURL = 'https://takenote-d0374.firebaseio.com/user2/workspaces'

export default {
  setBaseURL(userId){
    const urrl = `${BaseURL}${userId}`
    axios.defaults.baseURL = `${BaseURL}${userId}`
  },
  signIn(info) {
    return axios.post(info.link, {
      email: info.user.email,
      password: info.user.password,
      returnSecureToken: info.user.returnSecureToken
    })
  },
  saveNewWorkspace(ws) {
    // const URL = `${BaseURL}.json`
    return axios.post('.json', ws)
  },
  getWorkspaces() {
    // const URL = `${BaseURL}.json`
    return axios.get('.json')
  },
  deleteWorkspace(key) {
    const deleteURL = `/${key}.json`
    return axios.delete(deleteURL)
  },
  editWorkspace(editedWorkspace) {
    const editURL = `/${editedWorkspace.key}.json`
    return axios.put(editURL, editedWorkspace)
  },

  // CARD TRANSACTİONS

  getCards(key) {
    const editURL = `/${key.key}/tasks.json`
    return axios.get(editURL)
  },
  addNewCard(card) {
    const addURL = `/${card.key}/tasks/${card.i}/cards.json `
    return axios.post(addURL, card.newCard)
  },
  deleteCard(infos) {
    const cardDeleteURL = `/${infos.activeWsKey}/tasks/${infos.stage}/cards/${infos.cardKey}.json`
    return axios.delete(cardDeleteURL)
  },
  moveCard(infos) {
    const addURL = ` /${infos.activeWsKey}/tasks/${infos.stage}/cards.json `
    return axios.post(addURL, infos.card)
  },
  updateCardInfos(infos) {
    const reOrderURL = `/${infos.activeWsKey}/tasks/${infos.stage}/cards/${infos.card.key}.json `
    return axios.put(reOrderURL, infos.card)
  }
}
