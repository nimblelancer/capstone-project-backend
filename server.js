const app = require("./app");

const PORT = process.env.PORT || 3055;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log("Server closed"));
});
