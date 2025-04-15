# Setting Up Admin Panel with Custom Domain

To enable the admin panel on your custom domain (`www.modecollapse.io`), you need to configure both Vercel and your DNS settings.

## Domain Setup in Vercel

1. Go to your Vercel project dashboard
2. Click on "Settings" → "Domains"
3. Add your domain: `www.modecollapse.io`
4. Follow Vercel's instructions to verify and configure DNS settings:
   - Add the required DNS records at your domain registrar
   - Typically this includes a CNAME record pointing to `cname.vercel-dns.com`
5. Wait for DNS propagation (can take up to 48 hours, but usually less)

## Database Setup (MongoDB)

The admin panel uses MongoDB to store blog posts. To set it up:

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (the free tier is sufficient)
3. In the Security section, create a database user with read/write permissions
4. In Network Access, add Vercel's IP addresses:
   - For simplicity, you can allow access from anywhere (0.0.0.0/0)
   - For better security, allow access only from specific IP ranges
5. Once your cluster is created, click on "Connect" and select "Connect your application"
6. Copy the connection string and replace the placeholders with your actual username and password
7. Add IP address access:
   - For production: Add 0.0.0.0/0 to allow access from Vercel's servers, or
   - For better security, check Vercel documentation for their IP ranges

## Required Environment Variables

Add the following environment variables in your Vercel project settings:

1. `NEXT_PUBLIC_ADMIN_USERNAME` - The username for the admin panel (e.g., `admin`)
2. `ADMIN_PASSWORD` - The password for the admin panel (use a strong password, not the default)
3. `MONGODB_URI` - Your MongoDB connection string
4. `NEXT_PUBLIC_SITE_URL` - Set this to `https://www.modecollapse.io`

## Accessing Your Admin Panel

Once everything is set up, you can access your admin panel at:

```
https://www.modecollapse.io/admin/login
```

Use the username and password you configured in your environment variables to log in.

## Features of the Database-backed Admin Panel

With the MongoDB implementation, the admin panel now:

1. Persists all changes to blog posts across deployments and serverless function invocations
2. Seeds the database with initial blog post data if none exists
3. Provides a fallback to static data if the database connection fails
4. Maintains the same API interface, making it easy to switch between storage methods
5. Works securely on your custom domain

## Limitations

The admin panel on Vercel has some limitations:

1. **Read-only filesystem**: Vercel's production environment has a read-only filesystem, which means changes made to blog posts in the admin panel won't persist across deployments or serverless function invocations. The admin panel will work, but changes will only be visible until the serverless function is recycled.

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