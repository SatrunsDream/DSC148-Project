# House Valuation Demo - Architecture Documentation

## Overview
The House Valuation Demo is a full-stack web application that provides house value predictions and neighborhood information. The application features a modern, user-friendly interface with a consistent green theme and elegant typography.

## Frontend Architecture

### Component Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── LocationMap.jsx       # Handles map display and nearby places
│   ├── App.js                    # Main application component
│   ├── api.js                    # API calls
│   ├── config.js                 # Configuration file for environment variables
│   └── index.js                  # Application entry point
```

### Design System
- **Theme**: Material-UI based custom theme
  - Primary Color: Green (#4caf50)
  - Secondary Color: Light Green (#81c784)
  - Background: Light Green (#e8f5e9)
  - Typography: Dancing Script for headings, system fonts for body text

### Components

#### App.js (Main Component)
1. **Input Form Section**
   - House details input fields
   - Form validation
   - Submission handling
   - Styled with gradient background and consistent spacing

2. **Prediction Results Section**
   - Displays predicted house value
   - Shows valuation status
   - Property rating display
   - Styled with elegant typography and green theme

3. **Area Information Section**
   - Map integration
   - Nearby amenities display
   - Location details

#### LocationMap.jsx
1. **Map Display**
   - Google Maps integration
   - Custom markers for locations
   - Interactive InfoWindows

2. **Nearby Places**
   - Categories:
     - Schools
     - Grocery Stores
     - Hospitals & Medical Centers
     - Parks & Recreation
     - Restaurants
     - Public Transit
     - Shopping Centers
   - Limited to 3 places per category
   - Styled listings with hover effects

### API Integration

#### Frontend Endpoints
1. **Prediction API**
   ```javascript
   POST /api/predict-house-value
   Body: {
     address: string,
     price: number | null,
     square_footage: number,
     bedrooms: number,
     bathrooms: number,
     age: number
   }
   ```

2. **Geocoding API**
   ```javascript
   GET /api/geocode?address={address}
   ```

3. **Nearby Places API**
   ```javascript
   GET /api/nearby-places?latitude={lat}&longitude={lng}&type={type}
   ```

### Styling Architecture

#### Theme Configuration
```javascript
const theme = createTheme({
  palette: {
    primary: { main: '#4caf50' },
    secondary: { main: '#81c784' },
    background: { default: '#e8f5e9' }
  },
  typography: {
    h3: { fontFamily: "'Dancing Script', cursive" },
    h6: { fontFamily: "'Dancing Script', cursive" },
    prediction: { fontFamily: "'Dancing Script', cursive" }
  }
});
```

#### Component Styling
- Material-UI styled components
- Consistent padding and margins
- Responsive grid layout
- Gradient backgrounds
- Soft shadows and borders
- Hover effects on interactive elements

### User Interface Flow
1. User enters house details in the form
2. On submission:
   - Form validates input
   - Sends data to prediction API
   - Displays loading state
3. Results display:
   - Predicted price
   - Valuation status
   - Property rating
4. Map and area information update:
   - Shows location on map
   - Displays nearby amenities
   - Lists area information

## Backend Integration

### API Endpoints
- Prediction service
- Geocoding service
- Places service

### Data Flow
1. Frontend collects user input
2. Data sent to backend APIs
3. Backend processes requests:
   - House value prediction
   - Location geocoding
   - Nearby places search
4. Results returned to frontend
5. UI updates with received data

## Development Guidelines

### Styling Conventions
1. Use theme colors consistently
2. Maintain spacing hierarchy
3. Follow Material-UI best practices
4. Use Dancing Script font for headings
5. Implement responsive design patterns

### Component Guidelines
1. Keep components focused and single-responsibility
2. Implement proper error handling
3. Use consistent prop naming
4. Maintain clean code structure
5. Document complex logic

### State Management
1. Use React hooks for local state
2. Implement proper loading states
3. Handle errors gracefully
4. Maintain clean data flow

## Future Enhancements
1. Add more detailed property analysis
2. Implement user accounts
3. Add historical price trends
4. Enhance map interactions
5. Add more amenity categories
6. Implement caching for API responses

## Deployment Guide

### Prerequisites
1. **Domain Name** (Optional but recommended)
   - Register a domain through providers like:
     - Namecheap
     - GoDaddy
     - Google Domains

2. **SSL Certificate** (Required for Google Maps API)
   - Let's Encrypt (free)
   - Or provided by hosting platform

3. **Environment Variables**
   ```
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_key
   GOOGLE_MAPS_API_KEY=your_google_maps_key
   ```

### Frontend Deployment

#### Option 1: Vercel (Recommended)
1. **Preparation**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deployment Steps**
   - Create account on vercel.com
   - Install Vercel CLI: `npm i -g vercel`
   - Run: `vercel`
   - Configure environment variables in Vercel dashboard
   - Set up custom domain if needed

#### Option 2: Netlify
1. **Preparation**
   - Create netlify.toml in frontend root:
     ```toml
     [build]
       command = "npm run build"
       publish = "build"
     ```

2. **Deployment Steps**
   - Create account on netlify.com
   - Connect GitHub repository
   - Configure environment variables
   - Set up custom domain

### Backend Deployment

#### Option 1: Railway.app (Recommended)
1. **Preparation**
   - Create Procfile in backend root:
     ```
     web: uvicorn app:app --host 0.0.0.0 --port $PORT
     ```

2. **Deployment Steps**
   - Create account on railway.app
   - Connect GitHub repository
   - Add environment variables
   - Configure domain settings

#### Option 2: Heroku
1. **Preparation**
   - Create requirements.txt:
     ```bash
     pip freeze > requirements.txt
     ```
   - Create runtime.txt:
     ```
     python-3.9.x
     ```

2. **Deployment Steps**
   - Create Heroku account
   - Install Heroku CLI
   - Run:
     ```bash
     heroku create
     git push heroku main
     ```
   - Configure environment variables

### Database Setup (If needed)
1. **PostgreSQL Options**
   - Railway.app (Included with hosting)
   - Heroku Postgres (Add-on)
   - Supabase

### Production Configuration

#### Frontend
1. **Update API Endpoints**
   ```javascript
   // Create .env.production
   REACT_APP_API_URL=https://your-backend-url.com
   ```

2. **Build Optimization**
   ```bash
   npm run build
   ```

#### Backend
1. **CORS Configuration**
   ```python
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["https://your-frontend-url.com"],
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

2. **Security Headers**
   ```python
   app.add_middleware(SecurityMiddleware)
   ```

### Monitoring and Maintenance

1. **Analytics Setup**
   - Google Analytics
   - Vercel Analytics
   - Custom tracking

2. **Error Tracking**
   - Sentry integration
   - Error logging

3. **Performance Monitoring**
   - Vercel Speed Insights
   - Google Lighthouse
   - Core Web Vitals

4. **Regular Maintenance**
   - Package updates
   - Security patches
   - Database backups
   - SSL renewal

### Cost Considerations

1. **Free Tier Options**
   - Vercel (Frontend)
   - Railway.app (Backend)
   - Supabase (Database)

2. **Paid Services**
   - Domain name (~$10-15/year)
   - SSL certificate (Free with Let's Encrypt)
   - Google Maps API ($200 free credit/month)

### Post-Deployment Checklist

1. **Testing**
   - Cross-browser testing
   - Mobile responsiveness
   - API endpoints
   - Form submission
   - Map functionality

2. **SEO**
   - Meta tags
   - Robots.txt
   - Sitemap
   - Social media cards

3. **Performance**
   - Image optimization
   - Code splitting
   - Caching strategy
   - CDN setup

4. **Security**
   - API key protection
   - Rate limiting
   - XSS protection
   - CSRF tokens

### Scaling Considerations

1. **Frontend**
   - CDN caching
   - Code splitting
   - Lazy loading
   - Image optimization

2. **Backend**
   - Load balancing
   - Caching layer
   - API rate limiting
   - Database optimization

3. **Infrastructure**
   - Auto-scaling
   - Geographic distribution
   - Backup strategy
   - Disaster recovery
