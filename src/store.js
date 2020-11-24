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
  getTasks({state},dispatch){
    service.getCards({key: state.activeWsKey}).then(response => {
      const data = response.data
      const tasks = []
      for(let key in data){
        data[key].key = key
        tasks.push(data[key])
      }
      state.tasks = tasks
      
    })
  },
  addNewCard({state,dispatch},card){
    service.addNewCard(card).then(response => {
      console.log(response);
      console.log(state.workspaces)
    })
  },

}
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
