import { hash, Signaling } from "@webrtc-mesh/core";
import { WebSocketTracker } from "./ws-tracker.ts";

export class DhtWsSignaling extends Signaling {
  #trackers: WebSocketTracker[] = [];
  #selfHash: string = "";
  #applicationHash: string = "";

  constructor(urls: string[] = DEFAULT_URLS) {
    if (!urls.length) {
      throw new Error("At least one tracker URL is required");
    }

    super({
      id: "dht-ws-signaling",
    });

    this.#trackers = urls.map((url) =>
      new WebSocketTracker({ url, logger: this.logger })
    );
  }

  override async start(selfId: string, application: string) {
    await super.start(selfId, application);

    this.#selfHash = await hash(this.selfId);
    this.#applicationHash = await hash(this.application);

    this.logger.info("Start trackers...");
    await Promise.all(
      this.#trackers.map((tracker) =>
        tracker.start(this.#selfHash, this.#applicationHash)
      ),
    );
  }

  override async stop() {
    this.logger.info("Stop trackers...");
    await Promise.all(this.#trackers.map((tracker) => tracker.stop()));
  }
}

export const DEFAULT_URLS = [
  "wss://tracker.webtorrent.dev",
  "wss://tracker.openwebtorrent.com",
  "wss://tracker.btorrent.xyz",
  "wss://tracker.files.fm:7073/announce",
];
