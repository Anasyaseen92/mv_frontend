// frontend/src/utils/socket.js
import { io } from "socket.io-client";

const ENDPOINT ="https://mv-backend-wtl6.vercel.app/";

export const socket = io(ENDPOINT, {
  transports: ["websocket"],
});
