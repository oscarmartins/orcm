export default function (context) {
   
   const {isServer, req} = context
   if (isServer && !req) return  // If nuxt generate, pass this middleware   
 }
 