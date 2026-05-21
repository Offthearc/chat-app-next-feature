# chat-app-next-feature

Real-time chat application with user authentication built with React, Firebase, and Vite.

## Prerequisites

- Node.js 18+
- npm 9+
- Firebase project (for real-time features)

## Setup

```bash
git clone git@github.com:Offthearc/chat-app-next-feature.git
cd chat-app-next-feature
npm install
cp .env.local.example .env.local
# Edit .env.local with your Firebase credentials
```

## Running

```bash
npm run dev     # Start dev server at http://localhost:5173
npm run build   # Production build
npm run preview # Preview production build
```

## Testing

```bash
npm test        # Run tests in watch mode
npm test -- --run  # Run tests once
```

## Linting

```bash
npm run lint
```

## Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Email/Password** authentication
3. Create a **Firestore** database in production mode
4. Add this Firestore security rule:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /messages/{messageId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null && request.resource.data.uid == request.auth.uid;
    }
  }
}
```

5. Copy your config values into `.env.local`
