import Vue from 'vue'
import Vuex from 'vuex'
import service from './service'
import router from './router.js'

Vue.use(Vuex)

const state = {
  apikey: 'AIzaSyBNvrRFUiooJpIZYFvsCVdBUbLmmos3NQY',
  token: localStorage.getItem('token') || '',
  authMessage: {
    message: '',
    error: false
  },
  activeWsKey: localStorage.getItem('activeKey'),
  tasks: [],
  workspaces: []
}
const getters = {
  getWorkspaces: state => state.workspaces,
  getTasks: state => state.tasks,
  getAuthMessage: state => state.authMessage,
  isUserExist: state => !!state.token
}
const mutations = {}
const actions = {
  signIn({ state }, authInfo) {
    let authLink = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${state.apikey}`
    authInfo.link = authLink
    service
      .signIn(authInfo)
      .then(() => {
        const message = 'Registration is successful! You can login to start'
        state.authMessage.error = false
        state.authMessage.message = message
      })
      .catch(err => {
        state.authMessage.error = true
        state.authMessage.message = err.response.data.error.message
      })
  },
  login({ state, dispatch }, authInfo) {
    let authLink = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${state.apikey}`
    authInfo.link = authLink
    service
      .signIn(authInfo)
      .then(response => {
        const token = response.data.idToken
        const id = response.data.localId
        state.token = token
        localStorage.setItem('token', token)
        localStorage.setItem('userId', id)
        service.setBaseURL(id)
        router.push({ name: 'HandleWorkspaces' })
      })
      .catch(err => {
        state.authMessage.error = true
        state.authMessage.message = err.response.data.error.message
      })
  },
  logout({ state, dispatch }) {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    state.token = ''
    router.push({ name: 'Login' })
  },
  getWorkspaces({ state, dispatch }) {
    service.getWorkspaces().then(response => {
      const data = response.data
      let workspaces = []
      for (let key in data) {
        data[key].key = key
        workspaces.push(data[key])
      }
      state.workspaces = workspaces
    })
  },
  saveNewWorkspace({ state, dispatch }, workspace) {
    service.saveNewWorkspace(workspace).then(response => {
      state.workspaces.push({ ...workspace, key: response.data.name })
    })
  },
  deleteWorkspace({ state, dispatch }, key) {
    service.deleteWorkspace(key).then(() => {
      state.workspaces.map((item, i) => {
        if (item.key == key) state.workspaces.splice(i, 1)
      })
    })
  },
  editWorkspace({ state, dispatch }, editedWorkspace) {
    return service.editWorkspace(editedWorkspace).then(() => {
      state.workspaces.map((item, i) => {
        if (item.key == editedWorkspace.key) {
          state.workspaces[i].name = editedWorkspace.name
          state.workspaces[i].path = editedWorkspace.path
        }
      })
    })
  },
  // CARD TRANSACTİONS
  getTasks({ state }) {
    service.getCards({ key: state.activeWsKey }).then(response => {
      if (response.data == null) {
        state.tasks = []
        return
      }
      const data = response.data
      data.map(item => {
        let cards = []
        for (let key in item.cards) {
          if (key.length > 2) {
            item.cards[key].key = key
            cards.push(item.cards[key])
          } else {
            cards.push(item.cards[key])
          }
        }
        const sortedCards = cards.sort((a, b) =>
          a.order > b.order ? 1 : b.order > a.order ? -1 : 0
        )
        item.cards = sortedCards
        cards = []
      })
      state.tasks = data
    })
  },
  addNewCard({ state, dispatch }, card) {
    service.addNewCard(card).then(response => {
      state.tasks[card.i].cards.push({
        ...card.newCard,
        key: response.data.name
      })
    })
  },
  deleteCard({ state, dispatch }, infos) {
    service.deleteCard(infos).then(() => {
      if (infos.updateTasks) {
        const index = state.tasks[infos.stage].cards.findIndex(
          c => c.key == infos.cardKey
        )
        state.tasks[infos.stage].cards.splice(index, 1)
      }
    })
  },
  moveCard({ state, dispatch }, infos) {
    service.moveCard(infos).then(response => {
      state.tasks[infos.stage].cards.map(c => {
        if (c.key == infos.key) {
          c.key = response.data.name
        }
      })
    })
  },
  updateCardInfos({dispatch }, infos) {
    service.updateCardInfos(infos)
  }
}
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
