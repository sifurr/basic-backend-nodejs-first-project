import { Server } from 'http';
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`App listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

// handle unhandled rejection for Asynchronous code
process.on('unhandledRejection', () => {
  console.log(`unhandledRejection detected. Server is shutting down.`);
  if (server) {
    server.close(() => {
      process.exit(1); // if something is running then shutdown the server gracefully
    });
  }
  process.exit(1); // if nothing runs then shutdown the sever immediately
});

// handle unhandled rejection for Synchronous code
process.on('uncaughtException', () => {
  console.log(`uncaughtException detected. Server is shutting down.`);
  process.exit(1); // shutdown the server immediately
});

console.log(gd);
