import mongoose from 'mongoose';

// Define a schema for blog posts
const blogPostSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    thumbnail: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    relatedPosts: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
    versionKey: false, // Removes __v field
  }
);

// Create and export the model
export default mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema); 