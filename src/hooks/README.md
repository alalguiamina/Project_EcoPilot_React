# User API Hooks Documentation

This directory contains React hooks for interacting with the User API endpoints, built using `@tanstack/react-query` and a custom `fetchClient`.

## Files Overview

### Types (`src/types/user.ts`)

- `User`: User entity interface
- `CreateUserRequest`: Request body for creating users
- `UpdateUserRequest`: Request body for full user updates (PUT)
- `PartialUpdateUserRequest`: Request body for partial user updates (PATCH)
- `DeleteUserResponse`: Response body for user deletion
- `ApiError` & `ValidationError`: Error response types

### API Client (`src/API/fetchClient.ts`)

A custom fetch utility that handles:

- JSON serialization/deserialization
- Authentication headers (Bearer token from localStorage)
- Error handling and response parsing
- Base URL configuration via environment variables

### Available Hooks

#### `useGetUsers(options?)`

Fetches a list of all users.

**Options:**

- `enabled?: boolean` - Whether to run the query (default: true)
- `refetchOnWindowFocus?: boolean` - Refetch on window focus (default: false)
- `staleTime?: number` - Cache time in milliseconds (default: 5 minutes)

```typescript
const { data: users, isLoading, error } = useGetUsers();
```

#### `useGetUser(userId)`

Fetches a specific user by ID.

```typescript
const { data: user, isLoading, error } = useGetUser(123);
```

#### `useCreateUser()`

Creates a new user.

```typescript
const createUserMutation = useCreateUser();

await createUserMutation.mutateAsync({
  username: "newuser",
  password: "password123",
  role: "agent",
  sites: [1],
});
```

#### `useUpdateUser()`

Updates a user (PUT - full update, all fields required).

```typescript
const updateUserMutation = useUpdateUser();

await updateUserMutation.mutateAsync({
  userId: 123,
  userData: {
    username: "updated_username",
    role: "user",
    sites: [2],
  },
});
```

#### `usePartialUpdateUser()`

Partially updates a user (PATCH - only send changed fields).

```typescript
const partialUpdateMutation = usePartialUpdateUser();

await partialUpdateMutation.mutateAsync({
  userId: 123,
  userData: {
    role: "admin", // Only update the role
  },
});
```

#### `useDeleteUser()`

Deletes a user.

```typescript
const deleteUserMutation = useDeleteUser();

await deleteUserMutation.mutateAsync(123);
```

## Setup Requirements

### 1. React Query Provider

Ensure your app is wrapped with a React Query provider:

```typescript
// In your App.tsx or index.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Your app components */}
    </QueryClientProvider>
  );
}
```

### 2. Environment Variables

Set up your API base URL in environment variables:

```bash
# .env
REACT_APP_API_BASE_URL=http://localhost:8000
```

If not set, it defaults to `http://localhost:8000`.

### 3. Authentication

The hooks expect an authentication token in localStorage under the key `authToken`. Make sure to set this after successful login:

```typescript
localStorage.setItem("authToken", "your-jwt-token");
```

## Error Handling

All hooks return standardized error objects. Handle them in your components:

```typescript
const { data, error, isLoading } = useGetUsers();

if (error) {
  console.error("API Error:", error);
  // Display user-friendly error message
}
```

Common error responses:

- `{ detail: "Permission denied message" }` - Permission errors
- `{ sites: ["Validation error message"] }` - Validation errors
- `{ detail: "Network error: Unable to reach the server" }` - Network errors

## Cache Management

The hooks automatically handle cache invalidation:

- Creating a user invalidates the users list
- Updating a user invalidates both the users list and the specific user cache
- Deleting a user removes it from cache and invalidates the users list

## Usage Example

See `src/Components/UserManagementExample.tsx` for a complete working example showing how to use all the hooks together.

## API Endpoints

The hooks interact with these API endpoints:

- `GET /user/users/` - List all users
- `POST /user/users/` - Create user
- `GET /user/users/{id}/` - Get user details
- `PUT /user/users/{id}/` - Update user (full)
- `PATCH /user/users/{id}/` - Update user (partial)
- `DELETE /user/users/{id}/` - Delete user
