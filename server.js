const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8090 });

console.log("WebSocket server is running on ws://localhost:8090");

server.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    console.log(`Received from client: ${message}`);
    ws.send(`Server received: ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  const sendLiveData = () => {
    if (ws.readyState === WebSocket.OPEN) {
      const randomStatusCount = Math.floor(Math.random() * 10) + 1;
      const categories = [
        "Valleywise Health Medical Center",
        "Grady Memorial Hospital",
        "Jackson Memorial Hospital",
      ];
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];
      const now = new Date().toISOString();

      const data = {
        time: now,
        statusCount: randomStatusCount,
        category: randomCategory,
      };

      ws.send(
        JSON.stringify({
          destination: "/topic/your-topic",
          body: JSON.stringify(data),
        }),
      );
    }
  };

  const interval = setInterval(sendLiveData, 10000);

  ws.on("close", () => {
    clearInterval(interval);
    console.log("Stopped sending data to disconnected client.");
  });
});
