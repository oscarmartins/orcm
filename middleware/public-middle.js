export default async function (context) {
  try {
    debugger    
    const {store, redirect, route} = context
    // If user is already logged in, redirect to /
    if (store.getters['services/loggedIn']) {
      return redirect('/signin')
    }
  } catch (error) {
    debugger
    console.log(error)
  }
}
