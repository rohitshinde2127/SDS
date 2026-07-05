import { Routes, Route, Navigate } from "react-router-dom"
import Auth from "./Pages/Auth"
import Chat from "./Pages/Chat"
import Doctor from "./Pages/Doctor"
import { SignedIn, SignedOut, RedirectToSignIn, useUser } from "@clerk/clerk-react"
import { useState, useEffect } from "react"
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
      <SignedIn>
        {role ? children : <Navigate to="/" />}
      </SignedIn>
      <SignedOut><RedirectToSignIn /></SignedOut>
    </>
  )
}

function App({ authEnabled = true }) {
  const { user, isLoaded, isSignedIn } = useUser()
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(authEnabled)

  useEffect(() => {
    if (!authEnabled) {
      setRole(localStorage.getItem("selectedRole"))
      setLoading(false)
      return
    }

    if (isLoaded) {
      if (isSignedIn && user) {
        const clerkRole = user.unsafeMetadata?.role
        const localRole = localStorage.getItem("selectedRole")

        if (clerkRole) {
          setRole(clerkRole)
          localStorage.setItem("selectedRole", clerkRole)
          setLoading(false)
        } else if (localRole) {
          user.update({
            unsafeMetadata: {
              ...user.unsafeMetadata,
              role: localRole
            }
          }).then(() => {
            setRole(localRole)
            setLoading(false)
          }).catch((err) => {
            console.error("Failed to sync role to Clerk:", err)
            setRole(localRole)
            setLoading(false)
          })
        } else {
          setRole(null)
          setLoading(false)
        }
      } else {
        localStorage.removeItem("selectedRole")
        setRole(null)
        setLoading(false)
      }
    }
  }, [isLoaded, isSignedIn, user, authEnabled])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-teal-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900">
      <Navbar authEnabled={authEnabled} />
      <Routes>
        <Route path="/" element={<>
          {authEnabled ? (
            <SignedIn>
              {role === "doctor" ? (
                <Navigate to="/DoctorDashboard" />
              ) : role === "patient" ? (
                <Navigate to="/home" />
              ) : (
                <Auth authEnabled />
              )}
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
