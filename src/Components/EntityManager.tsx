// Components/EntityManager.tsx
import { Plus, Edit, Trash2 } from "lucide-react";
import { UserData } from "../types/organisation";

interface FieldConfig<T> {
  key: keyof T;
  label: string;
  placeholder: string;
  type?: string;
}

interface EntityManagerProps<T> {
  title: string;
  fields: FieldConfig<T>[];
  items: T[];
  newItem: T;
  setNewItem: (item: T) => void;
  onAdd: () => void;
  onDelete: (id: number) => void;
  extraActionButton?: React.ReactNode;
  formatField?: (key: keyof T, value: any) => string;
}

export function EntityManager<T extends { id?: number }>({
  title,
  fields,
  items,
  newItem,
  setNewItem,
  onAdd,
  onDelete,
  extraActionButton,
  formatField,
}: EntityManagerProps<T>) {
  return (
    <div className="tab-content">
      <div className="panel-header-row">
        <div className="toolbar">
          <div className="search-bar">
            <svg
              className="search-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>

            <input
              type="text"
              placeholder="Rechercher..."
              onChange={(e) => console.log("search something", e.target.value)}
            />
          </div>

          {extraActionButton && <div>{extraActionButton}</div>}
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              {fields.map((f, idx) => (
                <th key={idx}>{f.label}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                {fields.map((f, idx) => (
                  <td key={idx}>
                    {formatField
                      ? formatField(f.key, item[f.key])
                      : Array.isArray(item[f.key])
                        ? (item[f.key] as any[]).join(", ")
                        : String(item[f.key])}
                  </td>
                ))}
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon btn-edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="btn-icon btn-delete"
                      onClick={() => item.id && onDelete(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default EntityManager;
