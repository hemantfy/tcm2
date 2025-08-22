import Card, { CardBody } from "../ui/Card.jsx";

export default function StatCard({ label, value, tone }) {
  const toneRing = tone === "warn" ? "ring-amber-100" :
                   tone === "success" ? "ring-emerald-100" : "ring-slate-100";

  return (
    <Card>
      <CardBody className={`grid gap-1 ring-1 ring-inset ${toneRing} rounded-xl`}>
        <div className="text-sm text-slate-500">{label}</div>
        <div className="text-2xl font-semibold">{value}</div>
      </CardBody>
    </Card>
  );
}
