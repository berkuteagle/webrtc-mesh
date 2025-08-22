import { Signaling } from "@webrtc-mesh/core";
import { WebSocketTracker } from "./ws-tracker.ts";

export class DhtWsSignaling extends Signaling {
  #trackers: WebSocketTracker[] = [];

  constructor(urls: string[] = DEFAULT_URLS) {
    super("dht-ws-signaling");

    if (!urls.length) {
      throw new Error("At least one tracker URL is required");
    }

    this.#trackers = urls.map((url) => new WebSocketTracker(url, this.logger));
  }

  override init(selfId: string) {
    super.init(selfId);
  }

  start() {
    this.logger.info("Start trackers...");
    this.#trackers.forEach((tracker) => {
      tracker.start();
    });
  }

  stop() {
    this.logger.info("Stop trackers...");
    this.#trackers.forEach((tracker) => {
      tracker.stop();
    });
  }
}

export const DEFAULT_URLS = [
  "wss://tracker.webtorrent.dev",
  "wss://tracker.openwebtorrent.com",
  "wss://tracker.btorrent.xyz",
  "wss://tracker.files.fm:7073/announce",
];
