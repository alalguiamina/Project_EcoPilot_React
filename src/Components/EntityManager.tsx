// Components/EntityManager.tsx
import { Plus, Edit, Trash2 } from "lucide-react";

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
}

export function EntityManager<T extends { id?: number }>({
  title,
  fields,
  items,
  newItem,
  setNewItem,
  onAdd,
  onDelete,
}: EntityManagerProps<T>) {
  return (
    <div className="tab-content">
      <div className="form-section">
        <h3></h3>
        <div className="form-grid">
          {fields.map((field, idx) => (
            <div key={idx} className="form-field">
              <label htmlFor={`${title}-${String(field.key)}`}>
                {field.label}
              </label>
              <div
                className={idx === fields.length - 1 ? "input-with-button" : ""}
              >
                <input
                  id={`${title}-${String(field.key)}`}
                  type={field.type || "text"}
                  value={String(newItem[field.key] ?? "")}
                  onChange={(e) =>
                    setNewItem({ ...newItem, [field.key]: e.target.value })
                  }
                  placeholder={field.placeholder}
                />
                {idx === fields.length - 1 && (
                  <button onClick={onAdd} className="btn-add">
                    <Plus className="w-4 h-4" />
                    Ajouter
                  </button>
                )}
              </div>
            </div>
          ))}
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
                  <td key={idx}>{String(item[f.key])}</td>
                ))}
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon btn-edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      className="btn-icon btn-delete"
                      onClick={() => onDelete(item.id!)}
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
