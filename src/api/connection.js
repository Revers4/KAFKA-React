import { refreshTokenAPI } from "./auth";

export default function connectAPI(id, ws, setIncomingMessages ){
      ws.current = new WebSocket( `ws://localhost:3000/?user_id=${id}` )
      ws.current.onmessage = function(e){
        const data = JSON.parse(e.data)
        console.log(data)
        setIncomingMessages((prev) => [...prev, data])
      }

      ws.current.onopen = () => {
        console.log("Connected to server");
      };

      ws.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.current.onclose = async () => {
        await refreshTokenAPI()
        ws.current = new WebSocket( `ws://localhost:3000/?user_id=${id}` )
        console.log("Disconnected from server");
        setIncomingMessages((prev) => [...prev, "Disconnected from server"]);
      };
  }