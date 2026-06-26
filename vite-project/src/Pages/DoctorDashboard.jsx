import React from "react";
import { useUser } from "@clerk/clerk-react";

const DoctorDashboard = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-100 p-6 pt-25 text-black">
      
      {/* Header */}
      <div className="bg-white shadow-md rounded-xl p-5 mb-6">
        <h1 className="text-2xl font-bold">
          Welcome Dr. {user?.firstName}
        </h1>
        <p className="mt-2">
          Manage your patient and appointments
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Total Patients</h2>
          <p className="text-2xl font-bold mt-2">25</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Appointments Today</h2>
          <p className="text-2xl font-bold mt-2">8</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Pending Reports</h2>
          <p className="text-2xl font-bold mt-2">3</p>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">
          Recent Appointments
        </h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-3">Patient</th>
              <th className="py-3">Date</th>
              <th className="py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3">Rahul Sharma</td>
              <td className="py-3">28 Feb 2026</td>
              <td className="py-3">Completed</td>
            </tr>
            <tr>
              <td className="py-3">Amit Verma</td>
              <td className="py-3">28 Feb 2026</td>
              <td className="py-3">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default DoctorDashboard;