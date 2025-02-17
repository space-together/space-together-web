import { io, Socket } from "socket.io-client";

let socket: Socket;

export const connectSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://127.0.0.1:2052/api/v0.0.1/user/user", {
      transports: ["websocket"],
    });

  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
  }
};

export const getSocket = () => socket;
