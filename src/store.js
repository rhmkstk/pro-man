import Vue from 'vue'
import Vuex from 'vuex'
import service from './service'

Vue.use(Vuex)

const state = {
  workspaces: [],
  activeWsKey: localStorage.getItem('activeKey'),
  tasks: []
}
const getters = {
  getWorkspaces: state => state.workspaces,
  getTasks: state => state.tasks
}
const mutations = {}
const actions = {
  getWorkspaces({ state, dispatch }) {
    service.getWorkspaces().then(response => {
      const data = response.data
      let workspaces = []
      for (let key in data) {
        data[key].key = key
        workspaces.push(data[key])
      }
      // workspaces.map(ws => {
      //   let cards = []
      //   for(let key in ws.cards){
      //     ws.cards[key].key = key
      //     cards.push(ws.cards[key])
      //   }
      //   ws.cards = cards;
      //   cards = []
      // })
      state.workspaces = workspaces
      console.log(state.workspaces)
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
    return service.editWorkspace(editedWorkspace).then(response => {
      state.workspaces.map((item, i) => {
        if (item.key == editedWorkspace.key)
          state.workspaces[i].name = editedWorkspace.name
      })
    })
  },
  // CARD TRANSACTİONS
  getTasks({ state }, dispatch) {
    service.getCards({ key: state.activeWsKey }).then(response => {
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
      if(infos.updateTasks) {
        const index = state.tasks[infos.stage].cards.findIndex(c => c.key == infos.cardKey)
        state.tasks[infos.stage].cards.splice(index,1)
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
  updateCardInfos({ state, dispatch }, infos) {
    service.updateCardInfos(infos)
  },
}
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
