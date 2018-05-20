const Model = function () {

  let filter = "";
  let observers = [];
  var firebase = require("firebase");
  const key = 'AIzaSyAOYG1Ai4mZy6L-ifZgQ8bzS87vA6v3JdA';
  var profileUser = [];
  var message = [];

  var config = {
    apiKey: "AIzaSyDep4MzWGodn_n7kcInVQu2Doy6YD92Mng",
    authDomain: "uflow-app.firebaseapp.com",
    currentDomain: "uflow-app.firebaseapp.com",
    databaseURL: "https://uflow-app.firebaseio.com",
    projectId: "uflow-app",
    storageBucket: "uflow-app.appspot.com",
    messagingSenderId: "948849625393"
  };


    this.createApp = function() {

      if (!firebase.apps.length) {
        firebase.initializeApp(config);
      }
    }

    //This function is called when a user logs in via Google. It adds the user in
    //the database.
    this.writeUserData = function(email, id, profile_pic, username, fullName) {
      var name = email;
      name = name.substring(0,username.indexOf("@"));
      name = name.replace(/[^a-z0-9]+|\s+/gmi, "");

      firebase.database().ref('/users/' + id).set({
        email: email,
        id: id,
        profile_pic : profile_pic,
        username: name,
        fullName: fullName,
      });

    }

    this.shareVideo = function(video, id, text) {

      this.createApp();

      var newShareKey = firebase.database().ref().child('videos').push().key;
      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      //updates['/shares/' + newShareKey] = video;
      updates['/shares/' + id + '/videos/' + newShareKey] = video;
      updates['/shares/' + id + '/texts/' + newShareKey] = text;
      firebase.database().ref().update(updates);
      window.location = 'profile';
    }

    this.follow = function(user_id, follow_id) {
      this.createApp();
      var newFollowKey = firebase.database().ref().child('following').push().key;

      var updates = {};

      updates['/follow/' + user_id + '/following/' + newFollowKey] = follow_id;
      updates['/follow/' + follow_id + '/followers/' + newFollowKey] = user_id;
      firebase.database().ref().update(updates);
    }

    this.stopFollow = function(user_id, follow_id) {
      firebase.database().ref('/follow/' + user_id + '/following/').once('value', snapshot => {
        if (snapshot.val() !== null) {
          var key = Object.keys(snapshot.val());
          if (key !== undefined) {
            key.map((key) =>
            firebase.database().ref('/follow/' + user_id + '/following/' + key).once('value', persons => {
              if (persons.val() === follow_id) {
                firebase.database().ref('/follow/' + user_id + '/following/' + key).remove();
              }
            })
          );
        }
      }
    })
    firebase.database().ref('/follow/' + follow_id + '/followers/').once('value', snapshot => {
      if (snapshot.val() !== null) {
        var key = Object.keys(snapshot.val());
        if (key !== undefined) {
          key.map((key) =>
          firebase.database().ref('/follow/' + follow_id + '/followers/' + key).once('value', persons => {
            if (persons.val() === user_id) {
              firebase.database().ref('/follow/' + follow_id + '/followers/' + key).remove();
            }
          })
        );
      }
    }
  })
  }

  this.removeShare = function(user_id, video, text) {
    firebase.database().ref('/shares/' + user_id + '/texts').once('value', snapshot => {
      if (snapshot.val() !== null) {
        var key = Object.keys(snapshot.val());
        if (key !== undefined) {
          key.map((key) =>
          firebase.database().ref('/shares/' + user_id + '/texts/' + key).once('value', snapshot => {
            if (snapshot.val() === text) {
              firebase.database().ref('/shares/' + user_id + '/videos/' + key).once('value', videos => {
                if (videos.val() === video && snapshot.val() === text) {
                  firebase.database().ref('/shares/' + user_id + '/texts/' + key).remove();
                  firebase.database().ref('shares/'+ user_id + '/videos/' + key).remove();
                  window.location = 'profile';
                }
              })
            }
          })
        )
      }
    }
  })
  }


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

  this.googleLogout = function() {

    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

  var currentUser = null;

  this.setCurrentUser = function(id) {
    currentUser = id;
  }

  this.setProfilePicture = function(userId) {
    this.createApp();
    firebase.database().ref('/images/' + userId + '/image').once('value', snapshot => {
      if (snapshot.val() !== "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg" && snapshot.val() !== null) {
        return;
      }
      else {
        firebase.database().ref('/images/' + userId).set({
          image: "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"
        });
      }
    })
  }

  this.handleFileSelect = function(files) {
    var storageRef = firebase.storage().ref();

    var file = files[0];
    var userId = currentUser;
    var metadata = {
      'contentType': file.type
    };

    storageRef.child('images/' + userId + '/' + file.name).put(file, metadata).then(function(snapshot) {
      console.log('Uploaded', snapshot.totalBytes, 'bytes.');
      console.log('File metadata:', snapshot.metadata);
      storageRef.child('images/' + userId + '/' + file.name).getDownloadURL().then(function(url) {
        // `url` is the download URL for the uploaded image
        firebase.database().ref('/images/' + userId).set({
          image: url
        });
        window.location = "profile";
      }).catch(function(error) {
        console.log(error)
      });
    }).catch(function(error) {
      // [START onfailure]
      console.error('Upload failed:', error);
      // [END onfailure]
    });
  }

  this.addToDatabase = function(file, userId) {
    var storageRef = firebase.storage().ref();
    storageRef.child('images/' + userId + '/' + file.name).getDownloadURL().then(function(url) {
      // `url` is the download URL for the uploaded image
      console.log(url);
    }).catch(function(error) {
      console.log(error)
    });
    // [END oncomplete]
  }

  // API Calls

  this.map = function(finalURL){

    return fetch(finalURL)
    .then(res => res.json())
    .then(json => json.items.map(obj => "https://www.youtube.com/embed/"+ obj.id.videoId))

  }

  this.getVideos = function (filter) {

    const result = 48;
    if (filter) {
      //videos
      var youtubeURL = `https://www.googleapis.com/youtube/v3/search?key=${key}&part=snippet,id&q=${filter}&order=relevance&maxResults=${result}`;
      return this.map(youtubeURL);
    }
    else {
      var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${key}&part=snippet,id&order=date&maxResults=${result}`

      return this.map(finalURL);
    }
  }

  this.getProfileUser = function () {
    return profileUser;
  }

  this.setProfileUser = function (userId) {
    profileUser = userId;
    console.log(profileUser)
  }

  this.getFilter = function () {
    return filter;
  }

  this.setFilter = function (newFilter) {
    filter = newFilter;
    notifyObservers();
  }


  this.message = function(id, text) {

    this.createApp();
    //var sharesRef = firebase.database().ref('shares/' + id);

    //var newShareKey = firebase.database().ref().child('videos').push().key;
    var newShareTextKey = firebase.database().ref().child('text').push().key;
      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      //updates['/shares/' + newShareKey] = video;
      //updates['/shares/' + id + '/videos/' + newShareKey] = video;
      updates['/messages/' + id + '/message/' + newShareTextKey] = {text: text, timestamp: firebase.database.ServerValue.TIMESTAMP};
      firebase.database().ref().update(updates);

  }



  this.addObserver = function (observer) {
    observers.push(observer);
  };

  this.removeObserver = function (observer) {
    observers = observers.filter(o => o !== observer);
  };

  const notifyObservers = function () {
    observers.forEach(o => o.update());
  };



  }


  export const modelInstance = new Model();
