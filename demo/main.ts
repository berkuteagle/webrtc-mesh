import { configure, getConsoleSink } from "@logtape/logtape";
import { Node } from "@webrtc-mesh/core";
import { DhtWsSignaling } from "@webrtc-mesh/dht-ws-signaling";

await configure({
  sinks: { console: getConsoleSink() },
  loggers: [
    { category: ["logtape", "meta"], lowestLevel: "debug" },
    {
      category: ["@webrtc-mesh/core"],
      lowestLevel: "info",
      sinks: ["console"],
    },
  ],
});

const node = new Node(
  new DhtWsSignaling(),
);

node.start();
await new Promise((resolve) => setTimeout(resolve, 10000));
node.stop();
