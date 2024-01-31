import { Schema, Context, type, MapSchema } from "@colyseus/schema";

export class Player extends Schema {
  @type("number") x: number;
  @type("number") y: number;
  @type("number") z: number;
  @type("number") colour: number;

}

export class MyRoomState extends Schema {
  @type("number") mapX: number;
  @type("number") mapY: number;
  @type("number") mapZ: number;
  @type({ map: Player }) players = new MapSchema<Player>();

}
