// Passenger starts this file. The Linux build is kept in a separate runtime
// directory so CloudLinux can manage its own node_modules link at the app root.
process.env.NODE_ENV = "production";
process.env.HOSTNAME = "127.0.0.1";
require("./runtime/server.js");
