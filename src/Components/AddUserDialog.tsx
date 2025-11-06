import { X } from "lucide-react";

import { Site, Domaine, BusinessUnit, NewUser } from "types/organisation";

interface AddUserDialogProps {
  isOpen: boolean;
  newUser: NewUser;
  sites: Site[];
  domaines: Domaine[];
  businessUnits: BusinessUnit[];
  setNewUser: (u: NewUser) => void;
  onAddUser: () => void;
  onClose: () => void;
}

export function AddUserDialog({
  isOpen,
  newUser,
  setNewUser,
  sites,
  domaines,
  businessUnits,
  onAddUser,
  onClose,
}: AddUserDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <div className="dialog-header">
          <h3>Add New User</h3>
          <button className="btn-icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="dialog-content">
          <p className="dialog-description">Fill in the user details below</p>

          <div className="form-grid-2">
            <div className="form-field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
                placeholder="Enter username"
              />
            </div>

            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                placeholder="Enter email"
              />
            </div>

            <div className="form-field">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                value={newUser.firstName}
                onChange={(e) =>
                  setNewUser({ ...newUser, firstName: e.target.value })
                }
                placeholder="Enter first name"
              />
            </div>

            <div className="form-field">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                type="text"
                value={newUser.lastName}
                onChange={(e) =>
                  setNewUser({ ...newUser, lastName: e.target.value })
                }
                placeholder="Enter last name"
              />
            </div>

            <div className="form-field full-width">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                placeholder="Enter password"
              />
            </div>

            <div className="form-field">
              <label htmlFor="user-site">Site</label>
              <select
                id="user-site"
                value={newUser.site}
                onChange={(e) =>
                  setNewUser({ ...newUser, site: e.target.value })
                }
              >
                <option value="">Select site</option>
                {sites.map((site) => (
                  <option key={site.id} value={site.name}>
                    {site.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="user-domaine">Domain</label>
              <select
                id="user-domaine"
                value={newUser.domaine}
                onChange={(e) =>
                  setNewUser({ ...newUser, domaine: e.target.value })
                }
              >
                <option value="">Select domain</option>
                {domaines.map((domaine) => (
                  <option key={domaine.id} value={domaine.name}>
                    {domaine.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="user-bu">Business Unit</label>
              <select
                id="user-bu"
                value={newUser.businessUnit}
                onChange={(e) =>
                  setNewUser({ ...newUser, businessUnit: e.target.value })
                }
              >
                <option value="">Select business unit</option>
                {businessUnits.map((bu) => (
                  <option key={bu.id} value={bu.name}>
                    {bu.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="user-role">Role</label>
              <select
                id="user-role"
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
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
          <button onClick={onAddUser} className="btn-primary">
            Add User
          </button>
        </div>
      </div>
    </div>
  );
}
export default AddUserDialog;
