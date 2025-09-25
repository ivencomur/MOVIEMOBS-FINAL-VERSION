# MovieMobs Angular Client

A responsive single-page application (SPA) for browsing and managing movie collections, built with Angular 18 and Angular Material.

## 🎬 Overview

MovieMobs Angular Client provides a modern, user-friendly interface for the MovieMobs movie database. Users can browse movies, view detailed information about genres and directors, manage their profiles, and maintain a list of favorite movies.

## ✨ Features

- **User Authentication**: Secure registration and login system with JWT tokens
- **Movie Browsing**: Browse and search through movie collections with detailed cards
- **Detailed Information**: View comprehensive movie details, director biographies, and genre descriptions
- **User Profiles**: Manage personal information and account settings
- **Favorites Management**: Add and remove movies from personal favorites list
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Material Design**: Clean, modern interface using Angular Material components
- **Real-time Updates**: Dynamic content updates without page refreshes

## 🚀 Technologies Used

- **Angular 18** - Frontend framework with standalone components
- **Angular Material** - UI component library for consistent design
- **TypeScript** - Type-safe programming language
- **RxJS** - Reactive programming library for async operations
- **Angular Router** - Client-side routing and navigation
- **Angular HTTP Client** - RESTful API communication
- **SCSS** - Advanced styling and theming capabilities
- **Angular CLI** - Development and build tools

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download from nodejs.org](https://nodejs.org/)
- **npm** package manager (comes with Node.js)
- **Angular CLI** - Install globally:
  ```bash
  npm install -g @angular/cli
  ```
- **MovieMobs API** - Backend server running on `http://localhost:8080`

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd moviemobs-angular-client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   - Development: API runs on `http://localhost:8080`
   - Production: API hosted on `https://iecm-movies-api.onrender.com`

4. **Ensure backend is running:**
   - Start the MovieMobs API server
   - Verify connection by checking `src/app/services/fetch-api-data.service.ts`

## 🏃‍♂️ Development

### Start Development Server
```bash
npm start
# or
ng serve
```
Navigate to `http://localhost:4200`. The application will automatically reload when you make changes.

### Build for Production
```bash
npm run build
# or
ng build
```
Build artifacts will be stored in the `dist/` directory with optimizations enabled.

### Run Tests
```bash
npm run test
# or
ng test
```
Launches the test runner in interactive watch mode using Karma.

### Watch Mode
```bash
npm run watch
```
Builds the project and watches for changes, recompiling automatically.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── welcome-page/          # Landing page with authentication
│   │   ├── movie-card/            # Movie grid and detail cards
│   │   ├── user-profile/          # User profile management
│   │   ├── user-login-form/       # Login dialog component
│   │   ├── user-registration-form/ # Registration dialog component
│   │   ├── nav-bar/               # Navigation bar component
│   │   └── dialogs/               # Modal dialog components
│   │       ├── director-dialog/   # Director information modal
│   │       ├── genre-dialog/      # Genre information modal
│   │       └── synopsis-dialog/   # Movie synopsis modal
│   ├── services/
│   │   └── fetch-api-data.service.ts # API communication service
│   ├── app.component.ts           # Root application component
│   ├── app.config.ts              # Application configuration
│   └── app.routes.ts              # Routing configuration
├── assets/                        # Static assets and images
├── environments/                  # Environment configurations
└── styles.scss                    # Global application styles
```

## 🎯 Key Components

### WelcomePageComponent
- Landing page with authentication options
- Material Design cards for login/register actions
- Clean, centered layout for new and returning users

### MovieCardComponent
- Responsive grid layout displaying movie collection
- Interactive movie cards with images, descriptions, and metadata
- Favorite toggle functionality with heart icon
- Modal dialogs for detailed genre, director, and synopsis information

### UserProfileComponent
- User account management and profile editing
- Display and management of favorite movies
- Account deletion functionality with confirmation
- Form validation and error handling

### NavigationComponent
- Responsive navigation bar with Material Design
- Authentication state management
- Quick access to movies, profile, and logout functionality
- Mobile-friendly hamburger menu

### Dialog Components
- **DirectorDialogComponent**: Modal displaying director biography and details
- **GenreDialogComponent**: Modal showing genre descriptions and characteristics  
- **SynopsisDialogComponent**: Modal with complete movie synopsis and details

## 🔧 Services

### FetchApiDataService
Centralized service managing all API communication:

- **User Authentication**: Registration, login, and profile management
- **Movie Data**: Retrieval of movies with populated relationships
- **Favorites Management**: Add/remove movies from user favorites
- **Error Handling**: Comprehensive error processing and user feedback
- **Token Management**: JWT token storage and automatic header injection

**Key Methods:**
- `userRegistration(userDetails)` - Register new user account
- `userLogin(userDetails)` - Authenticate user credentials  
- `getAllMovies()` - Fetch complete movie collection
- `getUserProfile()` - Retrieve user profile with favorites
- `addFavoriteMovie(movieId)` - Add movie to favorites list
- `removeFavoriteMovie(movieId)` - Remove movie from favorites
- `editUser(updatedUser)` - Update user profile information
- `deleteUser()` - Delete user account permanently

## 🛣️ Routing

The application uses Angular Router for navigation:

- `/welcome` - Landing page (default route)
- `/movies` - Movie browsing interface (authenticated users)
- `/profile` - User profile management (authenticated users)

**Route Guards**: Authentication required for `/movies` and `/profile` routes.

## 🔐 Authentication

JWT token-based authentication system:

- **Token Storage**: Secure storage in localStorage
- **Automatic Headers**: Bearer token injection in API requests
- **Route Protection**: Guards prevent unauthorized access
- **Session Management**: Automatic logout on token expiration
- **Error Handling**: Clear feedback for authentication failures

## 📱 Responsive Design

Mobile-first responsive design approach:

- **Flexible Grid Layouts**: CSS Grid and Flexbox for adaptive layouts
- **Touch-Friendly Interactions**: Optimized button sizes and tap targets
- **Breakpoint Management**: Responsive behavior at key screen sizes
- **Mobile Navigation**: Collapsible navigation for smaller screens

## 📚 Documentation

Comprehensive TypeScript documentation available in the `/docs` folder:

- **Generated with TypeDoc**: Professional API documentation
- **Component Documentation**: Detailed component interfaces and methods
- **Service Documentation**: Complete API service documentation
- **Code Examples**: Usage examples for key functionality

Access documentation by opening `docs/index.html` in your browser.

## 🔗 API Integration

Integration with MovieMobs REST API:

- **Base URL**: Configurable via environment files
- **Endpoints**: Complete CRUD operations for users and movies
- **Data Population**: Movie objects with populated genre/director relationships
- **Error Handling**: Graceful degradation and user feedback
- **Retry Logic**: Automatic retry for failed requests

## 🎨 Styling and Theming

Angular Material with custom SCSS:

- **Material Design**: Consistent component library
- **Custom Theming**: Brand-specific color schemes
- **Responsive Typography**: Scalable text across devices
- **Animation**: Smooth transitions and micro-interactions

## 🌐 Browser Support

Tested and compatible with:

- Chrome (latest)
- Firefox (latest) 
- Safari (latest)
- Edge (latest)

## 🧪 Testing

Testing setup with Jasmine and Karma:

- **Unit Tests**: Component and service testing
- **Integration Tests**: End-to-end user workflows
- **Test Coverage**: Comprehensive coverage reporting
- **Continuous Testing**: Watch mode for development

## 🚀 Deployment

### Production Build
```bash
ng build --configuration production
```

### Environment Configuration
- Development: `src/environments/environment.ts`
- Production: `src/environments/environment.prod.ts`

### Build Optimization
- Tree shaking for smaller bundle sizes
- Ahead-of-time (AOT) compilation
- Service worker support for offline functionality
- Progressive Web App (PWA) capabilities

## 🔧 Code Scaffolding

Generate new components and services:

```bash
# Generate a new component
ng generate component component-name

# Generate a new service  
ng generate service service-name

# Generate other schematics
ng generate directive|pipe|service|class|guard|interface|enum|module
```

## ❗ Known Issues

- **Image Loading**: Some movie images may not display if backend doesn't provide valid URLs
- **API Response Time**: First request after server sleep may have longer response times
- **Browser Storage**: Application requires localStorage for authentication tokens

## 🔮 Future Enhancements

- **Advanced Search**: Filtering by genre, year, rating, and director
- **Movie Reviews**: User rating and review system
- **Social Features**: Share favorites and recommendations
- **Offline Support**: Service worker implementation
- **User Preferences**: Customizable interface settings
- **Movie Recommendations**: AI-powered suggestion engine

## 🤖 AI Assistance Declaration

This project required extensive AI assistance to overcome significant technical challenges encountered during development, particularly related to rapidly changing framework versions and deprecated dependencies.

### AI Assistance Was Crucial For:
- Resolving Angular dependency conflicts and version compatibility issues
- Troubleshooting application startup failures due to missing or incompatible packages  
- Reconstructing component implementations when course materials referenced deprecated Angular features
- Standardizing TypeScript documentation and comment formatting for TypeDoc generation
- Providing current best practices when original tutorials became obsolete due to framework updates

### Development Context:
The development process demanded significant independent problem-solving capabilities due to limited mentor support and course materials that had become outdated relative to current framework versions. Leveraging AI assistance enabled successful navigation of these technical obstacles while maintaining application functionality and code quality standards.

### Human Oversight:
All AI-generated solutions underwent thorough testing and review to ensure compatibility with project requirements. Core architectural decisions and user experience design remained under full developer control throughout the development process.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes with proper testing
4. Ensure all tests pass: `npm run test`
5. Add documentation for new features
6. Submit a pull request with detailed description

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For additional help and support:

- **Angular CLI**: Run `ng help` or visit [Angular CLI Documentation](https://angular.dev/tools/cli)
- **Angular Material**: [Material Design Components](https://material.angular.io/)
- **TypeScript**: [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- **Project Issues**: Submit issues via the repository issue tracker

## 🙏 Acknowledgments

- Angular team for the robust framework and excellent documentation
- Angular Material team for the comprehensive component library
- TypeDoc for automated documentation generation
- The open-source community for invaluable resources and support

---

**MovieMobs Angular Client** - Discover and manage your favorite movies with style! 🎬✨