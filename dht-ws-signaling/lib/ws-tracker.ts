export class WebSocketTracker extends EventTarget {
  readonly #url: string;
  #socket: WebSocket | null = null;
  #unsubscribeCb: (() => void) | null = null;

  constructor(url: string) {
    super();
    this.#url = url;
  }

  #subscribe() {
    this.#unsubscribe();
    if (this.#socket) {
      const onMessage = (event: MessageEvent) => {
        console.log(event);
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
    this.#socket = new WebSocket(this.#url);
    this.#subscribe();
  }

  stop() {
    this.#unsubscribe();
    this.#socket?.close();
    this.#socket = null;
  }
}
