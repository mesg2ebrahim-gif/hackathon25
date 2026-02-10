
import React, { useState, useRef } from 'react';
import { UserRegistration } from '../types';
import { PROGRAMS } from '../constants';

interface RegistrationFormProps {
  onSubmit: (data: UserRegistration) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    cnic: '',
    email: '',
    phone: '',
    address: '',
    program: '',
    profileImage: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required';
    if (!formData.cnic || !/^\d{5}-\d{7}-\d{1}$/.test(formData.cnic)) newErrors.cnic = 'CNIC format: XXXXX-XXXXXXX-X';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid Email is required';
    if (!formData.phone || formData.phone.length < 11) newErrors.phone = 'Valid Phone number is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.program) newErrors.program = 'Please select a program';
    if (!formData.profileImage) newErrors.profileImage = 'Profile picture is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, profileImage: 'Image must be less than 2MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profileImage: reader.result as string }));
        if (errors.profileImage) {
          setErrors(prev => {
            const updated = { ...prev };
            delete updated.profileImage;
            return updated;
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const id = Math.random().toString(36).substr(2, 9).toUpperCase();
      const submission: UserRegistration = {
        ...formData,
        id,
        issueDate: new Date().toLocaleDateString()
      };
      onSubmit(submission);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-green-600 p-6 text-white text-center">
        <h2 className="text-2xl font-bold">Student Registration</h2>
        <p className="opacity-90">Please fill the form accurately to apply for the programs</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Picture Upload */}
        <div className="md:col-span-2 flex flex-col items-center mb-4">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`w-32 h-32 rounded-2xl border-2 border-dashed flex items-center justify-center cursor-pointer overflow-hidden transition-all ${
              formData.profileImage ? 'border-green-500' : 'border-slate-300 hover:border-green-400 bg-slate-50'
            }`}
          >
            {formData.profileImage ? (
              <img src={formData.profileImage} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-4">
                <svg className="w-8 h-8 mx-auto text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-[10px] font-bold text-slate-400 uppercase mt-2 block">Upload Photo</span>
              </div>
            )}
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
          {errors.profileImage && <span className="text-xs text-red-500 mt-2">{errors.profileImage}</span>}
          {!errors.profileImage && <span className="text-[10px] text-slate-400 mt-2 uppercase font-bold tracking-wider">Passport size photo preferred</span>}
        </div>

        {/* Full Name */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-slate-700 mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className={`px-4 py-2 rounded-lg border focus:ring-2 outline-none transition-all ${errors.fullName ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-green-100 focus:border-green-500'}`}
          />
          {errors.fullName && <span className="text-xs text-red-500 mt-1">{errors.fullName}</span>}
        </div>

        {/* CNIC */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-slate-700 mb-1">CNIC (with dashes)</label>
          <input
            type="text"
            name="cnic"
            value={formData.cnic}
            onChange={handleChange}
            placeholder="42101-1234567-1"
            className={`px-4 py-2 rounded-lg border focus:ring-2 outline-none transition-all ${errors.cnic ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-green-100 focus:border-green-500'}`}
          />
          {errors.cnic && <span className="text-xs text-red-500 mt-1">{errors.cnic}</span>}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-slate-700 mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className={`px-4 py-2 rounded-lg border focus:ring-2 outline-none transition-all ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-green-100 focus:border-green-500'}`}
          />
          {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email}</span>}
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-slate-700 mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="03001234567"
            className={`px-4 py-2 rounded-lg border focus:ring-2 outline-none transition-all ${errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-green-100 focus:border-green-500'}`}
          />
          {errors.phone && <span className="text-xs text-red-500 mt-1">{errors.phone}</span>}
        </div>

        {/* Program Selection */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-semibold text-slate-700 mb-1">Select Program</label>
          <select
            name="program"
            value={formData.program}
            onChange={handleChange}
            className={`px-4 py-2 rounded-lg border focus:ring-2 outline-none transition-all bg-white ${errors.program ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-green-100 focus:border-green-500'}`}
          >
            <option value="">Select a course...</option>
            {PROGRAMS.map(prog => (
              <option key={prog} value={prog}>{prog}</option>
            ))}
          </select>
          {errors.program && <span className="text-xs text-red-500 mt-1">{errors.program}</span>}
        </div>

        {/* Address */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-sm font-semibold text-slate-700 mb-1">Residential Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="House #, Street, City"
            className={`px-4 py-2 rounded-lg border focus:ring-2 outline-none transition-all ${errors.address ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-green-100 focus:border-green-500'}`}
          />
          {errors.address && <span className="text-xs text-red-500 mt-1">{errors.address}</span>}
        </div>

        <div className="md:col-span-2 pt-4">
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center space-x-2"
          >
            <span>Register Now</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
