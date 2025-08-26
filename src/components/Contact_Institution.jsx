import React, { useState } from 'react';
import logo from '../assets/img/logo.ico';
import { useNavigate } from 'react-router-dom';

const Contact_Institution = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        institutionName: '',
        institutionEmail: '',
        institutionPhone: '',
        applicantName: '',
        applicantPhone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const SendData = {
            iname : formData.institutionName,
            imail : formData.institutionEmail,
            iphone : formData.institutionPhone,
            aname : formData.applicantName,
            aphone : formData.applicantPhone,
        };
      
        try {
          const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/institution-contact`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(SendData),
            });
      
        if (!response.ok) {
            // If response is not in the 200-299 range
            const errorData = await response.json();
            throw new Error(errorData.message || 'Something went wrong on the server.');
            }      
          const responseData = await response.json();
            alert(responseData.message || 'Form submitted successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error submitting form:', error);
        alert(`Error: ${error.message || 'An error occurred while submitting the form. Please try again.'}`);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-blue-600 p-4 flex justify-center">
                    <img src={logo} alt="Institution Logo" className="h-16 w-auto rounded-full" />
                </div>
                
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Institution Contact Details</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4" autoComplete='off'>
                        <div className="space-y-1">
                            <label htmlFor="institutionName" className="block text-sm font-medium text-gray-700">
                                Institution Name
                            </label>
                            <input
                                type="text"
                                id="institutionName"
                                name="institutionName"
                                value={formData.institutionName}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter institution name"
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="institutionEmail" className="block text-sm font-medium text-gray-700">
                                Institution Email
                            </label>
                            <input
                                type="email"
                                id="institutionEmail"
                                name="institutionEmail"
                                value={formData.institutionEmail}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="email@institution.com"
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="institutionPhone" className="block text-sm font-medium text-gray-700">
                                Institution Phone Number
                            </label>
                            <input
                                type="tel"
                                id="institutionPhone"
                                name="institutionPhone"
                                value={formData.institutionPhone}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="+91 1234567890"
                            />
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                            <h3 className="text-lg font-bold text-gray-700 mb-3">Applicant Information</h3>
                            
                            <div className="space-y-1">
                                <label htmlFor="applicantName" className="block text-sm font-medium text-gray-700">
                                    Applicant Name
                                </label>
                                <input
                                    type="text"
                                    id="applicantName"
                                    name="applicantName"
                                    value={formData.applicantName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className="space-y-1 mt-4">
                                <label htmlFor="applicantPhone" className="block text-sm font-medium text-gray-700">
                                    Applicant Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="applicantPhone"
                                    name="applicantPhone"
                                    value={formData.applicantPhone}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="+91 1234567890"
                                />
                            </div>
                        </div>

                        <div className="pt-5">
                            <button 
                                type="submit" 
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact_Institution;