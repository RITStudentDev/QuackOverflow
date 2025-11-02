import { useEffect, useState } from "react";

export default function PostsPage() {
  const [wsStatus, setWsStatus] = useState("Connecting...");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/posts/");

    // Expose for console testing
    window.ws = ws;

    ws.onopen = () => console.log("WebSocket connected");
    ws.onmessage = (event) => console.log("Message received:", JSON.parse(event.data).message);
    ws.onclose = () => console.log("WebSocket disconnected");
    ws.onerror = (error) => console.error("WebSocket error:", error);

    return () => ws.close();
  }, []);

  // JSX to render on the page
  return (
    <div>
      <h1>Posts Page</h1>
    </div>
  );
}
