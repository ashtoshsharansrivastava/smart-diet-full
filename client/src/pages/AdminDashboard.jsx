import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch applicants on load
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        // Assuming you store token in localStorage
        const token = localStorage.getItem('userInfo') 
          ? JSON.parse(localStorage.getItem('userInfo')).token 
          : null;

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const { data } = await axios.get('/api/admin/applicants', config);
        setApplicants(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching applicants', error);
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  // Handle Approve/Reject
  const handleStatusUpdate = async (id, status) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')).token;
      const config = { headers: { Authorization: `Bearer ${token}` } };

      await axios.put(`/api/admin/update-status/${id}`, { status }, config);

      // Remove the processed user from the list UI
      setApplicants(applicants.filter((app) => app._id !== id));
      alert(`User ${status} successfully`);
    } catch (error) {
      alert('Error updating status');
    }
  };

  if (loading) return <div>Loading Dashboard...</div>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <h2 className="text-xl mb-4">Pending Dietitian Requests</h2>

      {applicants.length === 0 ? (
        <p>No pending applications.</p>
      ) : (
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Specialization</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.specialization || 'N/A'}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    onClick={() => handleStatusUpdate(user._id, 'approved')}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(user._id, 'rejected')}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;