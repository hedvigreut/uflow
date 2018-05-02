# Uflow React

## How to get started

You will need a local webserver that will serve your app. Follow the instructions below to install all the needed dependencies (e.g. the framework libraries) and the development webserver.

1. First, make sure that you have npm installed on your system (follow the instructions
   at [Installing Node](https://docs.npmjs.com/getting-started/installing-node). The computers in the lab rooms should already have it, you will just need to do `module add node` to activate it (every time you start the terminal).

2. Run `npm install` through the terminal in the root of the repository. Let it
   install all the dependencies.

3. Run `npm start` through the terminal. This will start the webserver and the application should pop up in your browser ready for use. Alternatively you can open in through [http://localhost:3000]. Whenever you make changes in your code and save, the browser will update automatically, so you don't have to click refresh anymore.

### Short description of Uflow

Uflow is a personal Youtube flow where users will be able to create profiles where they can share and explore existing Youtube videos. When you watch a video that make you feel touched - those are the moments we want the platform to be characterized by. 
Users are able to follow each other and in a friend flow they can watch and interact with videos that their friends have shared. Also, users are able to explore other videos that haven’t been shared by any of their friends in an explore flow. These videos are imported from Youtube.
The flow itself is inspired by the Netflix flow. The user will be able to follow other users within the app, but also existing Youtube accounts. We also want to implement some sort of sorting functionality in the explore flow to make the user able to decide what kind of flow the user want to see at the moment. To find videos there will be a search functionality which is implemented through the Youtube API. 

#### What we have done

* We have created a startpage where the user is able to login with their Google account where we uses Google API together with Firebase.
* We have created most of the skeleton for the explore page where we import videos from Youtube’s API. As of now, we are displaying a certain youtube channel. We are still working on the carousel (big featured pictures right below the navbar), so the pictures that are displayed are from a certain channel. We can change that the smaller videos are random trending videos from youtube but since the carousel is not yet implemented we are currently only displaying data from one certain youtube channel.
* We have implemented a navigation bar that is almost fully functioning. The logo is clickable and redirects to the explore page as such with the explore icon. The profile icon links to a profile page.
* The profile page is still holding placeholders for a user. The current user is Sabina in our group and the pictures below will hold the videos that the user have shared. We have a toogle icon that redirects to an edit page.
* The edit profile page is holding placeholders for changing Sabina’s user settings.

##### What we plan to do 
* We are planning to create a login with Facebook API
* In the Explore flow we are going to change the pictures in the carousel to trending videos by using Youtube API. We are also going to make an API call to properly import the tumbnails of the videos in the carousel. We want to implement more functionality so that when the user hovers with the mouse of one of the smaller videos the carousel changes and displays that video’s thumbnail and also some info about it.
* We will keep on working on the menu and especially make sure that the search function will work properly.
* We are going to implement a function for users to be able to follow each other.
* We are going to create a Friend Flow- where the user can get a flow with videos that friends have shared. If possible we want to reuse the Flow component when implementing it.
* We are going to implement videos on the profile page, not placeholders.
* Implement localStorage
* We are going to improve the design and user ability throughout the webpage.


###### Understanding the startup code

* `public/index.html` - this is the static html file.(We will implement our logo here)
* `src/data/model.js` - this is our model that holds the functions for our Youtube API calls to retrieve videos.
* `src/index.js` - this is where React is started. 
* `src/Welcome/Welcome - this is our startpage. The user is signed in with their Google account
* `src/SignUp/SignUp - The user is redirected to the signup page. With Google API, we import the credentials such as name and mail. The user can change these if one wants, but we imported it for convenience. * `src/Explore.Explore.js` - This file consists of a Navbar and a Flow component. The user us redirected from SignUp straight to the “Explore flow”. 
* `src/Flow/Flow.js` - This is our Flow component that displays the carousel of thumbnails and videos.
* `src/Navbar/Navbar` - This is our navigation bar.
* `src/Profile/Profile.js` - The page for your own profile
* `src/Profile/Edit.js - The page for editing your profile
* `src/SelectProfile` - Consists of a Navbar and a Profile component.
* `src/App.js` - root component with our different routes to it


## Credits

Beatrice Brånemark, Hedvig Reuterswärd och Sabina von Essen
