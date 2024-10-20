# Project Documentation

## Libraries Used

### 1. **Supabase**:
Supabase is a backend as a service (BaaS) that provides authentication, database storage, and more.
- Documentation: [Supabase Docs](https://supabase.com/docs)

### 2. **React**:
React is a JavaScript library for building user interfaces, enabling the creation of reusable components.
- Documentation: [React Docs](https://reactjs.org/docs/getting-started.html)

### 3. **Next.js**:
Next.js is a React framework for server-side rendering and static site generation.
- Documentation: [Next.js Docs](https://nextjs.org/docs)

### 4. **ShadCN UI Components**:
This project utilizes ShadCN components like **Button**, **Theme Toggle**, and **Toast Notifications** to manage the user interface.
- **Button**: Provides interactive clickable components.
- **Toast**: For displaying temporary alert messages.
- **Theme Toggle**: Allows switching between light and dark themes.
- Documentation: [ShadCN Toast Docs](https://shadcn.dev/docs/toast)

### 5. **TypeScript**:
TypeScript is a superset of JavaScript with static types, enabling better development tooling.
- Documentation: [TypeScript Docs](https://www.typescriptlang.org/docs/)

### 6. **Lucide Icons**:
Lucide provides icons like `ThumbsUp` and `Repeat` used for post interactions in the app.
- Documentation: [Lucide Icons](https://lucide.dev/)

## Features

1. **Post Creation**:
   - Users can create new posts with titles, content, and optional images.

2. **Like and Repost Functionality**:
   - Users can like or repost any posts. The like and repost counts are updated in real-time.

3. **Toast Notifications**:
   - Toasts appear for actions like liking or reposting a post.

4. **Dark Mode/Theme Toggle**:
   - Users can toggle between light and dark modes.

## Code Reference

### Components Used:

- **Button**: From ShadCN, used for creating and interacting with posts.
- **Card**: Displays each post with its content, image, likes, and reposts.
- **Toast**: Displays notifications to the user on successful or failed actions.
- **ModeToggle**: Provides dark/light mode switching.

### Important Hooks:

- **useToast**: Custom hook to show toast notifications for interactions.
- **useState**: For managing states like `likedPosts`, `repostedPosts`, and `items`.
- **useEffect**: To fetch initial data from Supabase and manage local storage for likes and reposts.

### Supabase Integration:
Supabase is used to fetch posts and handle like/repost updates in the database.

```js
const fetchItems = async () => {
  setLoading(true);
  const { data, error: fetchError } = await supabase.from('social_media').select('*');
  if (fetchError) {
    setError(fetchError.message);
  } else {
    setItems(data || []);
  }
  setLoading(false);
};
