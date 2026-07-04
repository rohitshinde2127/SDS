import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-950 via-cyan-950 to-teal-700 px-4 py-24">
      <SignIn />
    </div>
  )
}


