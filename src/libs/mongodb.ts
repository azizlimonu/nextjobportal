import mongoose, { ConnectOptions } from "mongoose";

const MONGODB_URI: string = process.env.MONGODB_URI || "";

interface Connection {
  isConnected: boolean;
}

const connection: Connection = {
  isConnected: false,
};

const connectDb = async (): Promise<void> => {
  try {
    if (connection.isConnected) {
      console.log("Use previous connection to the database.");
      return;
    }

    if (mongoose.connection.readyState === 1) {
      connection.isConnected = true;
      console.log("Use previous connection to the database.");
      return;
    }

    await mongoose.disconnect();

    const db = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    console.log("New connection to the database.");
    connection.isConnected = db.connections[0].readyState === 1;
  } catch (error) {
    console.log(error);
  }
};

const disconnectDb = async (): Promise<void> => {
  try {
    if (connection.isConnected) {
      if (process.env.NODE_ENV === "production") {
        await mongoose.disconnect();
        connection.isConnected = false;
        console.log("Disconnected from the database.");
      } else {
        console.log("Disconnect triggered but in dev Mode.");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const db = { connectDb, disconnectDb };

export default db;
