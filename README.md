# MovieMobs Angular Client

A responsive single-page application (SPA) for browsing and managing movie collections, built with Angular and Angular Material.

## Overview

MovieMobs Angular Client provides a modern, user-friendly interface for the MovieMobs movie database. Users can browse movies, view detailed information about genres and directors, manage their profiles, and maintain a list of favorite movies.

## Features

- **User Authentication**: Secure registration and login system
- **Movie Browsing**: Browse and search through movie collections
- **Detailed Information**: View comprehensive movie details, director biographies, and genre descriptions
- **User Profiles**: Manage personal information and account settings
- **Favorites Management**: Add and remove movies from personal favorites
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Material Design**: Clean, modern interface using Angular Material
- **Real-time Updates**: Dynamic content updates without page refreshes

## Technologies Used

- **Angular 18** - Frontend framework
- **Angular Material** - UI component library
- **TypeScript** - Programming language
- **RxJS** - Reactive programming library
- **Angular Router** - Client-side routing
- **Angular HTTP Client** - API communication
- **SCSS** - Styling and theming
- **Angular CLI** - Development and build tools

## Prerequisites

- Node.js (v18 or higher)
- npm package manager
- Angular CLI (`npm install -g @angular/cli`)
- MovieMobs API running on `http://localhost:8080`

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd moviemobs-angular-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Ensure the backend API is running:
   - Start the MovieMobs API on `http://localhost:8080`
   - Verify the connection in `src/app/services/fetch-api-data.service.ts`

## Development

Run the development server:
```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200`. The application will automatically reload when you make changes to the source files.

## Build

Build the project for production:
```bash
npm run build
# or
ng build
```

Build artifacts will be stored in the `dist/` directory.

## Testing

Run unit tests:
```bash
npm run test
# or
ng test
```

## Application Structure

```
src/
├── app/
│   ├── components/
│   │   ├── welcome-page/          # Landing page with login/register
│   │   ├── movie-card/            # Movie grid and card components
│   │   ├── user-profile/          # User profile management
│   │   ├── user-login-form/       # Login dialog
│   │   ├── user-registration-form/ # Registration dialog
│   │   ├── nav-bar/               # Navigation component
│   │   └── dialogs/               # Movie detail dialogs
│   │       ├── director-dialog/
│   │       ├── genre-dialog/
│   │       └── synopsis-dialog/
│   ├── services/
│   │   └── fetch-api-data.service.ts # API communication service
│   ├── app.component.ts           # Root component
│   ├── app.config.ts             # App configuration
│   └── app.routes.ts             # Routing configuration
├── assets/                       # Static assets
└── styles.scss                   # Global styles
```

## Key Components

### WelcomePageComponent
Landing page with authentication options for new and existing users.

### MovieCardComponent
Displays movie collection in a responsive grid layout with detailed information cards.

### UserProfileComponent
Allows users to view and edit their profile information and manage favorite movies.

### NavigationComponent
Responsive navigation bar with authentication state management.

### Dialog Components
Modal dialogs for displaying detailed information about directors, genres, and movie synopses.

## Services

### FetchApiDataService
Centralized service for all API communication including:
- User authentication and profile management
- Movie data retrieval
- Favorites management
- Error handling and logging

## Routing

- `/welcome` - Landing page (default)
- `/movies` - Movie browsing (authenticated users)
- `/profile` - User profile management (authenticated users)

## Authentication

The application uses JWT token-based authentication:
- Tokens are stored in localStorage
- Protected routes require valid authentication
- Automatic logout on token expiration
- Secure API communication with Bearer tokens

## Responsive Design

The application is fully responsive with:
- Mobile-first design approach
- Flexible grid layouts
- Touch-friendly interactions
- Optimized navigation for all screen sizes

## Documentation

TypeScript documentation is available in the `/docs` folder. Open `docs/index.html` to view complete component and service documentation generated with TypeDoc.

## API Integration

The application integrates with the MovieMobs API for:
- User registration and authentication
- Movie data retrieval with populated relationships
- Real-time favorites management
- Profile updates and account management

## Styling

The application uses Angular Material with custom SCSS:
- Material Design components
- Custom color theming
- Responsive typography
- Consistent spacing and layout

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Submit a pull request

## Known Issues

- Images may not load if the backend doesn't provide valid image URLs
- First API request after server sleep may take longer to respond

## Future Enhancements

- Advanced search and filtering
- Movie reviews and ratings
- Social sharing features
- Offline functionality with service workers
- Advanced user preferences

## License

This project is licensed under the MIT License.