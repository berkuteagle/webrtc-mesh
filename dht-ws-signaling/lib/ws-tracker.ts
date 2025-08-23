import type { Logger } from "@logtape/logtape";

export class WebSocketTracker extends EventTarget {
  readonly #url: string;
  readonly #logger: Logger;
  #socket: WebSocket | null = null;
  #unsubscribeCb: (() => void) | null = null;

  constructor(options: {
    url: string;
    logger: Logger;
  }) {
    super();
    this.#url = options.url;
    this.#logger = options.logger;
  }

  #subscribe() {
    this.#unsubscribe();
    if (this.#socket) {
      const onMessage = (event: MessageEvent) => {
        this.#logger.info("Message", { event });
      };

      this.#socket.addEventListener("message", onMessage);
      this.#unsubscribeCb = () => {
        this.#socket?.removeEventListener("message", onMessage);
      };
    }
  }

  #unsubscribe() {
    this.#unsubscribeCb?.();
    this.#unsubscribeCb = null;
  }

  start() {
    if (this.#socket) {
      return;
    }
    this.#logger.info("Connecting to tracker: {url}", { url: this.#url });
    this.#socket = new WebSocket(this.#url);
    this.#subscribe();
  }

  stop() {
    this.#logger.info("Disconnecting from tracker: {url}", { url: this.#url });
    this.#unsubscribe();
    this.#socket?.close();
    this.#socket = null;
  }
}
