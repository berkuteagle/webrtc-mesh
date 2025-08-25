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

  #announce() {

  }

  #subscribe() {
    this.#unsubscribe();
    if (this.#socket) {
      const onOpen = (event: Event) => {
        this.#logger.info("Opened connection with {url}", {
          url: event.target.url,
        });
      };

      const onClose = (event: Event) => {
        this.#logger.info("Closed connection with {url}", {
          url: event.target.url,
        });
      };

      const onMessage = (event: MessageEvent) => {
        this.#logger.info("Message", { event });
      };

      const onError = (event: Event) => {
        this.#logger.error("Error [{url}]", { url: event.target.url });
      };

      this.#socket.addEventListener("message", onMessage);
      this.#socket.addEventListener("error", onError);
      this.#socket.addEventListener("open", onOpen);
      this.#socket.addEventListener("close", onClose);

      this.#unsubscribeCb = () => {
        this.#socket?.removeEventListener("message", onMessage);
        this.#socket?.removeEventListener("error", onError);
        this.#socket?.removeEventListener("open", onOpen);
        this.#socket?.removeEventListener("close", onClose);
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
