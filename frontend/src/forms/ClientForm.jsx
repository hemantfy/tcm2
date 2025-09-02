import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, MapPin, Lock, FileText, Upload } from "lucide-react";
import { Input, Textarea, LoadingButton } from "../components/ui/Form";
import { PageLoading } from "../components/ui/Loading";
import axios from "axios";

export default function ClientForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    contact: "",
    email: "",
    address: "",
    photo: "",
    notes: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }
    if (form.contact && !/^[\d\s\-\+\(\)]+$/.test(form.contact)) {
      newErrors.contact = "Contact number is invalid";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const client = {
      ...form,
      name: `${form.firstName} ${form.lastName}`,
      id: Date.now(),
      createdDate: new Date().toISOString().split('T')[0]
    };
    
    console.log('New client:', client);
    setForm({
      firstName: "",
      lastName: "",
      contact: "",
      email: "",
      address: "",
      photo: "",
      notes: "",
      password: ""
    });
    setIsLoading(false);
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND}/api/clients`, form);
      setForm({
        firstName: "",
        lastName: "",
        contact: "",
        email: "",
        address: "",
        photo: "",
        notes: "",
        password: ""
      });
      navigate("/clients");
    } catch (error) {
      if (error.response?.data?.error?.includes('duplicate key error') && error.response.data.error.includes('email')) {
        setErrorMessage('Email already exists. Please use a different email address.');
      } else {
        setErrorMessage('Failed to create client. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">Add New Client</h1>
        <p className="text-gray-600 dark:text-gray-400">Create a new client profile with their basic information and contact details.</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-center">
              <div className="text-red-600 dark:text-red-400 text-sm font-medium">{errorMessage}</div>
              <button 
                onClick={() => setErrorMessage('')}
                className="ml-auto text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
              >
                ×
              </button>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                name="firstName"
                placeholder="Enter first name"
                value={form.firstName}
                onChange={handleChange}
                error={errors.firstName}
                required
                icon={User}
              />
              
              <Input
                label="Last Name"
                name="lastName"
                placeholder="Enter last name"
                value={form.lastName}
                onChange={handleChange}
                error={errors.lastName}
                required
                icon={User}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="Enter email address"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
                required
                icon={Mail}
              />
              
              <Input
                label="Contact Number"
                type="tel"
                name="contact"
                placeholder="Enter contact number"
                value={form.contact}
                onChange={handleChange}
                error={errors.contact}
                icon={Phone}
              />
            </div>
            
            <div className="mt-6">
              <Input
                label="Address"
                name="address"
                placeholder="Enter full address"
                value={form.address}
                onChange={handleChange}
                icon={MapPin}
              />
            </div>
          </div>

          {/* Account Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                icon={Lock}
              />
              
              <Input
                label="Profile Photo URL"
                type="url"
                name="photo"
                placeholder="Enter image URL"
                value={form.photo}
                onChange={handleChange}
                icon={Upload}
              />
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Additional Information</h3>
            <Textarea
              label="Notes"
              name="notes"
              placeholder="Add any additional notes about the client..."
              rows={4}
              value={form.notes}
              onChange={handleChange}
              icon={FileText}
            />
          </div>
          
          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => navigate("/clients")}
              disabled={isLoading}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <LoadingButton
              type="submit"
              isLoading={isLoading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {isLoading ? 'Creating Client...' : 'Create Client'}
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
}