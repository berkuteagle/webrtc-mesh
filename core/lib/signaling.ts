import { getLogger } from "@logtape/logtape";

import type { Logger } from "@logtape/logtape";

export abstract class Signaling {
  readonly #id: string;
  readonly #logger: Logger = getLogger(["@webrtc-mesh/core", "signaling"]);
  #selfId: string = "";

  protected constructor(id: string) {
    this.#id = id;
  }

  init(selfId: string): void {
    this.#logger.info("Initializing signaling ({id}) ...", { id: this.#id });
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
