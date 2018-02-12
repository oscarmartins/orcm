import Cookie from 'cookie'
import Cookies from 'js-cookie'
const endpoint = '/services'
const parameters = (rc, ra, ri) => { return {REQ_CONTEX: rc, REQ_ACTION: ra, REQ_INPUTS: ri} }
const services = {
  namespaced: true,
  state: {
    orctoken: ((process.browser && localStorage) ? localStorage.getItem('token') : null),
    user: ((process.browser && localStorage) ? localStorage.getItem('user') : null)
  },
  mutations: {
    // SET_USER
    SET_USER (state, user) {
        state.user = user
    },
    // SET_TOKEN
    SET_TOKEN (state, token) {
      state.orctoken = token
    }
  },
  actions: {
    // Reset
    async reset ({ dispatch, commit }) {
        await dispatch('updateUser', null)
        await dispatch('updateToken', null)
    },
    // Update token
    async updateUser ({commit}, profile) {
        // Update token in store's state
        commit('SET_USER', profile)
        // Update localStorage
        if (process.browser && localStorage) {
            if (profile) {
              localStorage.setItem('user', profile)
            } else {
              localStorage.removeItem('user')
            }
          } 
    },
    async updateToken ({ commit }, token) {
        // Update token in store's state
        commit('SET_TOKEN', token)  
        // Set Authorization token for all axios requests
        this.$axios.setToken(token, 'Bearer')        
        // Update localStorage
        if (process.browser && localStorage) {
          if (token) {
            localStorage.setItem('token', token)
          } else {
            localStorage.removeItem('token')
          }
        } 
        
        // Update cookies
        if (process.browser) {
          // ...Browser
          if (token) {
            Cookies.set('token', token)
          } else {
            Cookies.remove('token')
          }
        } else {
          // ...Server
          let params = {
            domain: '/'
          }
          if (!token) {
            let expires
            let date = new Date()
            expires = date.setDate(date.getDate() - 1)
            params.expires = new Date(expires)
          }
          this.app.context.res.setHeader('Set-Cookie', Cookie.serialize('token', token, params))
        }
        
      },
      async signup (context, payload) {
        let data = await this.$axios.$post(endpoint, parameters(1000, 1010, payload)).then(function(resp){
            return resp
        }).catch(function(err, resp){
            if (err) {
                console.log(err)
            }
            return err
        })
        if (data) {
            console.log(data)
        }
        return data
      },
      async signin ({dispatch}, payload) {
        var data = null
        try {
            debugger
            await dispatch('reset')
            data = await this.$axios.$post(endpoint, parameters(2000, 2010, payload)).then(function(resp){
                return resp
            })
            if (data) {
                const {access_token, profile} = data
                /**
                 * store token 
                 * redirect to dashboard
                 */
                await dispatch('updateUser', profile)
                await dispatch('updateToken', access_token)
                $nuxt.$router.push({name: 'app-dashboard'})
            }
        } catch (error) {
            debugger
            await dispatch('reset')
        }
        return data
      }
  },
  getters: {
    loggedIn (state) {
      debugger  
      return Boolean(state.user && state.orctoken)
    },
    accountValidation (state) {
      return true
    }
  }
}
export default services
