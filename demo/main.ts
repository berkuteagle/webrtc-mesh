import { configure, getConsoleSink } from "@logtape/logtape";
import { Node } from "@webrtc-mesh/core";
import { DhtWsSignaling } from "@webrtc-mesh/dht-ws-signaling";
import { DhtUdpSignaling } from "@webrtc-mesh/dht-udp-signaling";
import { WebRTCTransport } from "@webrtc-mesh/webrtc-transport";

async function main() {
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
    transport: new WebRTCTransport(),
    application: "webrtc-mesh-demo",
  });

  const node2 = new Node({
    signaling: new DhtUdpSignaling(),
    transport: new WebRTCTransport(),
    application: "webrtc-mesh-demo",
  });

  node.start();
  node2.start();
  await new Promise((resolve) => setTimeout(resolve, 10000));
  node.stop();
  node2.stop();
}

void main();
