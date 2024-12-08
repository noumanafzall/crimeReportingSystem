import React, { useState, useEffect } from 'react';
import "./adminDashboard.css"

function AdminDashboard() {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        // Retrieve crime reports from localStorage
        const storedReports = JSON.parse(localStorage.getItem('crimeReports')) || [];
        setReports(storedReports);
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>District</th>
                        <th>Area</th>
                        <th>Sub-area</th>
                        <th>Crime</th>
                        <th>Description</th>
                        <th>Name</th>
                        <th>Anonymous</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report, index) => (
                        <tr key={index}>
                            <td>{report.district}</td>
                            <td>{report.area}</td>
                            <td>{report.subArea}</td>
                            <td>{report.crime}</td>
                            <td>{report.description}</td>
                            <td>{report.name}</td>
                            <td>{report.isAnonymous ? 'Yes' : 'No'}</td>
                            <td>{new Date(report.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminDashboard;
