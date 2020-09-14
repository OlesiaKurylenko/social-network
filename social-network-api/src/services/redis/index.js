var redis = require('redis');

const { promisify } = require('util');

    let client = redis.createClient(6380, 'localhost');
    client.on("error", function(error) {
        console.error(error);
      });
module.exports = {
    ...client,
    getAsync: promisify(client.get).bind(client),
    setAsync: promisify(client.set).bind(client),
    keysAsync: promisify(client.keys).bind(client),
    hmsetAsync: promisify(client.hmset).bind(client),
    hgetallAsync: promisify(client.hgetall).bind(client),
    existsAsync: promisify(client.exists).bind(client),
    expireAsync: promisify(client.expire).bind(client)
};
