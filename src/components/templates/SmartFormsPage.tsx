'use client';

import { useState } from 'react';
import Link from 'next/link';
import LandingNavbar from '../layout/LandingNavbar';

// Sample form templates
const formTemplates = [
  {
    id: 1,
    name: 'Basic Lead Capture',
    description: 'Simple form to collect essential contact information',
    fields: [
      { id: 'name', label: 'Full Name', type: 'text', required: true },
      { id: 'email', label: 'Email Address', type: 'email', required: true },
      { id: 'company', label: 'Company Name', type: 'text', required: true },
      { id: 'phone', label: 'Phone Number', type: 'tel', required: false }
    ]
  },
  {
    id: 2,
    name: 'Product Interest',
    description: 'Capture lead details with product preferences',
    fields: [
      { id: 'name', label: 'Full Name', type: 'text', required: true },
      { id: 'email', label: 'Email Address', type: 'email', required: true },
      { id: 'company', label: 'Company Name', type: 'text', required: true },
      { id: 'position', label: 'Job Title', type: 'text', required: true },
      { id: 'product', label: 'Product Interest', type: 'select', required: true, 
        options: ['CRM Suite', 'Marketing Automation', 'Sales Intelligence', 'Customer Support'] },
      { id: 'timeline', label: 'Purchase Timeline', type: 'select', required: false,
        options: ['Immediate', '1-3 months', '3-6 months', '6+ months', 'Just researching'] }
    ]
  },
  {
    id: 3,
    name: 'Event Registration',
    description: 'Register attendees for your upcoming events',
    fields: [
      { id: 'name', label: 'Full Name', type: 'text', required: true },
      { id: 'email', label: 'Email Address', type: 'email', required: true },
      { id: 'company', label: 'Company Name', type: 'text', required: true },
      { id: 'position', label: 'Job Title', type: 'text', required: true },
      { id: 'session', label: 'Preferred Session', type: 'radio', required: true,
        options: ['Morning', 'Afternoon', 'Full Day'] },
      { id: 'dietary', label: 'Dietary Restrictions', type: 'text', required: false },
      { id: 'notes', label: 'Additional Notes', type: 'textarea', required: false }
    ]
  }
];

export default function SmartFormsPage() {
  const [activeTemplate, setActiveTemplate] = useState(formTemplates[0]);
  const [customFields, setCustomFields] = useState(activeTemplate.fields);
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState('text');
  const [newFieldRequired, setNewFieldRequired] = useState(false);
  
  // Handle template selection
  const selectTemplate = (template: any) => {
    setActiveTemplate(template);
    setCustomFields(template.fields);
    setFormValues({});
  };
  
  // Handle form field changes
  const handleFieldChange = (fieldId: string, value: string) => {
    setFormValues({
      ...formValues,
      [fieldId]: value
    });
  };
  
  // Add a new custom field
  const addCustomField = () => {
    if (!newFieldName) return;
    
    const newField = {
      id: `custom_${Date.now()}`,
      label: newFieldName,
      type: newFieldType,
      required: newFieldRequired,
      options: newFieldType === 'select' || newFieldType === 'radio' ? ['Option 1', 'Option 2'] : undefined
    };
    
    setCustomFields([...customFields, newField]);
    setNewFieldName('');
  };
  
  // Remove a field
  const removeField = (fieldId: string) => {
    setCustomFields(customFields.filter(field => field.id !== fieldId));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formValues);
    alert('Form submitted successfully!');
    setFormValues({});
  };
  
  // Render form field based on type
  const renderField = (field: any) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
        return (
          <input
            type={field.type}
            id={field.id}
            name={field.id}
            value={formValues[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required={field.required}
          />
        );
      case 'textarea':
        return (
          <textarea
            id={field.id}
            name={field.id}
            value={formValues[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required={field.required}
          />
        );
      case 'select':
        return (
          <select
            id={field.id}
            name={field.id}
            value={formValues[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required={field.required}
          >
            <option value="">Select an option</option>
            {field.options?.map((option: string) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      case 'radio':
        return (
          <div className="mt-1 space-y-2">
            {field.options?.map((option: string) => (
              <div key={option} className="flex items-center">
                <input
                  type="radio"
                  id={`${field.id}_${option}`}
                  name={field.id}
                  value={option}
                  checked={formValues[field.id] === option}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  required={field.required}
                />
                <label htmlFor={`${field.id}_${option}`} className="ml-2 block text-sm text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LandingNavbar />
      
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 pt-24 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Smart Forms</h1>
              <p className="mt-2 text-blue-100">
                Customizable forms that capture exactly what you need from each lead
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link 
                href="/dashboard" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left sidebar - Form templates */}
            <div className="w-full lg:w-1/4">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Form Templates</h2>
                <div className="space-y-3">
                  {formTemplates.map(template => (
                    <div 
                      key={template.id}
                      className={`p-3 rounded-md cursor-pointer ${activeTemplate.id === template.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}`}
                      onClick={() => selectTemplate(template)}
                    >
                      <h3 className="font-medium text-gray-900">{template.name}</h3>
                      <p className="text-sm text-gray-500">{template.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-3">Add Custom Field</h3>
                  <div className="space-y-3">
                    <div>
                      <label htmlFor="fieldName" className="block text-sm font-medium text-gray-700">Field Label</label>
                      <input
                        type="text"
                        id="fieldName"
                        value={newFieldName}
                        onChange={(e) => setNewFieldName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                        placeholder="e.g. Company Size"
                      />
                    </div>
                    <div>
                      <label htmlFor="fieldType" className="block text-sm font-medium text-gray-700">Field Type</label>
                      <select
                        id="fieldType"
                        value={newFieldType}
                        onChange={(e) => setNewFieldType(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                      >
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="tel">Phone</option>
                        <option value="select">Dropdown</option>
                        <option value="radio">Radio Buttons</option>
                        <option value="textarea">Text Area</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="fieldRequired"
                        checked={newFieldRequired}
                        onChange={(e) => setNewFieldRequired(e.target.checked)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="fieldRequired" className="ml-2 block text-sm text-gray-700">Required field</label>
                    </div>
                    <button
                      type="button"
                      onClick={addCustomField}
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      Add Field
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main content - Form builder */}
            <div className="w-full lg:w-3/4">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-medium text-gray-900">{activeTemplate.name} Form</h2>
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowPreview(!showPreview)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        {showPreview ? 'Edit Form' : 'Preview Form'}
                      </button>
                      <button
                        type="button"
                        onClick={() => alert('Form settings saved!')}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Save Form
                      </button>
                    </div>
                  </div>
                </div>
                
                {showPreview ? (
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Form Preview</h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {customFields.map(field => (
                        <div key={field.id}>
                          <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                          </label>
                          {renderField(field)}
                        </div>
                      ))}
                      <div>
                        <button
                          type="submit"
                          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Form Builder</h3>
                    <div className="space-y-6">
                      {customFields.map((field, index) => (
                        <div key={field.id} className="bg-gray-50 p-4 rounded-md relative">
                          <button
                            type="button"
                            onClick={() => removeField(field.id)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                            <div className="mb-2 sm:mb-0">
                              <h4 className="font-medium text-gray-900">{field.label}</h4>
                              <p className="text-sm text-gray-500">
                                Type: {field.type.charAt(0).toUpperCase() + field.type.slice(1)}
                                {field.required && ' • Required'}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                type="button"
                                className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                                onClick={() => {
                                  if (index > 0) {
                                    const newFields = [...customFields];
                                    [newFields[index], newFields[index - 1]] = [newFields[index - 1], newFields[index]];
                                    setCustomFields(newFields);
                                  }
                                }}
                                disabled={index === 0}
                              >
                                ↑
                              </button>
                              <button
                                type="button"
                                className="inline-flex items-center px-3 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                                onClick={() => {
                                  if (index < customFields.length - 1) {
                                    const newFields = [...customFields];
                                    [newFields[index], newFields[index + 1]] = [newFields[index + 1], newFields[index]];
                                    setCustomFields(newFields);
                                  }
                                }}
                                disabled={index === customFields.length - 1}
                              >
                                ↓
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Form settings */}
              <div className="mt-6 bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Form Settings</h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="formName" className="block text-sm font-medium text-gray-700">Form Name</label>
                    <input
                      type="text"
                      id="formName"
                      defaultValue={activeTemplate.name}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="submitButton" className="block text-sm font-medium text-gray-700">Submit Button Text</label>
                    <input
                      type="text"
                      id="submitButton"
                      defaultValue="Submit"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="successMessage" className="block text-sm font-medium text-gray-700">Success Message</label>
                    <input
                      type="text"
                      id="successMessage"
                      defaultValue="Thank you for your submission!"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="redirectUrl" className="block text-sm font-medium text-gray-700">Redirect URL (Optional)</label>
                    <input
                      type="text"
                      id="redirectUrl"
                      placeholder="https://example.com/thank-you"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Educational Section */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">How Smart Forms Work</h2>
            <p className="mt-4 text-lg text-gray-500">
              Capture exactly the information you need from each lead with customizable forms
            </p>
          </div>
          
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">1. Customize Your Forms</h3>
                <p className="mt-2 text-gray-500">
                  Create forms with exactly the fields you need. Add custom fields, make them required, and arrange them in any order.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">2. Deploy Anywhere</h3>
                <p className="mt-2 text-gray-500">
                  Embed your forms on your website, landing pages, or share them directly with prospects via email or social media.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-md flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">3. Analyze & Optimize</h3>
                <p className="mt-2 text-gray-500">
                  Track form performance, conversion rates, and lead quality. Optimize your forms based on real data.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href="/features" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800"
            >
              Learn more about our lead capture features
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-blue-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">Ready to capture better leads?</h2>
            <p className="mt-4 text-lg text-blue-100">
              Start creating custom forms that convert visitors into qualified leads
            </p>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <Link 
                  href="/signup" 
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
                >
                  Start Free Trial
                </Link>
              </div>
              <div className="ml-3 inline-flex">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
