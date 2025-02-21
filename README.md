  # Untitled Music App
  

  ## Description

  Eclectic taste in music? Need to show your friends you liked an artist before they were cool? This platform aims transforms your music taste into a shareable profile that to captures your entire musical identity! 


  ## Features

  - [x] Registration/authentication
  - [x] Album and artist search
  - [x] Ability to rate and review albums
  - [x] Share your thoughts through detailed reviews
  - [x] Explore trending songs on your favourite albums
  - [x] Link your Spotify account to display top songs on your profile page

  ## To Do

  - [ ] Add song review feature
  - [ ] Add artist review feature
  - [ ] Add shareable Instagram stories feature
  - [ ] Make styling consistent (in progress)
  - [ ] Optimise web app
  - [ ] Add Like/comment features on individual reviews
  - [ ] News view using RSS to display articles from popular music publications.

  ## Screenshots

<table>
  <tr>
    <td><img src="./images/1.png" alt="Screenshot 1" width="500"/></td>
    <td><img src="./images/2.png" alt="Screenshot 2" width="500"/></td>
    <td><img src="./images/3.png" alt="Screenshot 3" width="500"/></td>
    <td><img src="./images/4.png" alt="Screenshot 4" width="500"/></td>
  </tr>
  <tr>
    <td><img src="./images/5.png" alt="Screenshot 5" width="500"/></td>
    <td><img src="./images/6.png" alt="Screenshot 6" width="500"/></td>
    <td><img src="./images/7.png" alt="Screenshot 7" width="500"/></td>
    <td><img src="./images/8.png" alt="Screenshot 8" width="500"/></td>
  </tr>
</table>

## Prerequisites
#### Spotify Developer account
* This project uses the Spotify Developer API for all music data. A Spotify developer account is free, and can be obtained at https://developer.spotify.com/
* Once an account has been made, use the dashboard (https://developer.spotify.com/dashboard) to create a new app. The redirect URI should look similar to the placeholder in /.env.example (with the IP of the server running the API substituted) and ensure the "Web API" checkbox is ticked.
* In the app settings page, you'll find your client ID and client secret. 

#### Installation Prerequisites
* Node.js
* npm (Node Package Manager)


## Installation

  1. Clone the repository to your local machine.
  2. Rename .env.example to .env and fill in your Spotify Developer API app credentials and 'PROXY_SERVER' as the IP of the device running the proxy (if you wish to run the proxy from the same device, localhost works).
  3. Open a terminal window and run 'node proxy.js' to start the development server.
  4. Navigate to the music-app directory and run `npx expo start`.

## Testing on mobile
1. Download the Expo Go app from your device's app store
2. Ensure your phone is on the same network as your computer
3. Scan the QR code displayed in the npx terminal window with your phone camera. This will launch Expo go, and the app will load. 
