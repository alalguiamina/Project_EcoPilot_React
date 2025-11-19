import { X } from "lucide-react";
import Select, { components } from "react-select";
import { Site, NewUser, SiteGroup, UserData } from "types/organisation";

interface AddSiteGroupDialogProps {
  isOpen: boolean;
  newGroup: SiteGroup;
  sites: Site[];
  people: UserData[];
  setNewGroup: (g: SiteGroup) => void;
  onAddGroup: () => void;
  onClose: () => void;
}

export function AddSiteGroupDialog({
  isOpen,
  newGroup,
  setNewGroup,
  sites,
  people,
  onAddGroup,
  onClose,
}: AddSiteGroupDialogProps) {
  if (!isOpen) return null;
  // Build dropdown options from people
  const memberOptions = people.map((p) => ({
    value: p.id,
    label: `${p.firstName} ${p.lastName} (${p.username})`,
    role: p.role,
  }));

  // Custom option with badge
  const Option = (props: any) => {
    const { data } = props;

    // Custom color mapping
    const getRoleStyle = (role: string) => {
      switch (role) {
        case "Admin":
          return { background: "#fee2e2", color: "#b91c1c" }; // red
        case "Super User":
          return { background: "#f3e8ff", color: "#7e22ce" }; // purple
        case "User":
          return { background: "#dbeafe", color: "#1d4ed8" }; // blue
        case "Agent de saisie":
          return { background: "#dcfce7", color: "#15803d" }; // green
        default:
          return { background: "#e2e8f0", color: "#475569" };
      }
    };

    const roleStyle = getRoleStyle(data.role);

    return (
      <components.Option {...props}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{data.label}</span>
          <span
            style={{
              ...roleStyle,
              padding: "2px 6px",
              borderRadius: 6,
              fontSize: 12,
              marginLeft: 8,
            }}
          >
            {data.role}
          </span>
        </div>
      </components.Option>
    );
  };

  // handle multi-select for members
  const toggleMember = (id: number) => {
    const already = newGroup.members.includes(id);
    const updated = already
      ? newGroup.members.filter((m) => m !== id)
      : [...newGroup.members, id];
    setNewGroup({ ...newGroup, members: updated });
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <div className="dialog-header">
          <h3>Add Site Group</h3>
          <button className="btn-icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="dialog-content">
          <div className="form-grid-2">
            {/* Select Site */}
            <div className="form-field">
              <label htmlFor="group-site">Site</label>
              <select
                id="group-site"
                value={newGroup.siteId}
                onChange={(e) =>
                  setNewGroup({
                    ...newGroup,
                    siteId: Number(e.target.value),
                  })
                }
              >
                <option value="">Select site</option>
                {sites.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Group Name */}
            <div className="form-field">
              <label htmlFor="group-name">Unité</label>
              <input
                id="group-name"
                type="text"
                value={newGroup.name}
                onChange={(e) =>
                  setNewGroup({ ...newGroup, name: e.target.value })
                }
                placeholder="Enter group name"
              />
            </div>

            {/* Type */}
            <div className="form-field">
              <label htmlFor="group-type">Type</label>
              <select
                id="group-type"
                value={newGroup.type}
                onChange={(e) =>
                  setNewGroup({
                    ...newGroup,
                    type: e.target.value as "Interne" | "Externe",
                  })
                }
              >
                <option value="Interne">Interne</option>
                <option value="Externe">Externe</option>
              </select>
            </div>

            {/* Description */}
            <div className="form-field full-width">
              <label htmlFor="group-desc">Description</label>
              <input
                id="group-desc"
                type="text"
                value={newGroup.description}
                onChange={(e) =>
                  setNewGroup({ ...newGroup, description: e.target.value })
                }
                placeholder=" Enter description"
              />
            </div>

            {/* Members */}
            <div className="form-field full-width">
              <label htmlFor="members">Affecter des personnes</label>

              <Select
                inputId="members"
                options={memberOptions}
                isMulti
                closeMenuOnSelect={false}
                components={{ Option }}
                placeholder="Sélectionner des utilisateurs..."
                value={memberOptions.filter((o) =>
                  newGroup.members.includes(o.value),
                )}
                onChange={(selected) => {
                  const ids = selected.map((s: any) => s.value);
                  setNewGroup({ ...newGroup, members: ids });
                }}
                styles={{
                  menu: (provided) => ({ ...provided, zIndex: 9999 }),
                  multiValueLabel: (styles) => ({
                    ...styles,
                    fontWeight: "bold",
                  }),
                }}
              />
            </div>
          </div>
        </div>

        <div className="dialog-footer">
          <button className="btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-primary" onClick={onAddGroup}>
            Add Group
          </button>
        </div>
      </div>
    </div>
  );
}
export default AddSiteGroupDialog;
