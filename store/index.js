import Vuex from 'vuex'

import mutations from './mutations'
import services from './modules/services'

const createStore = () => {
  return new Vuex.Store({
    state: {
      counter: 0
    },
    modules: {
      services: services
    },
    mutations
  })
}

export default createStore