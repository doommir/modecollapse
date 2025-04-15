import mongoose from 'mongoose';

// Connection state tracking
let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    // Use existing connection
    return;
  }

  // Check if we have a valid connection string
  if (!process.env.MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    );
  }

  try {
    // Connect to MongoDB
    const db = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

// Helper function to convert MongoDB object to plain JS object
export const convertDocToObj = (doc: any) => {
  const converted = doc.toObject ? doc.toObject() : doc;
  converted._id = converted._id?.toString();
  return converted;
}; 