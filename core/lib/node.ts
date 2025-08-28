import { getLogger } from "@logtape/logtape";

import type { Logger } from "@logtape/logtape";
import type { Signaling } from "./signaling.ts";
import type { Transport } from "./transport.ts";

const APP_PREFIX = "@webrtc-mesh";

export class Node {
  readonly #selfId: string;
  readonly #application: string;
  readonly #signaling: Signaling;
  readonly #transport: Transport;
  readonly #logger: Logger;

  constructor(options: {
    application: string;
    signaling: Signaling;
    transport: Transport;
    logger?: Logger;
  }) {
    this.#application = `${APP_PREFIX}/${options.application}`;
    this.#selfId = `${this.#application}/${crypto.randomUUID()}`;
    this.#signaling = options.signaling;
    this.#transport = options.transport;
    this.#logger = options.logger ?? getLogger([
      "@webrtc-mesh",
      "node",
    ]);
  }

  async start() {
    this.#logger.info("Starting node ({id}) ...", { id: this.#selfId });
    await this.#transport.start(this.#selfId, this.#application);
    await this.#signaling.start(this.#selfId, this.#application);
  }

  async stop() {
    this.#logger.info("Stopping node ({id}) ...", { id: this.#selfId });
    await this.#signaling.stop();
    await this.#transport.stop();
  }
}
