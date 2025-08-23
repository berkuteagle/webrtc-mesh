import { getLogger } from "@logtape/logtape";

import type { Logger } from "@logtape/logtape";
import type { Signaling } from "./signaling.ts";

export class Node {
  readonly #selfId: string;
  readonly #signaling: Signaling;
  readonly #logger: Logger;

  constructor(options: {
    signaling: Signaling;
    logger?: Logger;
  }) {
    this.#selfId = crypto.randomUUID();
    this.#signaling = options.signaling;
    this.#logger = options.logger ?? getLogger([
      "@webrtc-mesh",
      "node",
    ]);

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
