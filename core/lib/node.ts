import { Signaling } from "./signaling.ts";

export class Node {
    readonly #selfId: string;
    readonly #signaling: Signaling;

    constructor(signaling: Signaling) {
        this.#selfId = crypto.randomUUID();
        this.#signaling = signaling;

        this.#signaling.init(this.#selfId);
    }

    start() {
        this.#signaling.start();
    }

    stop() {
        this.#signaling.stop();
    }
}
