//the purpose of expressmain is to be the entrypoint for all express stuff

const app = require('../server').app
const io = require('../server').io;

module.exports = app