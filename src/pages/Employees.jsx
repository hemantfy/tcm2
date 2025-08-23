import React, { useState } from 'react';
import Button from '../ui/Button.jsx';
import Card, { CardBody } from '../ui/Card.jsx';
import { Table, THead, TBody, TR } from '../ui/Table.jsx';
import sampleEmployees from '../data/sampleEmployees.js';
import EmployeeForm from '../components/EmployeeForm.jsx';

const Employees = () => {
  const [employees, setEmployees] = useState(sampleEmployees);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (employee) => {
    const id = employees.length ? employees[employees.length - 1].id + 1 : 1;
    setEmployees([...employees, { ...employee, id }]);
    setShowForm(false);
  };

  return (
    <>
    <div className="space-y-6 fade-in">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Employees</h1>
          <p className="text-sm text-slate-500">View and manage employee records.</p>
        </div>
        <Button onClick={() => setShowForm(true)}>Add Employee</Button>
      </div>
      <Card>
          <CardBody className="p-0">
            <Table>
              <THead headers={["Name", "Contact", "Email", "Role"]} />
              <TBody>
                {employees.map((e) => (
                  <TR key={e.id}>
                    <td className="font-medium">{e.firstName} {e.lastName}</td>
                    <td className="text-slate-600">{e.contact}</td>
                    <td className="text-slate-600">{e.email}</td>
                    <td className="text-slate-600">{e.role}</td>
                  </TR>
              ))}
                {employees.length === 0 && (
                  <TR>
                    <td colSpan={4} className="px-4 py-12 text-center text-slate-500">
                      No employees available.
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
          <EmployeeForm onAdd={handleAdd} onCancel={() => setShowForm(false)} />
        </div>
      )}
    </>
  );
};

export default Employees;