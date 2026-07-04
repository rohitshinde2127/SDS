import React from "react";
import { useUser } from "@clerk/clerk-react";
import { CalendarDays, CheckCircle2, FileWarning, Users } from "lucide-react";

const stats = [
  { label: "Total Patients", value: "25", icon: Users, tone: "bg-teal-50 text-teal-700" },
  { label: "Appointments Today", value: "8", icon: CalendarDays, tone: "bg-cyan-50 text-cyan-700" },
  { label: "Pending Reports", value: "3", icon: FileWarning, tone: "bg-amber-50 text-amber-700" },
];

const appointments = [
  { patient: "Rahul Sharma", date: "28 Feb 2026", status: "Completed" },
  { patient: "Amit Verma", date: "28 Feb 2026", status: "Pending" },
];

const DashboardShell = ({ doctorName }) => (
  <div className="min-h-screen bg-slate-50 px-4 py-24 text-slate-900 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Doctor Workspace</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          Welcome Dr. {doctorName}
        </h1>
        <p className="mt-2 text-slate-600">
          Manage patients, appointments, and report follow-ups from one place.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-slate-500">{item.label}</h2>
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.tone}`}>
                  <Icon size={21} />
                </div>
              </div>
              <p className="mt-4 text-3xl font-bold text-slate-950">{item.value}</p>
            </div>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 p-5">
          <h2 className="text-xl font-bold text-slate-950">
            Recent Appointments
          </h2>
          <CheckCircle2 className="text-emerald-600" size={22} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[35rem] text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Patient</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {appointments.map((appointment) => (
                <tr key={appointment.patient} className="text-slate-700">
                  <td className="px-5 py-4 font-semibold text-slate-950">{appointment.patient}</td>
                  <td className="px-5 py-4">{appointment.date}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${appointment.status === "Completed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

const ClerkDashboard = () => {
  const { user } = useUser();

  return <DashboardShell doctorName={user?.firstName || "Doctor"} />;
};

const DoctorDashboard = ({ authEnabled = true }) => {
  if (!authEnabled) {
    return <DashboardShell doctorName="Demo Doctor" />;
  }

  return <ClerkDashboard />;
};

export default DoctorDashboard;
