function KpiCard({ label, value, subtitle, icon, color }) {
  return (
    <div className="card kpi-card">
      <div className="kpi-card-header">
        <span className="kpi-label">{label}</span>
        <img src={icon} alt="Award" className="kpi-icon" />
      </div>
      <div className={`kpi-value ${color}`}>{value}</div>
      <p className="kpi-subtitle">{subtitle}</p>
    </div>
  );
}

export default KpiCard;
