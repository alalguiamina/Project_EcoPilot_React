import { Dispatch, SetStateAction } from "react";

type YearDataShape = {
  annee: string;
};

type YearDataEntryProps<T extends YearDataShape> = {
  data: T;
  setData: Dispatch<SetStateAction<T>>;
  label?: string;
  required?: boolean;
};

function YearDataEntry<T extends YearDataShape>({
  data,
  setData,
  label = "Année",
  required = false,
}: YearDataEntryProps<T>) {
  return (
    <div className="form-group">
      <label>
        {label}
        {required && " *"}
      </label>
      <select value={data.annee} onChange={(e) => setData({ ...data, annee: e.target.value })}>
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
      </select>
    </div>
  );
}

export default YearDataEntry;
