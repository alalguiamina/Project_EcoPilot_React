function SiteDataEntry({ data, setData, label = "Site", sites }) {
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
