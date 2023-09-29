let ws: WebSocket;

self.addEventListener("message", (event: MessageEvent) => {
  const { type, payload } = event.data;
  if (type === "init") {
    ws = new WebSocket(payload.wsUrl);
    ws.addEventListener("message", (event) => {
      console.log(event.data);
    });
  }
});
