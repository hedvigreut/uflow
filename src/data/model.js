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
    //console.log(name);

    firebase.database().ref('/users/' + id).set({
      email: email,
      id: id,
      profile_pic : profile_pic,
      username: name,
      fullName: fullName,
    });

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
      updates['/messages/' + id + '/text/' + newShareTextKey] = text;
      firebase.database().ref().update(updates);
    
    console.log("message!");
  }


  this.shareVideo = function(video, id, text) {

    this.createApp();
    var sharesRef = firebase.database().ref('shares/' + id);

    var newShareKey = firebase.database().ref().child('videos').push().key;
    var newShareTextKey = firebase.database().ref().child('texts').push().key;
      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      //updates['/shares/' + newShareKey] = video;
      updates['/shares/' + id + '/videos/' + newShareKey] = video;
      updates['/shares/' + id + '/texts/' + newShareKey] = text;
      firebase.database().ref().update(updates);
    }

    this.follow = function(user_id, follow_id) {
      this.createApp();
      console.log(follow_id);

      var followRef = firebase.database().ref('follow/' + user_id);
      var newFollowKey = firebase.database().ref().child('following').push().key;
      var newFollowerKey = firebase.database().ref().child('followers').push().key;

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
      firebase.database().ref('/shares/' + user_id + '/videos').once('value', snapshot => {
        console.log(snapshot.val())
        if (snapshot.val() !== null) {
          var key = Object.keys(snapshot.val());
          if (key !== undefined) {
            key.map((key) =>
              firebase.database().ref('/shares/' + user_id + '/videos/' + key).once('value', videos => {
                if (videos.val() === video) {
                  firebase.database().ref('/shares/' + user_id + '/videos/' + key).remove();
                }
              })
              );
          }
        }
      })
      firebase.database().ref('/shares/' + user_id + '/texts').once('value', snapshot => {
        console.log(snapshot.val())
        if (snapshot.val() !== null) {
          var key = Object.keys(snapshot.val());
          if (key !== undefined) {
            key.map((key) =>
              firebase.database().ref('/shares/' + user_id + '/texts/' + key).once('value', snapshot => {
                if (snapshot.val() === text) {
                  firebase.database().ref('/shares/' + user_id + '/texts/' + key).remove();
                }
              })
              );
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

  // API Calls

  this.map = function(finalURL){

    return fetch(finalURL)
    .then(res => res.json())
    .then(json => json.items.map(obj => "https://www.youtube.com/embed/"+obj.id.videoId))

  }

  let allUsers = [];

  this.setAllUsers = function(users) {
    allUsers = users;
  }

  this.checkUser = function(filter) {
    return allUsers.includes(filter);
  }

  this.getVideos = function (filter) {

    const result = 3;
    if(filter){
        //videos
        var youtubeURL = `https://www.googleapis.com/youtube/v3/search?key=${key}&part=snippet,id&q=${filter}&order=relevance&maxResults=${result}`;      
        return this.map(youtubeURL);
      }

    //console.log(temp);
    const channelID = 'UCEQi1ZNJiw3YMRwni0OLsTQ'
    var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${key}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${result}`

    return this.map(finalURL);

  }


  this.getUsers = function(filter){

    //if(this.checkUser(filter)){

    //Get all users

    var allUsernames= [];
    var allIds = [];
    var allPictures = [];
    var allObjects = [];

    //Store objects, usernames and id:s
    firebase.database().ref('/users/').once('value', snapshot => {
      var key = Object.keys(snapshot.val());
      allObjects.push(snapshot.val());
      key.map((key) =>
        firebase.database().ref('/users/' + key + '/username').once('value', user => {
          allIds.push(key);
          allUsernames.push(user.val());
        })
        )
    })
    //Store profile pictures
    firebase.database().ref('/users/').once('value', snapshot => {
      var key = Object.keys(snapshot.val());
      key.map((key) =>
        firebase.database().ref('/users/' + key + '/profile_pic').once('value', pic => {
          allPictures.push(pic.val());
        })
        )
    })

    var resUsers = [];
    resUsers.push(allUsernames);
    resUsers.push(allIds);
    resUsers.push(allPictures);

      return allUsernames;
    //}

  }

  this.getProfileUser = function () {
    return profileUser;
  }

  this.setProfileUser = function (userId) {
    profileUser = userId;
  
  }
  this.setMessage= function (message) {
    message = message;
    notifyObservers();
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
