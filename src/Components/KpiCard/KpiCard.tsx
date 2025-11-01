type KpiCardProps = {
  label: string;
  value: string;
  subtitle: string;
  icon: string;
  color: string;
};

const KpiCard = ({ label, value, subtitle, icon, color }: KpiCardProps) => {
  return (
    <div className="card kpi-card">
      <div className="kpi-card-header">
        <span className="kpi-label">{label}</span>
        <img src={icon} alt={label} className="kpi-icon" />
      </div>
      <div className={`kpi-value ${color}`}>{value}</div>
      <p className="kpi-subtitle">{subtitle}</p>
    </div>
  );
};

export default KpiCard;
