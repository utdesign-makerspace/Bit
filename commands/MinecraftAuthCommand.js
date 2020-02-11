const fetch = require("node-fetch");

function oAuthToUUID(token) {
   return fetch('https://mc-oauth.net/api/api?token', {
      method: "GET",
      headers: {
         "token": token
      }
   }).then(response => {
      return response.json();
   }).then(json => {
      return json.status === 'success' ? json.uuid : 'fail';
   });
}

oAuthToUUID(uuid => {
   if (uuid !== 'fail') {
      // Handle successful login
      console.log("You successfully authenticated your minecraft account!")
   } else {
      // Handle invalid token
      console.log("You failed to authenticate your minecraft account... Please try again")
   }
});