import React, { useState } from 'react';
import Card, { CardBody } from '../ui/Card.jsx';
import { Table, THead, TBody, TR } from '../ui/Table.jsx';
import { Input } from '../ui/Input.jsx';
import Button from '../ui/Button.jsx';
import sampleDocuments from '../data/sampleDocuments.js';

const Documents = () => {
  const [search, setSearch] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('');

  const filteredDocs = sampleDocuments.filter((doc) =>
    doc.folder.toLowerCase().includes(search.toLowerCase()) ||
    doc.fileName.toLowerCase().includes(search.toLowerCase())
  );

  const folders = Array.from(new Set(filteredDocs.map((doc) => doc.folder)));
  const docsInFolder = selectedFolder
    ? filteredDocs.filter((doc) => doc.folder === selectedFolder)
    : [];

  return (
    <div className="space-y-6 fade-in">
     <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Documents</h1>
          <p className="text-sm text-slate-500">Store and organize important project documents.</p>
        </div>
        <Input
          placeholder="Search Client/File"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-xs"
        />
      </div>

      {!selectedFolder && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {folders.map((folder) => (
            <Card
              key={folder}
              className="cursor-pointer hover:bg-slate-50"
              onClick={() => setSelectedFolder(folder)}
            >
              <CardBody className="flex items-center gap-2">
                <span className="font-medium">{folder}</span>
              </CardBody>
            </Card>
          ))}
          {folders.length === 0 && (
            <div className="text-slate-500">No folders found.</div>
          )}
        </div>
      )}
        {selectedFolder && (
        <div className="space-y-4">
          <Button onClick={() => setSelectedFolder('')}>&larr; Back to folders</Button>
          <Card>
            <CardBody className="p-0">
              <Table>
                <THead headers={["File Name", "Owner", "Type"]} />
                <TBody>
                  {docsInFolder.map((doc) => (
                    <TR key={doc.id}>
                      <td className="font-medium">{doc.fileName}</td>
                      <td>{doc.folder}</td>
                      <td className="capitalize text-slate-600">{doc.type}</td>
                    </TR>
                  ))}
                  {docsInFolder.length === 0 && (
                    <TR>
                      <td colSpan={3} className="px-4 py-12 text-center text-slate-500">
                        No documents found.
                      </td>
                    </TR>
                  )}
                </TBody>
              </Table>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Documents;