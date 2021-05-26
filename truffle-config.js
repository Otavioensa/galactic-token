module.exports = {
  networks: {
    development: {
     host: "127.0.0.1",
     port: 7545,
     network_id: "*", // Any network (default: none)
    },
  },
  mocha: {
  },

  compilers: {
    solc: {
    }
  },

  db: {
    enabled: false
  }
};
