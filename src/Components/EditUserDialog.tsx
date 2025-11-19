import { X } from "lucide-react";
import { UserData, Site } from "types/organisation";

interface EditUserDialogProps {
  isOpen: boolean;
  user: UserData | null;
  setUser: (u: UserData) => void;
  sites: Site[];
  onSave: () => void;
  onClose: () => void;
}

export function EditUserDialog({
  isOpen,
  user,
  setUser,
  sites,
  onSave,
  onClose,
}: EditUserDialogProps) {
  if (!isOpen || !user) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <div className="dialog-header">
          <h3>Edit User</h3>
          <button className="btn-icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="dialog-content">
          <div className="form-grid-2">
            <div className="form-field">
              <label>Username</label>
              <input
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
            </div>

            <div className="form-field">
              <label>Email</label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>

            <div className="form-field">
              <label>First Name</label>
              <input
                type="text"
                value={user.firstName}
                onChange={(e) =>
                  setUser({ ...user, firstName: e.target.value })
                }
              />
            </div>

            <div className="form-field">
              <label>Last Name</label>
              <input
                type="text"
                value={user.lastName}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
              />
            </div>

            <div className="form-field">
              <label>Site</label>
              <select
                value={user.site}
                onChange={(e) => setUser({ ...user, site: e.target.value })}
              >
                <option value="">Select site</option>
                {sites.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label>Role</label>
              <select
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value })}
              >
                <option value="Agent de saisie">Agent de saisie</option>
                <option value="User">User</option>
                <option value="Super User">Super User</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>
        </div>

        <div className="dialog-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={onSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditUserDialog;
