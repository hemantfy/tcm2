import Badge from "../ui/Badge.jsx";
import Card, { CardBody } from "../ui/Card.jsx";
import { Table, THead, TBody, TR } from "../ui/Table.jsx";

const toneByStatus = s =>
  s === "todo" ? "info" : s === "in_progress" ? "warn" : s === "review" ? "danger" : "success";

const toneByPriority = p =>
  p === "low" ? "default" : p === "medium" ? "info" : p === "high" ? "warn" : "danger";

export default function TaskTable({ rows }) {
  return (
    <Card>
      <CardBody className="p-0">
        <Table>
          <THead headers={["Title","Client","Assignee","Status","Priority","Due"]} />
          <TBody>
            {rows.map(row => (
              <TR key={row.id}>
                <td className="font-medium">{row.title}</td>
                <td className="text-slate-600">{row.client}</td>
                <td className="text-slate-600">{row.assignee}</td>
                <td><Badge tone={toneByStatus(row.status)}>{labelStatus(row.status)}</Badge></td>
                <td><Badge tone={toneByPriority(row.priority)}>{labelPriority(row.priority)}</Badge></td>
                <td className={row.overdue ? "text-rose-600 font-medium" : ""}>{row.due}</td>
              </TR>
            ))}
            {rows.length === 0 && (
              <TR>
                <td colSpan={6} className="px-4 py-12 text-center text-slate-500">
                  No tasks match your filters.
                </td>
              </TR>
            )}
          </TBody>
        </Table>
      </CardBody>
    </Card>
  );
}

function labelStatus(s) {
  return s === "todo" ? "To‑Do" : s === "in_progress" ? "In Progress" : s === "review" ? "In Review" : "Done";
}
function labelPriority(p) {
  return p === "low" ? "Low" : p === "medium" ? "Medium" : p === "high" ? "High" : "Critical";
}
