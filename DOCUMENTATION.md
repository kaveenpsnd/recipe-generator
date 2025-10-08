# KitchenGenie 🧞‍♂️

> Transform your pantry into delicious recipes with AI-powered assistance

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-61dafb)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~54.0-000020)](https://expo.dev/)
[![Tests](https://img.shields.io/badge/Tests-Jest-green)](https://jestjs.io/)

KitchenGenie is a production-ready React Native mobile app that generates personalized recipes from ingredients you already have. Built with Expo, TypeScript, and Firebase, featuring comprehensive pantry management, interactive cooking modes, and data persistence.

## ✨ Features

### Core Functionality

- 🥘 **Smart Recipe Generation**: AI-powered recipe creation from pantry items with dietary filters
- 🏪 **Pantry Management**: Full CRUD operations with category filtering, search, and quick-add staples
- 📊 **Nutrition Tracking**: Detailed macro breakdowns with verified/estimated badges
- 👨‍🍳 **Interactive Cooking**: Step-by-step cooking mode with progress tracking and pro tips
- 💾 **Save & Recent**: Automatic tracking of recent recipes (last 10) with save functionality
- 📈 **Dashboard Stats**: Personalized greeting, quick stats, and recent recipes carousel

### User Experience

- ⚡ **Quick Actions**: Fast access to common tasks from dashboard
- 🎨 **Consistent Design**: Custom theme system with styled-components
- ♿ **Accessible**: Built with accessibility in mind
- 🌐 **i18n Ready**: Internationalization support built-in
- 📱 **Responsive**: Works on all device sizes

### Technical Highlights

- 🔍 **Type-Safe Navigation**: Fully typed React Navigation v7 setup
- 💪 **State Management**: Zustand with AsyncStorage persistence
- 🧪 **Well-Tested**: Comprehensive unit tests for stores and services
- 🎯 **Strict TypeScript**: No `any` types, full type safety
- 🔧 **Developer Tools**: ESLint 9, Prettier, Husky pre-commit hooks

## 📁 Project Structure

```
src/
├── application/            # Application layer
│   ├── navigation/        # Type-safe navigation setup
│   │   └── RootNavigator.tsx
│   └── screens/           # Screen components organized by feature
│       ├── auth/          # Splash, Onboarding, Login, Signup
│       ├── home/          # Dashboard with stats & carousel
│       ├── pantry/        # Full CRUD pantry management
│       ├── recipe/        # Generation, Detail, Steps, Player
│       ├── community/     # Community feed (placeholder)
│       ├── saved/         # Saved recipes (placeholder)
│       └── settings/      # User settings (placeholder)
│
├── components/            # Reusable UI components
│   ├── badges/           # AllergyBanner, VerificationPill, TimingBadges
│   ├── buttons/          # PrimaryButton
│   ├── cards/            # Card, RecipeCard, StatsCard, ProTipPanel
│   ├── layout/           # EmptyState, LoadingSpinner, ErrorMessage
│   └── nutrition/        # MacroStrip
│
├── services/             # Business logic & API layer
│   └── ai/              # AI recipe service (currently mock)
│       ├── index.ts     # Service adapter interface
│       └── mockRecipeService.ts  # Mock implementation with 4 recipe templates
│
├── stores/               # Zustand state management
│   ├── recipeStore.ts   # Recipe generation, recent/saved tracking
│   ├── pantryStore.ts   # Pantry CRUD with AsyncStorage
│   └── userStore.ts     # User profile management
│
├── types/                # TypeScript definitions
│   ├── models.ts        # Core data models (Recipe, Pantry, User, etc.)
│   └── navigation.ts    # Typed navigation params
│
├── theme/                # Design system
│   └── index.ts         # Colors, spacing, typography, shadows
│
├── i18n/                 # Internationalization
│   ├── translations.ts  # English translations
│   └── index.ts         # Helper functions
│
└── utils/                # Utilities & constants
    ├── constants.ts     # App constants & storage keys
    └── formatters.ts    # Formatting utilities

__tests__/               # Test files
├── stores/
│   ├── recipeStore.test.ts
│   └── pantryStore.test.ts
└── services/
    └── mockRecipeService.test.ts
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd version2
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Run on device/emulator**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on physical device

### Available Scripts

```bash
npm start          # Start Expo development server
npm run android    # Run on Android emulator
npm run ios        # Run on iOS simulator
npm run web        # Run in web browser

npm test           # Run all tests
npm run test:watch # Run tests in watch mode
npm run test:coverage # Generate coverage report

npm run lint       # Check code quality
npm run lint:fix   # Auto-fix linting issues
npm run typecheck  # Run TypeScript compiler check
npm run format     # Format code with Prettier
```

## 🧪 Testing

The project includes comprehensive unit tests for critical business logic.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run specific test file
npm test -- recipeStore.test.ts
```

### Test Coverage

- ✅ **Recipe Store**: Generation, refining, saving, recent tracking
- ✅ **Pantry Store**: CRUD operations, quick-add staples, persistence
- ✅ **Mock Recipe Service**: Recipe generation, refinement actions

### Test Files Location

```
src/
├── stores/__tests__/
│   ├── recipeStore.test.ts
│   └── pantryStore.test.ts
└── services/__tests__/
    └── mockRecipeService.test.ts
```

## 🔧 Tech Stack

### Core Technologies

- **React Native 0.81.4** - Mobile framework
- **Expo SDK 54.0.12** - Development platform
- **TypeScript 5.9.2** - Type-safe JavaScript
- **React Navigation 7** - Type-safe navigation

### State & Data

- **Zustand 5.0.8** - Lightweight state management
- **AsyncStorage 2.2.0** - Local persistence
- **Firebase 12.3.0** - Authentication & database (configured, ready to use)

### UI & Styling

- **Styled Components 6.1.19** - CSS-in-JS styling
- **Expo Vector Icons** - Icon library
- **React Native Safe Area Context** - Safe area handling

### Forms & Validation

- **React Hook Form 7.64.0** - Form state management
- **Zod 4.1.12** - Schema validation

### Development Tools

- **Jest 30** - Testing framework
- **React Native Testing Library** - Component testing
- **ESLint 9.37.0** - Code linting
- **Prettier 3.6.2** - Code formatting
- **Husky 9.1.7** - Git hooks
- **TypeScript 5.9.2** - Static typing

## 📊 App Flow

### Recipe Generation Flow

```
Dashboard
  └─▶ Recipe Generation Screen
      └─▶ Select ingredients from pantry
      └─▶ Choose dietary filter (vegan, gluten-free, etc.)
      └─▶ Select goal (fitness, family, health)
      └─▶ Generate Recipe
          └─▶ Recipe Detail Screen
              ├─▶ View nutrition & timing
              ├─▶ Save recipe
              └─▶ Start Cooking
                  └─▶ Steps Overview
                      └─▶ Step Player (interactive cooking)
```

### Pantry Management Flow

```
Dashboard
  └─▶ Pantry Screen
      ├─▶ View all items (with search & filter)
      ├─▶ Add new item (manual entry)
      ├─▶ Edit existing item
      ├─▶ Delete item
      └─▶ Quick Add Staples (12 common items)
```

## 🎨 Design System

### Theme

The app uses a comprehensive theme system defined in `src/theme/index.ts`:

```typescript
theme = {
  colors: {
    primary: '#FF6B35', // Orange
    secondary: '#4ECDC4', // Teal
    success: '#95E1D3', // Mint
    warning: '#F9A825', // Yellow
    error: '#E63946', // Red
    // ... more colors
  },
  spacing: { xs, sm, md, lg, xl, xxl },
  typography: { sizes, weights },
  borderRadius: { sm, md, lg, full },
  shadows: { sm, md, lg },
};
```

### Components

All UI components follow consistent patterns:

- **Props interface** with TypeScript
- **Styled with theme** values
- **Accessible** by default
- **Reusable** across screens

## 🔐 State Management

### Store Structure

#### Recipe Store (`recipeStore.ts`)

```typescript
{
  currentRecipe: Recipe | null,
  alternatives: Recipe[],
  recentRecipes: Recipe[],      // Last 10 recipes
  savedRecipes: Recipe[],
  isGenerating: boolean,
  error: string | null,

  // Actions
  generate(), loadAlternatives(), refine(),
  setCurrentRecipe(), loadRecentRecipes(),
  saveRecipe(), unsaveRecipe(), clearError()
}
```

#### Pantry Store (`pantryStore.ts`)

```typescript
{
  items: PantryItem[],
  isLoading: boolean,

  // Actions
  loadItems(), addItem(), updateItem(),
  removeItem(), quickAddStaples(), clearAll()
}
```

#### User Store (`userStore.ts`)

```typescript
{
  profile: UserProfile | null,
  isLoading: boolean,

  // Actions
  loadProfile(), updateProfile(),
  setProfile(), clearProfile()
}
```

## 🚧 Current Status & Roadmap

### ✅ Completed (v1.0)

- [x] Project setup with TypeScript & Expo
- [x] Navigation system with type-safe routing
- [x] Complete recipe generation flow
- [x] Recipe detail screen with cooking mode
- [x] Full pantry CRUD management
- [x] Enhanced dashboard with stats
- [x] State management with persistence
- [x] UI component library
- [x] Comprehensive unit tests
- [x] Documentation

### 🔄 In Progress

- [ ] Firebase Authentication integration
- [ ] Real AI service integration (OpenAI/Anthropic)
- [ ] Community feed functionality
- [ ] Camera/barcode scanning for pantry items

### 📋 Planned Features

- [ ] Recipe sharing & social features
- [ ] Meal planning calendar
- [ ] Shopping list generation
- [ ] Voice-guided cooking
- [ ] Nutrition goals tracking
- [ ] Recipe rating & reviews
- [ ] Offline mode improvements

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Run linting (`npm run lint`)
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Code Standards

- Follow existing code style (enforced by ESLint & Prettier)
- Write tests for new features
- Update documentation as needed
- Use TypeScript strict mode
- No `any` types without justification

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Expo](https://expo.dev/)
- UI inspired by modern cooking apps
- Icons from [Expo Vector Icons](https://icons.expo.fyi/)
- State management with [Zustand](https://github.com/pmndrs/zustand)

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Made with ❤️ for home cooks everywhere**
