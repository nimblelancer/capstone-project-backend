"use strict";

const mongoose = require("mongoose");
const countConnect = () => {
  const numConnections = mongoose.connections.length;
  console.log(`Number of connections: ${numConnections}`);
};

module.exports = {
  countConnect,
};
