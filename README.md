# Three.js and Colyseus Multiplayer Game

This project is a simple multiplayer web app built with Three.js on the client side for 3D graphics rendering and Colyseus on the server side for real-time multiplayer functionality.


## ![Colyseus](https://img.shields.io/badge/Colyseus-882ddf?style=for-the-badge&logo=Colyseus&logoColor=purple)
- **Server-Side State Management**
- **Socket Communication**
- **Schema-Based State Serialization**
- **Room Management**

## ![Three.js](https://img.shields.io/badge/Threejs-ffffff?style=for-the-badge&logo=Threejs&logoColor=white)
- **3D Graphics Rendering**
- **Scene Graph**
- **Interaction and Event Handling**
  
## Features

- Real-time multiplayer interaction using Colyseus server-client architecture.
- 3D graphics rendering using Three.js library.
- Player movement synchronization across multiple clients.
- Basic collision detection and map boundaries.

## Prerequisites

- Node.js and npm installed on your machine.
- WebGL-compatible browser for client-side rendering.

## Installation

### Server

1. Navigate to the `server` directory.
2. Install dependencies using `npm install`.
3. Start the server using `npm start`.
4. The Colyseus server will start running on the specified port (default is 2567).

### Client

1. Navigate to the `threejs-client` directory.
2. Install dependencies using `npm install`.
3. Start the development server using `npx vite`.
4. Open your browser and navigate to `http://localhost:5173` to view the game.

## Usage

- WASD keys to move your player.
- Explore the 3D environment and interact with other players in real-time.
- Have fun playing and testing the multiplayer functionality!

## Contributing

Contributions are welcome! Feel free to submit a pull request if you have any ideas for improvements or new features.

## License

This project is licensed under the [MIT License](LICENSE).
