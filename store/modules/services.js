import Cookie from 'cookie'
import Cookies from 'js-cookie'
const endpoint = '/services'
const parameters = (rc, ra, ri) => { return {REQ_CONTEX: rc, REQ_ACTION: ra, REQ_INPUTS: ri} }
const services = {
  namespaced: true,
  state: {
    user: {},
    isSigned: {}
  },
  mutations: {},
  actions: {
      async signup (context, payload) {
        let data = await this.$axios.$post(endpoint, parameters(1000, 1010, payload)).then(function(resp){
            debugger
            return resp
        }).catch(function(err, resp){
            if (err) {

            }
            debugger
            return err
        })
        debugger
        if (data) {
            console.log(data)
        }
        return data
      }
  },
  getters: {}
}
export default services
