import { getLogger } from "@logtape/logtape";

import type { Logger } from "@logtape/logtape";
import type { Signaling } from "./signaling.ts";

export class Node {
  readonly #selfId: string;
  readonly #signaling: Signaling;
  readonly #logger: Logger = getLogger(["@webrtc-mesh/core", "node"]);

  constructor(signaling: Signaling) {
    this.#selfId = crypto.randomUUID();
    this.#signaling = signaling;

    this.#signaling.init(this.#selfId);
  }

  start() {
    this.#logger.info("Starting node ({id}) ...", { id: this.#selfId });
    this.#signaling.start();
  }

  stop() {
    this.#logger.info("Stopping node ({id}) ...", { id: this.#selfId });
    this.#signaling.stop();
  }
}
