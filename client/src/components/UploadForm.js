import React, { useState } from 'react';

const UploadForm = () => {
  const [address, setAddress] = useState('');
  const [result, setResult] = useState(null); // Store the result
  const [loading, setLoading] = useState(false); // To show a loading state

  // Handle change for the address input
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const data = { address };

    try {
      const response = await fetch('http://127.0.0.1:8000/predict/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const resultData = await response.json();
      setLoading(false);
      setResult(resultData.output); // Set the result from response
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  // Function to render the result in a table
  const renderTable = () => {
    if (!result) return null;

    const tableHeaders = Object.keys(result);

    return (
      <table border="1">
        <thead>
          <tr>
            {tableHeaders.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(result).map((key) => (
            <tr key={key}>
              <td>{result[key].Pincode}</td>
              <td>{result[key].CircleName}</td>
              <td>{result[key].RegionName}</td>
              <td>{result[key].DivisionName}</td>
              <td>{result[key].OfficeName}</td>
              <td>{result[key].OfficeType}</td>
              <td>{result[key].Delivery}</td>
              <td>{result[key].District}</td>
              <td>{result[key].StateName}</td>
              <td>{result[key].Latitude}</td>
              <td>{result[key].Longitude}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={handleAddressChange}
            required
          />
        </div>
        <button type="submit" className=' bg-slate-950 text-white px-2 py-1 rounded-md mt-2'disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>

      {/* Display result */}
      {result && (
        <div>
          <h2>Post Offices Found:</h2>
          {renderTable()}
        </div>
      )}
    </div>
  );
};

export default UploadForm;
