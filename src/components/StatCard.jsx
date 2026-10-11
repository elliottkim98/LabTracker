export default function StatCard({ label, value, subtext, icon: Icon }) {
  return (
    <div className="stat-card">
      <div className="stat-icon"><Icon size={20} /></div>
      <div>
        <p className="stat-label">{label}</p>
        <h3>{value}</h3>
        <p className="stat-subtext">{subtext}</p>
      </div>
    </div>
  );
}
