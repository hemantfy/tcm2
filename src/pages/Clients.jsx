import React, { useState } from 'react';
import Button from '../ui/Button.jsx';
import Card, { CardBody } from '../ui/Card.jsx';
import { Table, THead, TBody, TR } from '../ui/Table.jsx';
import sampleClients from '../data/sampleClients.js';
import ClientForm from '../components/ClientForm.jsx';

const Clients = () => {
    const [clients, setClients] = useState(sampleClients);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (client) => {
    const id = clients.length ? clients[clients.length - 1].id + 1 : 1;
    setClients([...clients, { ...client, id }]);
    setShowForm(false);
  };

  return (
    <>
    <div className="space-y-6 fade-in">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Clients</h1>
          <p className="text-sm text-slate-500">Manage client information and relationships.</p>
        </div>
        <Button onClick={() => setShowForm(true)}>Add Client</Button>
      </div>
     
      <Card>
          <CardBody className="p-0">
            <Table>
              <THead headers={["Name", "Contact", "Email"]} />
              <TBody>
                {clients.map((c) => (
                  <TR key={c.id}>
                    <td className="font-medium">{c.firstName} {c.lastName}</td>
                    <td className="text-slate-600">{c.contact}</td>
                    <td className="text-slate-600">{c.email}</td>
                  </TR>
              ))}
                {clients.length === 0 && (
                  <TR>
                    <td colSpan={3} className="px-4 py-12 text-center text-slate-500">
                      No clients available.
                    </td>
                  </TR>
                )}
              </TBody>
            </Table>
          </CardBody>
        </Card>
        </div>
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto fade-in">
          <ClientForm onAdd={handleAdd} onCancel={() => setShowForm(false)} />
        </div>
      )}
    </>
  );
};

export default Clients;