import { getLogger } from "@logtape/logtape";

import type { Logger } from "@logtape/logtape";

export abstract class Signaling {
  readonly #id: string;
  readonly #logger: Logger;
  #selfId: string = "";

  protected constructor(options: {
    id: string;
    logger?: Logger;
  }) {
    this.#id = options.id;
    this.#logger = options.logger ?? getLogger([
      "@webrtc-mesh",
      this.#id,
    ]);
  }

  init(selfId: string): void {
    this.#logger.info("Initializing signaling ...");
    this.#selfId = selfId;
  }

  protected get selfId(): string {
    return this.#selfId;
  }

  protected get logger(): Logger {
    return this.#logger;
  }

  abstract start(): void;
  abstract stop(): void;
}
