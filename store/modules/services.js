import Cookie from 'cookie'
import Cookies from 'js-cookie'
const endpoint = '/services'
const parameters = (rc, ra, ri) => { return {REQ_CONTEX: rc, REQ_ACTION: ra, REQ_INPUTS: ri} }
const services = {
  namespaced: true,
  state: {
    token: null,
    user: null
  },
  mutations: {
    // SET_USER
    SET_USER (state, user) {
        state.user = user
    },
    // SET_TOKEN
    SET_TOKEN (state, token) {
      state.token = token
    }
  },
  actions: {

      // Update token
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
      async signin (context, payload) {
        let data = await this.$axios.$post(endpoint, parameters(2000, 2010, payload)).then(function(resp){
            debugger
            console.log(context)
            /**
             * store token 
             * redirect to dashboard
             */
            $nuxt.$router.push({name: 'about'})
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
      }
  },
  getters: {
    loggedIn (state) {
      return Boolean(state.user && state.token)
    }
  }
}
export default services
