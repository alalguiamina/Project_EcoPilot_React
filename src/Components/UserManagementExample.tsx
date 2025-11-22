import React, { useState } from "react";
import {
  useGetUsers,
  useGetUser,
  useCreateUser,
  useUpdateUser,
  usePartialUpdateUser,
  useDeleteUser,
} from "../hooks";
import type {
  CreateUserRequest,
  PartialUpdateUserRequest,
} from "../types/user";

/**
 * Example component demonstrating how to use all the user API hooks
 */
export const UserManagementExample: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // Fetch all users
  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
  } = useGetUsers();

  // Fetch a specific user (only when selectedUserId is set)
  const { data: selectedUser, isLoading: userLoading } =
    useGetUser(selectedUserId);

  // Mutations
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const partialUpdateUserMutation = usePartialUpdateUser();
  const deleteUserMutation = useDeleteUser();

  // Example handlers
  const handleCreateUser = async () => {
    const newUser: CreateUserRequest = {
      username: "newuser",
      password: "password123",
      role: "agent",
      sites: [1],
    };

    try {
      await createUserMutation.mutateAsync(newUser);
      console.log("User created successfully!");
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  const handleUpdateUser = async (userId: number) => {
    try {
      await updateUserMutation.mutateAsync({
        userId,
        userData: {
          username: "updated_username",
          role: "user",
          sites: [2],
        },
      });
      console.log("User updated successfully!");
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handlePartialUpdateUser = async (userId: number) => {
    const partialUpdate: PartialUpdateUserRequest = {
      role: "admin", // Only update the role
    };

    try {
      await partialUpdateUserMutation.mutateAsync({
        userId,
        userData: partialUpdate,
      });
      console.log("User partially updated successfully!");
    } catch (error) {
      console.error("Failed to partially update user:", error);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUserMutation.mutateAsync(userId);
        console.log("User deleted successfully!");
        if (selectedUserId === userId) {
          setSelectedUserId(null);
        }
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  if (usersLoading) return <div>Loading users...</div>;
  if (usersError) return <div>Error loading users</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management Example</h1>

      {/* Create User Button */}
      <button
        onClick={handleCreateUser}
        disabled={createUserMutation.isPending}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        {createUserMutation.isPending ? "Creating..." : "Create User"}
      </button>

      {/* Users List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">All Users</h2>
          <div className="space-y-2">
            {users?.map((user) => (
              <div
                key={user.id}
                className={`p-3 border rounded cursor-pointer ${
                  selectedUserId === user.id ? "bg-blue-100" : "bg-white"
                }`}
                onClick={() => setSelectedUserId(user.id)}
              >
                <div className="font-medium">{user.username}</div>
                <div className="text-sm text-gray-600">
                  Role: {user.role} | Sites: {user.sites.join(", ")}
                </div>
                <div className="mt-2 space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdateUser(user.id);
                    }}
                    disabled={updateUserMutation.isPending}
                    className="px-2 py-1 bg-green-500 text-white text-xs rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePartialUpdateUser(user.id);
                    }}
                    disabled={partialUpdateUserMutation.isPending}
                    className="px-2 py-1 bg-yellow-500 text-white text-xs rounded"
                  >
                    Partial Update
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteUser(user.id);
                    }}
                    disabled={deleteUserMutation.isPending}
                    className="px-2 py-1 bg-red-500 text-white text-xs rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected User Details */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Selected User Details</h2>
          {selectedUserId ? (
            userLoading ? (
              <div>Loading user details...</div>
            ) : selectedUser ? (
              <div className="p-3 border rounded bg-gray-50">
                <h3 className="font-medium">User #{selectedUser.id}</h3>
                <p>
                  <strong>Username:</strong> {selectedUser.username}
                </p>
                <p>
                  <strong>Role:</strong> {selectedUser.role}
                </p>
                <p>
                  <strong>Sites:</strong> {selectedUser.sites.join(", ")}
                </p>
              </div>
            ) : (
              <div>User not found</div>
            )
          ) : (
            <div className="text-gray-500">Select a user to view details</div>
          )}
        </div>
      </div>

      {/* Loading States */}
      {(createUserMutation.isPending ||
        updateUserMutation.isPending ||
        partialUpdateUserMutation.isPending ||
        deleteUserMutation.isPending) && (
        <div className="mt-4 p-2 bg-yellow-100 border-l-4 border-yellow-500">
          Processing request...
        </div>
      )}

      {/* Error Display */}
      {(createUserMutation.error ||
        updateUserMutation.error ||
        partialUpdateUserMutation.error ||
        deleteUserMutation.error) && (
        <div className="mt-4 p-2 bg-red-100 border-l-4 border-red-500">
          <p className="text-red-700">
            Error:{" "}
            {JSON.stringify(
              createUserMutation.error ||
                updateUserMutation.error ||
                partialUpdateUserMutation.error ||
                deleteUserMutation.error,
            )}
          </p>
        </div>
      )}
    </div>
  );
};
