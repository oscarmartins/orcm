module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'orcm',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    'iview/dist/styles/iview.css'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'iview'
    ],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [
    { 
      src: '~/plugins/iview.js', 
      ssr: true 
    }
  ],
  modules: [
    '@nuxtjs/auth',

     // ...Axios module should be included AFTER @nuxtjs/auth
    '@nuxtjs/axios'
 ],
 // Default Values
 auth: {
    user: {
      endpoint: 'auth/user',
      propertyName: 'user',
      resetOnFail: true,
      enabled: true,
      method: 'GET',
    },
    login: {
      endpoint: 'auth/login',
    },
    logout: {
      endpoint: 'auth/logout',
      method: 'GET',
    },
    redirect: {
      guest: true,
      user: true,
      notLoggedIn: '/login',
      loggedIn: '/'
    },
    token: {
      enabled: true,
      type: 'Bearer',
      localStorage: true,
      name: 'token',
      cookie: true,
      cookieName: 'token'
    },
    errorHandler: {
      fetch: null,
      logout: null
    }
},
  router: {
    middleware: [
      'auth',
    ]
  },
  axios: {
    proxyHeaders: true,
		credentials: false,
    baseURL: 'http://localhost:8081',
    requestInterceptor: (config, { store }) => {
            
      if (store.state.token) {
        console.log('store.state')
        config.headers.common['Authorization'] = store.state.token
      }
      
      return config
    },
    init: (axios, context) => { 
      console.log(axios.defaults.baseURL)
    }
  }
}
