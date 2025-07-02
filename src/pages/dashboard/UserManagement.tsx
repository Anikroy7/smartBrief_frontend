import { useState } from "react";
import toast from "react-hot-toast";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserRoleMutation,
  useUpdateUserNameMutation,
} from "../../redux/api/authApi";

const roles = ["user", "admin", "editor", "reviewer"];

const UserManagement = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery(undefined);
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [updateUserName] = useUpdateUserNameMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [editingName, setEditingName] = useState<{ [id: string]: string }>({});
  const [savingNameId, setSavingNameId] = useState<string | null>(null);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  const handleRoleChange = async (userId: string, newRole: string) => {
    setUpdatingUserId(userId);
    try {
      await updateUserRole({ userId, role: newRole }).unwrap();
      toast.success("User role updated");
    } catch (error) {
      toast.error("Failed to update role");
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm("Are you sure to delete this user?")) return;
    setDeletingUserId(userId);
    try {
      await deleteUser(userId).unwrap();
      toast.success("User deleted");
    } catch (error) {
      toast.error("Failed to delete user");
    } finally {
      setDeletingUserId(null);
    }
  };

  const handleNameSave = async (userId: string) => {
    const newName = editingName[userId];
    if (!newName?.trim()) return toast.error("Name cannot be empty");

    setSavingNameId(userId);
    try {
      await updateUserName({ userId, name: newName }).unwrap();
      toast.success("Name updated");
    } catch (error) {
      toast.error("Failed to update name");
    } finally {
      setSavingNameId(null);
    }
  };

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error loading users</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <table className="table w-full border">
        <thead>
          <tr>
            <th>Name (Editable)</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.data?.map((user: any) => (
            <tr key={user._id}>
              <td className="flex items-center gap-2">
                <input
                  type="text"
                  className="input input-bordered input-sm"
                  value={editingName[user._id] ?? user.name ?? ""}
                  onChange={(e) =>
                    setEditingName((prev) => ({
                      ...prev,
                      [user._id]: e.target.value,
                    }))
                  }
                />
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => handleNameSave(user._id)}
                  disabled={savingNameId === user._id}
                >
                  {savingNameId === user._id ? "Saving..." : "Save"}
                </button>
              </td>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.role}
                  disabled={updatingUserId === user._id}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="select select-bordered"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <button
                  disabled={deletingUserId === user._id}
                  onClick={() => handleDeleteUser(user._id)}
                  className="btn btn-sm btn-error"
                >
                  {deletingUserId === user._id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
