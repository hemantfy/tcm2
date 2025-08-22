import React from 'react';

const Documents = () => {
  return (
    <div className="space-y-6 fade-in">
    <div>
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Documents</h1>
      <p className="text-sm text-slate-500">Store and organize important project documents.</p>
    </div>

    <ul className="list-disc pl-6 text-slate-700 space-y-2">
      <li>Placeholder document 1</li>
      <li>Placeholder document 2</li>
    </ul>
    </div>
  );
};

export default Documents;