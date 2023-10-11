const { CosmosClient } = require("@azure/cosmos");

const endpoint = "https://brickbreakerdb.documents.azure.com:443/";
const key = "AccountEndpoint=https://brickbreakerdb.documents.azure.com:443/;AccountKey=NFLEWPqonMMEXoT2wPxKyubRTY3fv9h8VHNrO8fx84pKhFmIsP39cz8VjhNcIZOhEoNg3sJ0GUx0ACDbbQqXYQ==;";

const client = new CosmosClient({ endpoint, key });

const databaseId = "ScoresDB";
const containerId = "Container1";
const item_id = 0

const addUserScore = async (item_id, username, score) => {
  const database = client.database(databaseId);
  const container = database.container(containerId);

  const item = {
    item_id,
    username,
    score,
  };

  const { resource } = await container.items.create(item);

  console.log(`Added score for ${resource.username}: ${resource.score}`);
};

module.exports = { addUserScore };
