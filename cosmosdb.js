// Get Cosmos Client
import { CosmosClient } from "@azure/cosmos";

const endpoint = "https://brickbreakerdb.documents.azure.com:443/";
const key = "NFLEWPqonMMEXoT2wPxKyubRTY3fv9h8VHNrO8fx84pKhFmIsP39cz8VjhNcIZOhEoNg3sJ0GUx0ACDbbQqXYQ==;";

// Uniqueness for database and container
const timeStamp = + new Date();

// Set Database name and container name with unique timestamp
const databaseName = `contoso_${timeStamp}`;
const containerName = `container_${timeStamp}`;
const partitionKeyPath = ["/id"]

const cosmosClient = new CosmosClient({ endpoint, key });

const databaseId = "ScoresDB";
const containerId = "Container1";
const item_id = 0

// Create database if it doesn't exist
const { database } = await cosmosClient.databases.createIfNotExists({ id: databaseName });
console.log(`${database.id} database ready`);

// Create container if it doesn't exist
const { container } = await database.containers.createIfNotExists({
  id: containerName,
  partitionKey: {
      paths: partitionKeyPath
  }
});
console.log(`${container.id} container ready`);

const addUserScore = async (item_id, username, score) => {
  const database = cosmosClient.database(databaseId);
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
