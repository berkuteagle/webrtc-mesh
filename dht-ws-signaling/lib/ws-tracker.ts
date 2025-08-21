export class WebSocketTracker extends EventTarget {
    readonly #url: string;
    #socket: WebSocket | null = null;
    #unsubscribeCb: (() => void) | null = null;

    constructor(url: string) {
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
                this.#socket.removeEventListener("message", onMessage);
            };
        }
    }

    #unsubscribe() {
        if (this.#unsubscribeCb) {
            this.#unsubscribeCb();
            this.#unsubscribeCb = null;
        }
    }

    start() {
        if (this.#socket) {
            return;
        }
        this.#socket = new WebSocket(this.#url);
        this.#subscribe();
    }

    stop() {
        if (!this.#socket) {
            return;
        }
        this.#unsubscribe();
        this.#socket.close();
        this.#socket = null;
    }
}
