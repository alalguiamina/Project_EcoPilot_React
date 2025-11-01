import React from "react";
function MonthDataEntry({ data, setData, label = "Mois", mois }) {
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
