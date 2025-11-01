import { Dispatch, SetStateAction } from "react";

type MonthDataShape = {
  mois: string;
};

type Option = {
  value: string;
  label: string;
};

type MonthDataEntryProps<T extends MonthDataShape> = {
  data: T;
  setData: Dispatch<SetStateAction<T>>;
  label?: string;
  mois: Option[];
  required?: boolean;
};

function MonthDataEntry<T extends MonthDataShape>({
  data,
  setData,
  label = "Mois",
  mois,
  required = false,
}: MonthDataEntryProps<T>) {
  return (
    <div className="form-group">
      <label>
        {label}
        {required && " *"}
      </label>
      <select
        value={data.mois}
        onChange={(e) => setData({ ...data, mois: e.target.value })}
      >
        <option value="">Sélectionner</option>
        {mois.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </select>
    </div>
  );
}
export default MonthDataEntry;
