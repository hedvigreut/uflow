const DinnerModel = function () {

  var firebase = require("firebase");

  this.googleLogin = function() {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithPopup(provider)

        .then(result => {
          const user = result.user;
          window.location = 'signup';
          console.log(user)
        })
        .catch(console.log);

  }
}

export const modelInstance = new DinnerModel();
