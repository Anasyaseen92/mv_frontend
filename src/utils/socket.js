// Socket.IO disabled: export no-op socket to avoid connection attempts
export const socket = {
  on() {},
  emit() {},
  off() {},
  connect() {},
  disconnect() {},
};
