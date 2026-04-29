# Tailor Management System

A modern, scalable mobile application for multi-tenant tailor management built with React Native (Expo). Allows multiple tailors to register, log in, and manage their own customers, measurements, orders, and clothing designs independently.

## Features

- **Authentication** — Login/Register with JWT-based auth
- **Dashboard** — Business overview with stats, quick actions, and recent orders
- **Customer Management** — Add, edit, delete customers with measurements and notes
- **Order Management** — Create/track orders with delivery status (Pending, In Progress, Completed)
- **Design Gallery** — Upload reference images for clothing designs
- **Profile & Settings** — Manage business profile and app preferences

## Design

Soft, elegant pastel theme:

| Color          | Hex       |
|----------------|-----------|
| Lavender Grey  | `#8e9aaf` |
| Thistle        | `#cbc0d3` |
| Soft Blush     | `#efd3d7` |
| Lavender Veil  | `#feeafa` |
| Lavender       | `#dee2ff` |

## Project Structure

```
src/
├── api/                  # Axios API layer
│   ├── client.js         # Axios instance with interceptors
│   ├── authApi.js        # Authentication endpoints
│   ├── customerApi.js    # Customer CRUD endpoints
│   ├── orderApi.js       # Order CRUD endpoints
│   └── designApi.js      # Design endpoints
├── assets/               # Fonts & images
├── components/
│   ├── common/           # Reusable UI components
│   │   ├── Button.js     # Configurable button (5 variants, 3 sizes)
│   │   ├── Input.js      # Text input with validation
│   │   ├── Modal.js      # Bottom sheet modal
│   │   ├── Header.js     # Screen header with actions
│   │   ├── Badge.js      # Status badge
│   │   └── EmptyState.js # Empty list placeholder
│   └── cards/            # Domain-specific cards
│       ├── CustomerCard.js
│       ├── OrderCard.js
│       └── StatCard.js
├── context/              # React Context providers
│   ├── AuthContext.js    # Authentication state
│   └── AppContext.js     # App-wide state (customers, orders, designs)
├── hooks/                # Custom hooks
│   ├── useAuth.js        # Authentication hook
│   ├── useFetch.js       # Data fetching hook
│   └── useForm.js        # Form management hook
├── navigation/           # React Navigation setup
│   ├── AppNavigator.js   # Root navigator (auth guard)
│   ├── AuthNavigator.js  # Login/Register stack
│   ├── TabNavigator.js   # Bottom tab navigation
│   ├── CustomerNavigator.js
│   └── OrderNavigator.js
├── screens/
│   ├── Auth/             # Login, Register
│   ├── Dashboard/        # Business overview
│   ├── Customers/        # List, Add/Edit, Details
│   ├── Orders/           # List, Create, Details
│   ├── Designs/          # Design gallery with upload
│   └── Profile/          # Settings & profile
├── theme/                # Centralized theme config
│   └── index.js          # Colors, spacing, typography, shadows
└── utils/                # Helpers & constants
    ├── helpers.js
    └── constants.js
```

## Tech Stack

- **React Native** (Expo SDK 54)
- **React Navigation** (Stack + Bottom Tabs)
- **Axios** for API calls
- **AsyncStorage** for secure token storage
- **Context API** for state management
- **Expo Image Picker** for design uploads

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on specific platform
npm run android
npm run ios
npm run web
```

## Architecture

- **Reusable Components** — All UI elements are configurable via props
- **Clean Separation** — Business logic in hooks/context, UI in components/screens
- **Protected Routes** — Auth guard in AppNavigator automatically redirects
- **Centralized Theme** — Single source of truth for colors, spacing, typography
- **Scalable API Layer** — Axios client with interceptors for auth token injection

## License

MIT
