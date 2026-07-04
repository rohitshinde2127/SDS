import { Routes, Route, Navigate } from "react-router-dom"
import Auth from "./Pages/Auth"
import Chat from "./Pages/Chat"
import Doctor from "./Pages/Doctor"
import { SignedIn, SignedOut, RedirectToSignIn, } from "@clerk/clerk-react"
import History from "./Pages/History"
import Symptoms from "./Pages/Symptoms"
import DoctorDashboard from "./Pages/DoctorDashboard"
import Navbar from "./components/Navbar"

import Home from "./Pages/Home"

const RequireAuth = ({ authEnabled, role, children }) => {
  if (!authEnabled) {
    return role ? children : <Navigate to="/" />
  }

  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut><RedirectToSignIn /></SignedOut>
    </>
  )
}

function App({ authEnabled = true }) {
  const role = localStorage.getItem("selectedRole")

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900">
      <Navbar authEnabled={authEnabled} />
      <Routes>
        <Route path="/" element={<>
          {authEnabled ? (
            <SignedIn> {role === "doctor" ?
              (<Navigate to="/DoctorDashboard" />) :
              role === "patient" ? (
                <Navigate to="/home" />) : (<Auth authEnabled />)}
            </SignedIn>
          ) : (
            role === "doctor" ? (<Navigate to="/DoctorDashboard" />) :
            role === "patient" ? (<Navigate to="/home" />) :
            (<Auth authEnabled={false} />)
          )}

          {authEnabled && <SignedOut> <Auth authEnabled /> </SignedOut>}</>} />

        <Route path="/home" element={<>
          <RequireAuth authEnabled={authEnabled} role={role}>
            {role === "doctor" ? (<Navigate to="/DoctorDashboard" />) : (<Home />)}
          </RequireAuth>
        </>} />


        <Route path="/DoctorDashboard" element={<>
          <RequireAuth authEnabled={authEnabled} role={role}>
            {role === "doctor" ? (<DoctorDashboard authEnabled={authEnabled} />) : (<Navigate to="/home" />)}
          </RequireAuth>
        </>} />

        <Route path="/Symptoms" element={<>
          <RequireAuth authEnabled={authEnabled} role={role}>
            {role === "patient" ? (<Symptoms />) : (<Navigate to="/DoctorDashboard" />)}
          </RequireAuth>
        </>} />

        <Route path="/Doctor" element={
          <>
            <RequireAuth authEnabled={authEnabled} role={role}>
              {role === "patient" ? (<Doctor />) : (
                <Navigate to="/DoctorDashboard" />)}
            </RequireAuth>
          </>
        } />

        <Route path="/history" element={
          <>
            <RequireAuth authEnabled={authEnabled} role={role}> {role === "patient" ? (<History />
            ) : (<Navigate to="/DoctorDashboard" />)}
            </RequireAuth>
          </>
        } />

        <Route path="/chat" element={
          <>
            <RequireAuth authEnabled={authEnabled} role={role}><Chat /></RequireAuth>
          </>
        } />

      </Routes>
    </div>
  );
}

export default App;
