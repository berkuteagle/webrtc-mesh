import { getLogger } from "@logtape/logtape";

export abstract class Entity {
  readonly #id: string;
  readonly #logger: Logger;
  #selfId: string = "";
  #application: string = "";

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

  protected get selfId(): string {
    return this.#selfId;
  }

  protected get application(): string {
    return this.#application;
  }

  protected get logger(): Logger {
    return this.#logger;
  }

  protected async start(selfId: string, application: string): Promise<void> {
    this.#selfId = selfId;
    this.#application = application;
  }

  abstract async stop(): Promise<void>;
}
