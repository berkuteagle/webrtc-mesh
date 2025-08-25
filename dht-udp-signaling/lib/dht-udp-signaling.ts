import { Signaling } from "@webrtc-mesh/core";

export class DhtUdpSignaling extends Signaling {
  constructor() {
    super({
      id: "dht-udp-signaling",
    });
  }

  override start() {}

  override stop() {}
}
