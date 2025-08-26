import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.ico';

const Enroll = () => {
    const navigate = useNavigate();
    const location = useLocation();
    let courseName = decodeURIComponent(location.pathname.split('/').pop().replace(/-/g, ' '));

    const [formData, setFormData] = useState({
        StudentName: '',
        StudentMail: '',
        StudentPhone: '',
        courseName: courseName,
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

        try {
            const response = await fetch(`https://wb132r23-8000.inc1.devtunnels.ms/enroll-now`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
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
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Details</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label htmlFor="StudentName" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="StudentName"
                                name="StudentName"
                                value={formData.StudentName}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter Name"
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="StudentMail" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="StudentMail"
                                name="StudentMail"
                                value={formData.StudentMail}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="abc@email.com"
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="StudentPhone" className="block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="StudentPhone"
                                name="StudentPhone"
                                value={formData.StudentPhone}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="+91 1234567890"
                            />
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

export default Enroll;
