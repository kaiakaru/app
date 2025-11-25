## Quick context for AI coding agents

This is a small Expo (React Native) frontend using `expo-router` (file-based routing). Focus areas for contributors: UI screens under `app/`, auth flow in `app/auth/`, and the tabbed main app under `app/tabs/`.

Key facts an agent should know:

- File-based routing: placing a file under `app/tabs/` creates a screen (e.g. `app/tabs/profile.tsx`). The tabs layout is defined in `app/tabs/layout.tsx` which explicitly lists `Tabs.Screen` entries for `home`, `history`, `stats`, and `profile`.
- Entry routing: `app/index.tsx` redirects to `/auth/login` when not authenticated and `/tabs/home` when authenticated. Authentication is currently a stub (see `app/auth/login.tsx`) — do not assume server-side auth is wired.
- Styling: components use React Native `StyleSheet` and compose screens with `SafeAreaView`, `ScrollView`, `Pressable`, etc. Follow existing inline style patterns for new screens.

Common, repo-specific tasks and examples

- Add a new tab screen (Settings):
  1. Create `app/tabs/settings.tsx` with a screen component.
  2. Add a `Tabs.Screen` entry in `app/tabs/layout.tsx` (name: `settings`) so it appears in the tab bar.

  Example file skeleton to match project conventions:

  ```tsx
  // app/tabs/settings.tsx
  import React from 'react';
  import { SafeAreaView, Text, StyleSheet } from 'react-native';

  export default function Settings() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Settings</Text>
      </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#96B9E7' },
    title: { fontSize: 20, fontWeight: '700', color: '#2973bcff' }
  });
  ```

- Update the profile screen: `app/tabs/profile.tsx` exists but is empty. Implement UI there and navigate using `router.push("/tabs/settings")` or similar.

Build / run / dev commands (from `package.json`)

- Install: `npm install`
- Start the dev server: `npx expo start` (or `npm run start` / `npm run ios` / `npm run android` per platform)
- Linting: `npm run lint`

Notes about data/auth and testing

- Auth is a client-side stub. Real sign-in is not implemented — the login screen calls `router.replace('/tabs/home')`. If you add settings that require auth, either stub them similarly or hook into your auth provider (e.g., AsyncStorage token, Firebase).
- No unit tests or CI configuration detected. Keep changes small and self-contained; add tests only if requested.

Files to inspect when working on Settings/Profile

- `app/tabs/layout.tsx` — where tabs are declared and styled
- `app/index.tsx` — top-level redirect / auth gate
- `app/auth/login.tsx` & `app/auth/signup.tsx` — auth entry points and navigation
- `app/tabs/home.tsx` — example of UI and navigation patterns (SafeAreaView, router usage, footer nav)

When in doubt

- Follow the style and structure used in `home.tsx` and `login.tsx`.
- Keep navigation paths consistent with file names: `router.push('/tabs/<name>')`.

If anything here is unclear or you want me to generate a settings/profile screen scaffold now, tell me whether you'd like state persisted (AsyncStorage) or external auth (e.g., Firebase) and I'll scaffold it.
