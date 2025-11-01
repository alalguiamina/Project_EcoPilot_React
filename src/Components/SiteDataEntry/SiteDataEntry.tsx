import { Dispatch, SetStateAction } from "react";

type SiteDataShape = {
  site: string;
};

type SiteOption = {
  value: string;
  label: string;
};

type SiteDataEntryProps<T extends SiteDataShape> = {
  data: T;
  setData: Dispatch<SetStateAction<T>>;
  label?: string;
  sites: SiteOption[];
  required?: boolean;
};

function SiteDataEntry<T extends SiteDataShape>({
  data,
  setData,
  label = "Site",
  sites,
  required = false,
}: SiteDataEntryProps<T>) {
  return (
    <div className="form-group">
      <label>
        {label}
        {required && " *"}
      </label>
      <select
        value={data.site}
        onChange={(e) =>
          setData({
            ...data,
            site: e.target.value,
          })
        }
      >
        <option value="">Sélectionner</option>
        {sites.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
  );
}
export default SiteDataEntry;
