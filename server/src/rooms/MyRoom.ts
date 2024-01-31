import { cli } from '@colyseus/loadtest';
import { Room, Client } from "@colyseus/core";
import { MyRoomState, Player } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {
  maxClients = 4;

  onCreate (options: any) {
    this.setState(new MyRoomState());
    this.state.mapX = 7;
    this.state.mapY = 1;
    this.state.mapZ = 3;


    this.onMessage("move", (client, message) => {
      //console.log(message)

      if(message.x > -7 && message.x < 7.2 && message.z < 3.2 && message.z > -3.5){
        this.broadcast('move', {message, client})

        //console.log('in the range!')
        let player = this.state.players.get(client.sessionId)
        player.x = message.x;
        player.y = message.y;
        player.z = message.z;
      }
    });
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    // const player = this.state.players.get(client.sessionId);

    const player = new Player();
    player.x = Math.floor(Math.random() * (this.state.mapX + 1));
    player.y = 1;
    player.z = Math.floor(Math.random() * (this.state.mapZ + 1)) - Math.random() * this.state.mapZ;
    player.colour = Math.random() * 0xffffff;
    // console.log(`${client.sessionId} at x: ${player.x} y: ${player.y} z: ${player.z}`)
    //console.log(`${client.sessionId} color ${player.colour}`)


    this.state.players.set(client.sessionId, player)
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
