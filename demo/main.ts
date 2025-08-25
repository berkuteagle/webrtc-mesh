import { configure, getConsoleSink } from "@logtape/logtape";
import { Node } from "@webrtc-mesh/core";
import { DhtWsSignaling } from "@webrtc-mesh/dht-ws-signaling";
import { DhtUdpSignaling } from "@webrtc-mesh/dht-udp-signaling";

await configure({
  sinks: { console: getConsoleSink() },
  loggers: [
    { category: ["logtape", "meta"], lowestLevel: "debug" },
    {
      category: ["@webrtc-mesh"],
      lowestLevel: "info",
      sinks: ["console"],
    },
  ],
});

const node = new Node({
  signaling: new DhtWsSignaling(),
});

const node2 = new Node({
  signaling: new DhtUdpSignaling(),
});

node.start();
node2.start();
await new Promise((resolve) => setTimeout(resolve, 10000));
node.stop();
node2.stop();
