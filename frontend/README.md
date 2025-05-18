# Medical Marketplace Frontend

This is the frontend application for the Medical Marketplace, built with Next.js, React, TypeScript, and Tailwind CSS.

## Overview

The Medical Marketplace frontend provides a user interface for browsing and viewing medical products and procedures. It's built using Next.js 14 with the App Router, React 18, and styled with Tailwind CSS.

## Project Structure

```
frontend/
├── public/                # Static assets
│   └── images/            # Image assets
├── src/                   # Source code
│   ├── app/               # Next.js App Router pages
│   │   ├── products/      # Product listing and detail pages
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout component
│   │   └── page.tsx       # Home page component
│   └── components/        # Reusable React components
├── next.config.js         # Next.js configuration
├── package.json           # Project dependencies and scripts
├── postcss.config.js      # PostCSS configuration for Tailwind
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Features

- **Home Page**: Displays featured products and marketplace information
- **Products Page**: Lists all available medical products and procedures
- **Product Detail Page**: Shows detailed information about a specific product
- **Responsive Design**: Works on desktop and mobile devices
- **Category Filtering**: Filter products by category

## How It Works

The frontend application is built with Next.js using the App Router architecture. Here's how it works:

1. **Page Structure**:
   - `app/page.tsx`: The home page with featured products and marketing content
   - `app/products/page.tsx`: Lists all available products with filtering options
   - `app/products/[id]/page.tsx`: Dynamic route for individual product details

2. **Data Fetching**:
   - Currently, the application uses hardcoded data for demonstration purposes
   - In a production environment, it would fetch data from the backend API using Axios
   - The API endpoints would be called from the page components or through custom hooks

3. **Styling**:
   - The application uses Tailwind CSS for styling
   - Custom utility classes like `btn`, `btn-primary`, and `product-card` are defined in globals.css

4. **Navigation**:
   - Next.js Link component is used for client-side navigation between pages
   - Dynamic routes are used for product detail pages

## How to Run

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository (if not already done)
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Development Server

Run the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

Build the application for production:

```bash
npm run build
# or
yarn build
```

Start the production server:

```bash
npm run start
# or
yarn start
```

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint to check for code quality issues

## API Integration

The frontend is designed to work with the Medical Marketplace backend API. In a production environment, you would:

1. Configure the API base URL in an environment variable
2. Create API service files to handle requests to different endpoints
3. Use React hooks to manage API state and data fetching

Example API integration (not currently implemented):

```typescript
// Example API service
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};
```

## Connecting to the Backend

To connect the frontend to the backend:

1. Ensure the backend server is running (default: http://localhost:3001)
2. The frontend is configured to make API requests to this endpoint
3. CORS is enabled on the backend to allow requests from the frontend

For local development, both servers should be running simultaneously.
