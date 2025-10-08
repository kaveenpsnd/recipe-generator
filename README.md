# KitchenGenie 🧞‍♂️

> Transform your pantry into delicious recipes with AI-powered assistance

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-61dafb)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~54.0-000020)](https://expo.dev/)

KitchenGenie is a production-ready React Native mobile app that generates personalized recipes from ingredients you already have. Built with Expo, TypeScript, and Firebase.

## ✨ Features

- 🔐 **Authentication**: Secure login with email/password and social providers
- 🥘 **Smart Recipe Generation**: AI-powered recipe creation from pantry items
- 🏪 **Pantry Management**: Track ingredients with expiration dates
- 📊 **Nutrition Tracking**: Detailed macro breakdowns with verified data
- 👨‍🍳 **Step-by-Step Cooking**: Interactive cooking mode with voice guidance
- 🌍 **Community Feed**: Share and discover recipes from other users
- ⚡ **Quick Refinements**: Boost protein, swap ingredients, or regenerate recipes
- ♿ **Accessibility First**: Full VoiceOver support and WCAG compliance

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Presentation Layer                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │  Auth    │  │  Pantry  │  │  Recipe  │  │Community│ │
│  │ Screens  │  │ Screens  │  │ Screens  │  │ Screens │ │
│  └─────┬────┘  └─────┬────┘  └─────┬────┘  └────┬────┘ │
│        │             │              │             │      │
└────────┼─────────────┼──────────────┼─────────────┼──────┘
         │             │              │             │
┌────────┼─────────────┼──────────────┼─────────────┼──────┐
│        │       State Management (Zustand)          │      │
│  ┌─────▼────┐  ┌────▼────┐  ┌──────▼────┐  ┌─────▼───┐ │
│  │ useAuth  │  │usePantry│  │useRecipe  │  │useComm. │ │
│  │  Store   │  │  Store  │  │  Store    │  │  Store  │ │
│  └─────┬────┘  └────┬────┘  └──────┬────┘  └─────┬───┘ │
└────────┼────────────┼───────────────┼──────────────┼─────┘
         │            │               │              │
┌────────┼────────────┼───────────────┼──────────────┼─────┐
│        │      Services Layer         │              │     │
│  ┌─────▼────┐  ┌───▼─────┐  ┌──────▼────┐  ┌─────▼───┐ │
│  │   Auth   │  │Firestore│  │    AI     │  │ Storage │ │
│  │ Service  │  │ Service │  │  Service  │  │ Service │ │
│  └─────┬────┘  └────┬────┘  └──────┬────┘  └─────┬───┘ │
└────────┼────────────┼───────────────┼──────────────┼─────┘
         │            │               │              │
         └────────────▼───────────────▼──────────────┘
                   Firebase Backend
```

## 📁 Project Structure

```
version2/
├── src/
│   ├── app/
│   │   ├── screens/         # Feature-based screen components
│   │   │   ├── auth/         # Login, Signup, Onboarding
│   │   │   ├── home/         # Dashboard
│   │   │   ├── pantry/       # Pantry management & input
│   │   │   ├── recipe/       # Recipe detail, steps, player
│   │   │   ├── community/    # Feed, post creation
│   │   │   ├── saved/        # Favorites
│   │   │   └── settings/     # User settings
│   │   └── navigation/       # Navigation configuration
│   ├── components/          # Reusable UI components
│   │   ├── buttons/
│   │   ├── badges/
│   │   ├── cards/
│   │   └── layout/
│   ├── hooks/               # Custom React hooks
│   ├── stores/              # Zustand state stores
│   ├── services/            # Business logic & API integrations
│   │   ├── auth/            # Firebase Authentication
│   │   ├── db/              # Firestore helpers
│   │   ├── ai/              # AI recipe generation (mock + interface)
│   │   └── storage/         # Image uploads
│   ├── utils/               # Utility functions
│   ├── theme/               # Design tokens (colors, spacing, typography)
│   ├── i18n/                # Internationalization
│   └── types/               # TypeScript type definitions
├── assets/                  # Images, icons, fonts
├── .env.example             # Environment variables template
├── app.config.js            # Expo configuration
└── package.json             # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Studio
- Firebase project (for backend services)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd version2
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Firebase credentials:
   ```env
   EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
   EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
   EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
   EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

### Running on Different Platforms

```bash
# iOS (requires Mac)
npm run ios

# Android
npm run android

# Web
npm run web
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 🔍 Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Type check
npm run typecheck
```

## 📦 Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | React Native + Expo |
| **Language** | TypeScript (strict mode) |
| **Navigation** | React Navigation v7 |
| **State** | Zustand + AsyncStorage |
| **Backend** | Firebase (Auth, Firestore, Storage) |
| **Forms** | React Hook Form + Zod |
| **Styling** | Styled Components |
| **Icons** | @expo/vector-icons |
| **Testing** | Jest + React Native Testing Library |
| **Linting** | ESLint + Prettier |
| **CI/CD** | GitHub Actions |

## 🎨 Design System

KitchenGenie uses a comprehensive design system with consistent:
- **Colors**: Primary, secondary, semantic (success, warning, error)
- **Typography**: Scalable fonts with accessibility support
- **Spacing**: 8px base unit system
- **Shadows**: Elevation-based shadow system
- **Components**: Reusable, accessible components

See `src/theme/index.ts` for the complete design tokens.

## 🔐 Security

- Firebase credentials stored in `.env` (never committed)
- Firestore security rules enforce data access policies
- Authentication required for sensitive operations
- Input validation using Zod schemas

## ♿ Accessibility

- Minimum 44×44 touch targets
- VoiceOver labels on all interactive elements
- High contrast color ratios (WCAG AA compliant)
- Reduced motion support
- Scalable fonts

## 🌍 Internationalization

Currently supports English (en) with infrastructure for additional languages. Translation files located in `src/i18n/`.

## 📱 Screens & Features

### Auth Flow
- ✅ Splash Screen
- ✅ Onboarding (3 slides)
- ✅ Login / Signup
- ✅ Profile Setup

### Main Features
- ✅ Dashboard (Quick Actions)
- ✅ Pantry Management (Categories, Expiration)
- ✅ Recipe Generation (AI-powered)
- ✅ Recipe Detail (Nutrition, Steps, Tips)
- ✅ Cooking Mode (Step-by-step)
- ✅ Shopping List
- ✅ Community Feed
- ✅ Favorites
- ✅ Settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Firebase for backend infrastructure
- Expo team for the amazing development experience
- React Navigation for seamless navigation
- The open-source community

---

**Built with ❤️ by the KitchenGenie Team**
