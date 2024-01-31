import { Room, Client } from "@colyseus/core";
import { MyRoomState, Player } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {
  maxClients = 4;

  onCreate(options: any) {
    this.setState(new MyRoomState());
    this.initializeMapDimensions();
    this.setupMessageHandler();
  }

  private initializeMapDimensions() {
    this.state.mapX = 7;
    this.state.mapY = 1;
    this.state.mapZ = 3;
  }

  private setupMessageHandler() {
    this.onMessage("move", (client, message) => {
      if (this.isWithinMapBounds(message)) {
        this.broadcast('move', { message, client });
        this.updatePlayerPosition(client.sessionId, message);
      }
    });
  }

  private isWithinMapBounds(message: { x: number, y: number, z: number }) {
    return (message.x > -7 && message.x < 7.2 && message.z < 3.2 && message.z > -3.5);
  }

  private updatePlayerPosition(sessionId: string, message: { x: number, y: number, z: number }) {
    const player = this.state.players.get(sessionId);
    if (player) {
      player.x = message.x;
      player.y = message.y;
      player.z = message.z;
    }
  }

  onJoin(client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    const player = this.createPlayer();
    this.state.players.set(client.sessionId, player);
  }

  private createPlayer(): Player {
    const player = new Player();
    player.x = Math.floor(Math.random() * (this.state.mapX + 1));
    player.y = 1;
    player.z = Math.floor(Math.random() * (this.state.mapZ + 1)) - Math.random() * this.state.mapZ;
    player.colour = Math.random() * 0xffffff;
    return player;
  }

  onLeave(client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
