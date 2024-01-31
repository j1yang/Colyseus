//Colyseus Client
import * as Colyseus from "colyseus.js";
import { scene } from "./scene.js";
import * as THREE from "three";

//Set up client port
const client = new Colyseus.Client("ws://localhost:2567");

//Room, player variable
let room, player;

//function that create player as Random Coloured Cube
function createPlayerMesh(pos, colour, sessionId) {
  //const boxGeometry = new THREE.BoxGeometry(50, 0, 50);
  const boxGeometry = new THREE.BoxGeometry(0.5, 2, 0.5);
  const boxMaterial = new THREE.MeshPhongMaterial({ color: colour });
  const playerMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  playerMesh.name = sessionId;
  playerMesh.position.set(pos.x, pos.y, pos.z);
  return playerMesh;
}

//
function findObjectByName(scene, name) {
  // Iterate through all children of the scene
  for (let i = 0; i < scene.children.length; i++) {
    const child = scene.children[i];
    // Check if the name of the child matches the target name
    if (child.name === name) {
      // Return the object if found
      return child;
    }
  }
  // Return null if object with the specified name is not found
  return null;
}

client
  .joinOrCreate("my_room")
  .then((r) => {
    room = r;

    room.onStateChange.once((state) => {
      player = room.state.players[r.sessionId];
    });

    // room.onStateChange((state) => {
    //   console.log("Room state has been updated:", state);
    // });

    room.state.players.onAdd((player, key) => {
      const object = findObjectByName(scene, key);
      if (!object) {
        console.log(player, "has been added at", key);
        let p = createPlayerMesh(
          { x: player.x, y: player.y, z: player.z },
          player.colour,
          key
        );
        scene.add(p);
      }
    });
    room.onMessage("move", (message, client) => {
      //console.log("message from server move");
      const object = findObjectByName(scene, message.client.sessionId);
      if (object) {
        object.position.x = message.message.x;
        object.position.y = message.message.y;
        object.position.z = message.message.z;
      } else {
        console.log("Object not found.");
      }
    });

    room.onLeave((code) => {
      console.log("Client left the room");
    });
  })
  .catch((e) => {
    console.error("Join error:", e);
  });

const updateLocation = (pos) => {
  if (room) room.send("move", pos);
};

export { updateLocation, room, player };
