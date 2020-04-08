# WhatsApp Clone [PWA]
This build replicates the WhatsApp web-app UI & UX design. Users can sign up through the Google Authenticator and 
interact with public chat rooms in realtime, both backend and frontend working independently from each other using 
the MERN Stack.

**Technologies involved:**
- MongoDB
- Express
- React
- Node
- Axios
- Firebase
- Pusher
- Material UI
- Progressive Web App [PWA]
- WebStorm


## Available Scripts
To get started developing right away:

* install all project dependencies with `npm install`
* configure [`.env`](#env) file
* start the development server with `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:9000](http://localhost:9000) to view it in the browser.


To deploy project in separate terminal instances:
* [`.env`](#env)
* [`Backend`](#Backend)
* [`Frontend`](#Frontend)

### `.env`
```bash
# Clone this repository
$ git clone https://github.com/eduardozo/whatsapp-mern.git

# Access the project folder cmd/terminal
$ cd whatsapp-mern

# rename .env_sample to .env
$ mv .env_sample .env

# edit .env configuration with your prefer editor

# repeat last three steps in client development
$ cd whatsapp-frontend
```
Cloud Services:
[`Firebase`](https://console.firebase.google.com/),
[`MongoDB`](https://cloud.mongodb.com/) and
[`Pusher`](https://dashboard.pusher.com/)

### `Backend`
```bash
# Clone this repository
$ git clone https://github.com/eduardozo/whatsapp-mern.git

# Access the project folder in your terminal
$ cd whatsapp-mern

# install the dependencies
$ npm install

# rename .env_sample to .env
$ mv .env_sample .env

# edit .env configuration with your prefer editor

# Run server
$ nodemon server.js

# The server will start at port: 9000 - go to http://localhost:9000
```

### `Frontend`
```bash
# Clone this repository
$ git clone https://github.com/eduardozo/whatsapp-mern.git

Access the project folder in your terminal
$ cd whatsapp-mern

# Go to the Front End application folder
$ cd whatsapp-frontend

# Install the dependencies
$ npm install

# rename .env_sample to .env
$ mv .env_sample .env

# edit .env configuration with your prefer editor

# Run the application in development mode
$ npm start

# The application will open on the port: 3000 - go to http://localhost:3000
```

## What You're Getting
```bash
.Whatsapp-backend
├── model
│   └── db.chatRooms.js
├── whatsapp-frontend
│   ├── public
│   │   ├── index.html
│   │   ├── manifest.json
│   │   ├── robots.txt
│   │   └── whatsapp-icon.svg
│   ├── src
│   │   ├── components
│   │   │   ├── Chat
│   │   │   │   ├── Chat.css
│   │   │   │   └── Chat.js
│   │   │   ├── Login
│   │   │   │   ├── Login.css
│   │   │   │   └── Login.js
│   │   │   ├── Modal
│   │   │   │   └── DemoDialog.js
│   │   │   ├── Sidebar
│   │   │   │   ├── Sidebar.css
│   │   │   │   └── Sidebar.js
│   │   │   └── SidebarChat
│   │   │       ├── SidebarChat.css
│   │   │       └── SidebarChat.js
│   │   ├── config
│   │   │   ├── axios.js
│   │   │   └── firebase.js
│   │   ├── reducer
│   │   │   ├── Reducer.js
│   │   │   └── StateProvider.js
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── index.css
│   │   ├── index.js
│   │   └── serviceWorker.js
│   ├── .env_sample # rename to .env and add your API configurations and secrets.
│   ├── package-lock.json
│   └── package.json
├── LICENSE
├── README.md
├── .env_sample # rename to .env and add your API configurations and secrets.
├── .gitignore
├── package-lock.json
├── package.json
└── server.js
```

## Screenshots
![whatsapp login](https://raw.githubusercontent.com/eduardozo/img/master/whatsapp-mern/whatsapp-pwa-desktop-login.png)
![whatsapp desktop](https://raw.githubusercontent.com/eduardozo/img/master/whatsapp-mern/whatsapp-pwa-desktop.png)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](LICENSE)