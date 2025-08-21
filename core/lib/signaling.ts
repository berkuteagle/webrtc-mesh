export abstract class Signaling {
    #selfId: string = "";

    init(selfId: string): void {
        this.#selfId = selfId;
    }

    protected get selfId(): string {
        return this.#selfId;
    }

    abstract start(): void;
    abstract stop(): void;
}
