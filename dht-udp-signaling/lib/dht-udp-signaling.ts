import { Signaling } from "@webrtc-mesh/core";

export class DhtUdpSignaling extends Signaling {
  constructor() {
    super({
      id: "dht-udp-signaling",
    });
  }

  override async start(selfId: string, application: string) {
    await super.start(selfId, application);
  }

  override async stop() {}
}
