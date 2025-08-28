import { Transport } from "@webrtc-mesh/core";

export class WebRTCTransport extends Transport {
  #connection: RTCPeerConnection;
  #offer: RTCSessionDescription;

  constructor() {
    super({ id: "webrtc-transport" });

    this.#connection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });
  }

  override async start(selfId: string, application: string) {
    await super.start(selfId, application);

    this.#offer = await this.#connection.createOffer({
      offerToReceiveAudio: false,
      offerToReceiveVideo: false,
    });
  }

  override async stop(): Promise<void> {
  }

  override async address(): Promise<string | null> {
    if (this.#offer) {
      return JSON.stringify(this.#offer);
    }

    return null;
  }
}
