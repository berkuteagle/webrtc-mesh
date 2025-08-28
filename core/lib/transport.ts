import { Entity } from "./entity.ts";

export abstract class Transport extends Entity {
  protected async start(selfId: string, application: string): Promise<void> {
    this.logger.info("Starting transport ...");

    await super.start(selfId, application);
  }

  abstract async address(): Promise<string>;
}
