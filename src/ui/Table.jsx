export function Table({ children }) {
    return (
      <div className="overflow-auto">
        <table className="min-w-full text-sm">{children}</table>
      </div>
    );
  }
  export function THead({ headers=[] }) {
    return (
      <thead className="text-left text-slate-600 bg-slate-50">
        <tr className="[&>th]:px-4 [&>th]:py-3 border-b border-slate-200">
          {headers.map(h => <th key={h}>{h}</th>)}
        </tr>
      </thead>
    );
  }
  export function TBody({ children }) {
    return <tbody className="divide-y divide-slate-200">{children}</tbody>;
  }
  export function TR({ children }) {
    return <tr className="table-row [&>td]:px-4 [&>td]:py-3">{children}</tr>;
  }
  