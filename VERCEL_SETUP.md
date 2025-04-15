# Setting Up Admin Panel on Vercel

To enable the admin panel on your Vercel deployment, you need to configure environment variables in the Vercel dashboard.

## Database Setup (MongoDB)

The admin panel now uses MongoDB to store blog posts. To set it up:

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (the free tier is sufficient)
3. In the Security section, create a database user with read/write permissions
4. In Network Access, add your IP address or allow access from anywhere (0.0.0.0/0)
5. Once your cluster is created, click on "Connect" and select "Connect your application"
6. Copy the connection string and replace the placeholders with your actual username and password
7. Use this connection string as your `MONGODB_URI` environment variable in Vercel

## Required Environment Variables

Add the following environment variables in your Vercel project settings:

1. `NEXT_PUBLIC_ADMIN_USERNAME` - The username for the admin panel (e.g., `admin`)
2. `ADMIN_PASSWORD` - The password for the admin panel (use a strong password, not the default)
3. `MONGODB_URI` - Your MongoDB connection string
4. `NEXT_PUBLIC_SITE_URL` - The URL of your deployed site (e.g., https://modecollapse.vercel.app)

## Limitations

The admin panel on Vercel has some limitations:

1. **Read-only filesystem**: Vercel's production environment has a read-only filesystem, which means changes made to blog posts in the admin panel won't persist across deployments or serverless function invocations. The admin panel will work, but changes will only be visible until the serverless function is recycled.

## Features of the Database-backed Admin Panel

With the MongoDB implementation, the admin panel now:

1. Persists all changes to blog posts across deployments and serverless function invocations
2. Seeds the database with initial blog post data if none exists
3. Provides a fallback to static data if the database connection fails
4. Maintains the same API interface, making it easy to switch between storage methods

## Setting Up Environment Variables in Vercel

1. Go to your project in the Vercel dashboard
2. Click on "Settings"
3. Select "Environment Variables" from the left sidebar
4. Add the required environment variables mentioned above
5. Deploy or redeploy your project

## Future Improvements

For a production-ready admin panel, consider:

1. Implementing a more secure authentication method (NextAuth.js, Auth0, Clerk, etc.)
2. Setting up image uploads to a storage service (AWS S3, Cloudinary, Vercel Blob Storage)
3. Adding user management features
4. Implementing a full-featured CMS like Contentful, Sanity, or Strapi if needs become more complex 