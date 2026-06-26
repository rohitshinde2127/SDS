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

function App() {
  const role = localStorage.getItem("selectedRole")
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<>
          <SignedIn> {role === "doctor" ?
            (<Navigate to="/DoctorDashboard" />) :
            role === "patient" ? (
              <Navigate to="/home" />) : (<Auth />)}
          </SignedIn>

          <SignedOut> <Auth /></SignedOut></>} />

        <Route path="/home" element={<>
          <SignedIn> {role === "doctor" ? (
            <Navigate to="/DoctorDashboard" />) : (
            <Home />)}
          </SignedIn> <SignedOut> <RedirectToSignIn />
          </SignedOut>
        </>} />


        <Route path="/DoctorDashboard" element={<>
          <SignedIn> {role === "doctor" ? (
            <DoctorDashboard />) : (
            <Navigate to="/home" />)}
          </SignedIn> <SignedOut> <RedirectToSignIn />
          </SignedOut> </>} />

        <Route path="/Symptoms" element={<>
          <SignedIn> {role === "patient" ? (
            <Symptoms />) : (<Navigate to="/DoctorDashboard" />)}
          </SignedIn>
          <SignedOut> <RedirectToSignIn /> </SignedOut>
        </>} />

        <Route path="/Doctor" element={
          <>
            <SignedIn>
              {role === "patient" ? (<Doctor />) : (
                <Navigate to="/DoctorDashboard" />)}
            </SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        } />

        <Route path="/history" element={
          <>
            <SignedIn> {role === "patient" ? (<History />
            ) : (<Navigate to="/DoctorDashboard" />)}
            </SignedIn>
            <SignedOut> <RedirectToSignIn /> </SignedOut>
          </>
        } />

        <Route path="/chat" element={
          <>
            <SignedIn>   <Chat /> </SignedIn>
            <SignedOut><RedirectToSignIn /></SignedOut>
          </>
        } />

      </Routes>
    </div>
  );
}

export default App;