// YearDataEntry.js
import React from "react";

function YearDataEntry({ data, setData, label = "Année" }) {
  return (
    <div className="form-group">
      <label>
        {label}
        {required && " *"}
      </label>
      <select
        value={data.annee}
        onChange={(e) => setData({ ...data, annee: e.target.value })}
      >
        <option value="2025">2025</option>
        <option value="2024">2024</option>
        <option value="2023">2023</option>
      </select>
    </div>
  );
}

export default YearDataEntry;
