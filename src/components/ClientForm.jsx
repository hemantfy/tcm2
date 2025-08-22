import { useState } from "react";
import { Input } from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";

export default function ClientForm({ onAdd, onCancel }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    address: "",
    photo: null,
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({
      firstName: "",
      lastName: "",
      contact: "",
      email: "",
      address: "",
      photo: null,
      notes: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-lg">
      <h2 className="text-xl font-bold mb-4">Add Client</h2>
      <div className="grid grid-cols-1 gap-3">
        <Input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} />
        <Input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
        <Input name="contact" placeholder="Contact Number" value={form.contact} onChange={handleChange} />
        <Input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <Input name="address" placeholder="Address" value={form.address} onChange={handleChange} />
        <Input type="file" name="photo" accept="image/*" onChange={handleChange} />
        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
          className="w-full pl-3 pr-3 py-2 rounded-xl border border-slate-200 bg-white placeholder:text-slate-400"
        />
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button type="button" variant="soft" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}