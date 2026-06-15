interface StatCardProps {
  value: string;
  label: string;
}

function StatCard({
  value,
  label
}: StatCardProps) {
  return (
    <div className="stat-card">
      <h2>{value}</h2>
      <p>{label}</p>
    </div>
  );
}

export default StatCard;