import * as Colyseus from "colyseus.js";
import * as THREE from "three";
import { scene } from "./scene.js";

// Constants
const EC2_INSTANCE_IP = "3.144.165:8080";
const SERVER_URL = `ws://${EC2_INSTANCE_IP}:2567`;
const BOX_SIZE = 0.5;
const BOX_HEIGHT = 2;

// Colyseus client setup
const client = new Colyseus.Client(SERVER_URL);

// Room and player variables
let room, player;

// Object map for efficient object lookup
const objectMap = {};

// Function to create a player mesh
function createPlayerMesh(pos, colour, sessionId) {
  const boxGeometry = new THREE.BoxGeometry(BOX_SIZE, BOX_HEIGHT, BOX_SIZE);
  const boxMaterial = new THREE.MeshPhongMaterial({ color: colour });
  const playerMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  playerMesh.name = sessionId;
  playerMesh.position.set(pos.x, pos.y, pos.z);
  return playerMesh;
}

// Function to handle player movement messages
function handleMoveMessage(message) {
  const object = objectMap[message.client.sessionId];
  if (object) {
    const { x, y, z } = message.message;
    object.position.set(x, y, z);
  } else {
    console.log("Object not found.");
  }
}

// Colyseus room setup
client
  .joinOrCreate("my_room")
  .then((r) => {
    room = r;

    // Initial setup when joining the room
    room.onStateChange.once((state) => {
      player = room.state.players[r.sessionId];
    });

    // Handle new players joining the room
    room.state.players.onAdd((newPlayer, key) => {
      if (!objectMap[key]) {
        console.log(newPlayer, "has been added at", key);
        const playerMesh = createPlayerMesh(newPlayer, newPlayer.colour, key);
        scene.add(playerMesh);
        objectMap[key] = playerMesh;
      }
    });

    // Handle player movement messages
    room.onMessage("move", handleMoveMessage);

    // Handle player leaving the room
    room.onLeave((code) => {
      console.log("Client left the room");
    });
  })
  .catch((error) => {
    console.error("Join error:", error);
  });

// Function to update player location
const updateLocation = (pos) => {
  if (room) room.send("move", pos);
};

// Export variables and functions
export { updateLocation, room, player };
