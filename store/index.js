import Vuex from 'vuex'

const state = {
  counter: 0
}
const mutations = {
  increment (state) {
    state.counter++
  }
}

const instance = {
  state: state,
  mutations: mutations
}

const createStore = () => {
  return new Vuex.Store(instance)
}

export default createStore