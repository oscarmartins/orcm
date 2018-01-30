export default async function (context) {
  try {
    debugger
    const { req, store, redirect } = context
    if (process.server && !req) return // If nuxt generate, pass this middleware
    if (store.state.counter === 2) {
      store.commit('reset')
      console.log('redirect')
      redirect('/auth/login');
    }
  } catch (error) {
    console.log(error)
  }


}
