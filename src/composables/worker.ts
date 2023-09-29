let ws: WebSocket;

self.addEventListener("message", (event: MessageEvent) => {
  const { type, payload } = event.data;
  if (type === "init") {
    ws = new WebSocket(payload.wsUrl);
    ws.addEventListener("message", (event) => {
      self.postMessage({
        type: "lspResponse",
        payload: JSON.parse(event.data),
      });
    });
  } else if (type === "lspRequest") {
    ws.send(JSON.stringify(payload));
  }
});
