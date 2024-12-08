import React, { useState, useEffect } from 'react';
import './crimeReportingSystem.css';
import karachiDistricts from "./karachiDistricts";
import '@fortawesome/fontawesome-free/css/all.min.css';

function CrimeReportingSystem() {
    const [districts, setDistricts] = useState([]);
    const [areas, setAreas] = useState([]);
    const [subAreas, setSubAreas] = useState([]);
    const [crime, setCrime] = useState('');
    const [description, setDescription] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [name, setName] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [selectedSubArea, setSelectedSubArea] = useState('');

    // Populate districts when the component mounts
    useEffect(() => {
        const districtKeys = Object.keys(karachiDistricts);
        if (districtKeys.length) {
            setDistricts(districtKeys);
        }
    }, []);

    const handleDistrictChange = (event) => {
        const district = event.target.value;
        setSelectedDistrict(district);
        setAreas(karachiDistricts[district]?.areas || []);
        setSubAreas([]);
        setSelectedArea('');
        setSelectedSubArea('');
    };

    const handleAreaChange = (event) => {
        const area = event.target.value;
        setSelectedArea(area);
        setSubAreas(karachiDistricts[selectedDistrict]?.subareas[area] || []);
        setSelectedSubArea('');
    };

    const handleSubAreaChange = (event) => {
        setSelectedSubArea(event.target.value);
    };

    const handleCrimeChange = (event) => {
        setCrime(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleAnonymousChange = (event) => {
        setIsAnonymous(event.target.checked);
        if (event.target.checked) {
            setName('');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const reportData = {
            district: selectedDistrict,
            area: selectedArea,
            subArea: selectedSubArea,
            crime: crime,
            description: description,
            name: isAnonymous ? 'Anonymous' : name,
            isAnonymous: isAnonymous,
            timestamp: new Date().toISOString(),
        };

        // Retrieve existing reports from localStorage or initialize empty array
        const storedReports = JSON.parse(localStorage.getItem('crimeReports')) || [];

        // Save the new report to the array
        storedReports.push(reportData);

        // Store the updated reports array back in localStorage
        localStorage.setItem('crimeReports', JSON.stringify(storedReports));

        alert('Report submitted successfully');
    };

    const sendEmergencyAlert = () => {
        alert('Emergency Alert Sent! Please stay safe.'); 
    };

    return (
        <div className="container">
            <h1 className='appTitle'>Crime Reporting System<br /><small>جرم کی رپورٹنگ کا نظام</small></h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={isAnonymous}
                            onChange={handleAnonymousChange}
                        />
                        <span>Report Anonymously / گمنام رپورٹ کریں</span>
                    </label>
                </div>

                {!isAnonymous && (
                    <div>
                        <label htmlFor="name">Your Name (Optional) / آپ کا نام (اختیاری):</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name / اپنا نام درج کریں"
                        />
                    </div>
                )}

                <label htmlFor="district">Select District (Required) / ضلع منتخب کریں (ضروری):</label>
                <select
                    id="district"
                    required
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                >
                    <option value="" disabled>Select District / ضلع منتخب کریں</option>
                    {districts.map((district) => (
                        <option key={district} value={district}>
                            {district}
                        </option>
                    ))}
                </select>

                <label htmlFor="area">Select Area (Required) / علاقہ منتخب کریں (ضروری):</label>
                <select
                    id="area"
                    required
                    value={selectedArea}
                    onChange={handleAreaChange}
                    disabled={!selectedDistrict}
                >
                    <option value="" disabled>Select Area / علاقہ منتخب کریں</option>
                    {areas.map((area) => (
                        <option key={area} value={area}>
                            {area}
                        </option>
                    ))}
                </select>

                <label htmlFor="subarea">Select Sub-area (Required) / ذیلی علاقہ منتخب کریں (ضروری):</label>
                <select
                    id="subarea"
                    required
                    value={selectedSubArea}
                    onChange={handleSubAreaChange}
                    disabled={!selectedArea}
                >
                    <option value="" disabled>Select Sub-area / ذیلی علاقہ منتخب کریں</option>
                    {subAreas.map((subArea) => (
                        <option key={subArea} value={subArea}>
                            {subArea}
                        </option>
                    ))}
                </select>

                <label htmlFor="crime">Select a Crime (Required) / جرم منتخب کریں (ضروری):</label>
                <select id="crime" required value={crime} onChange={handleCrimeChange}>
                    <option value="" disabled>Select a Crime / جرم منتخب کریں</option>
                    <option value="Theft">💰 Theft / چوری</option>
                    <option value="Assault">🧑‍⚖️ Assault / حملہ</option>
                    <option value="Fraud">💳 Fraud / دھوکہ دہی</option>
                    <option value="Other">❗ Other / دیگر</option>
                </select>

                <div style={{ display: crime ? 'block' : 'none' }}>
                    <label htmlFor="description">Description (Required) / تفصیل (ضروری):</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Describe the crime... / جرم کی وضاحت کریں..."
                        required
                    />
                </div>

                <button type="submit">Submit Report / رپورٹ جمع کریں</button>
            </form>

            <button className="emergency-button" onClick={sendEmergencyAlert}>
                <i className="fas fa-phone-alt"></i>
            </button>

        </div>
    );
}

export default CrimeReportingSystem;
