export default async function (context) {
  try {
    debugger    
    const {store, redirect, route} = context
    if (!store.getters['services/loggedIn']) {
      return redirect('/signin')
    }
    // check route 
    debugger
    const next_redirect = '/app/account-validate' 
    if (route.fullPath !== next_redirect && store.getters['services/accountValidation']) {
      return redirect(next_redirect)
    }
  } catch (error) {
    debugger
    console.log(error)
  }
}
