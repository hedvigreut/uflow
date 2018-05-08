const Model = function () {

  let filter = "";
  let observers = [];
  var firebase = require("firebase");
  const key = 'AIzaSyAOYG1Ai4mZy6L-ifZgQ8bzS87vA6v3JdA';

  var config = {
    apiKey: "AIzaSyAGocayAMdpzxz17dLWbfxb6v_2IGqLPbw",
    currentDomain: "uflow-b640f.firebaseapp.com",
    databaseURL: "https://uflow-b640f.firebaseio.com",
    projectId: "uflow-b640f",
    storageBucket: "uflow-b640f.appspot.com",
    messagingSenderId: "889611883337",
    authDomain: "uflow-b640f.firebaseapp.com"
  };

  this.createApp = function() {

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }


  this.createDatabase = function() {
    // Get a reference to the database service
    var database = firebase.database();
  }


  this.createStorage = function() {
    var storage = firebase.storage();
    var storageRef = firebase.storage().ref();
    var imagesRef = storageRef.child('images');
  }

  this.handleFileSelect = function(evt) {
    var storage = firebase.storage();
    var storageRef = firebase.storage().ref();
    var imagesRef = storageRef.child('images');
      evt.stopPropagation();
      evt.preventDefault();
      var file = evt.target.files[0];
      var metadata = {
        'contentType': file.type
      };
      // Push to child path.
      // [START oncomplete]
      storageRef.child('images/' + file.name).put(file, metadata).then(function(snapshot) {
        console.log('Uploaded', snapshot.totalBytes, 'bytes.');
        console.log('File metadata:', snapshot.metadata);
        }).catch(function(error) {
          // [START onfailure]
          console.error('Upload failed:', error);
          // [END onfailure]
        });
        // [END oncomplete]
    }

  //This function is called when a user logs in via Google. It adds the user in
  //the database.
  this.writeUserData = function(email, id, profile_pic, username, fullName) {
      var name = email;
      name = name.substring(0,username.indexOf("@"));
      name = name.replace(/[^a-z0-9]+|\s+/gmi, "");
      console.log(name);

      firebase.database().ref('/users/' + id).set({
        email: email,
        id: id,
        profile_pic : profile_pic,
        username: name,
        fullName: fullName,
      });

    }

    this.shareVideo = function(video, id) {

      this.createApp();
      var sharesRef = firebase.database().ref('shares/' + id);

      var newShareKey = firebase.database().ref().child('shares').push().key;

      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      //updates['/shares/' + newShareKey] = video;
      updates['/shares/' + id + '/' + newShareKey] = video;
      firebase.database().ref().update(updates);
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

  // API Calls

  this.map = function(finalURL){

    return fetch(finalURL)
    .then(res => res.json())
    .then(json => json.items.map(obj => "https://www.youtube.com/embed/"+obj.id.videoId))

  }

  this.getVideos = function (filter) {

    //console.log("parametern är: " + filter);

    if(filter){
      console.log("Någon har sökt på: " + filter);
      const result = 12;
      var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${key}&part=snippet,id&q=${filter}&order=relevance&maxResults=${result}`;
      //notifyObservers();
      return this.map(finalURL);
    }

    //console.log("Vi har inte sökt på något!");
    const channelID = 'UCEQi1ZNJiw3YMRwni0OLsTQ'
    const result = 12;
    var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${key}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${result}`

    return this.map(finalURL);

  }


  this.getFilter = function () {
    return filter;
  }

  this.setFilter = function (newFilter) {
    filter = newFilter;
    notifyObservers();
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
