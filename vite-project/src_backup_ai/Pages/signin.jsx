import { SignIn } from "@clerk/clerk-react";
import { Activity } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 relative p-4">
      {/* Background Soft Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Logo Banner */}
      <div className="flex items-center gap-2 mb-6 z-10">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/10">
          <Activity className="w-4 h-4 text-white animate-pulse" />
        </div>
        <span className="text-lg font-extrabold bg-gradient-to-r from-slate-900 to-blue-900 bg-clip-text text-transparent tracking-tight">
          SDS Patient & Doctor Portal
        </span>
      </div>

      <div className="z-10 shadow-2xl rounded-3xl overflow-hidden border border-slate-100/80">
        <SignIn 
          appearance={{
            elements: {
              card: "border-0 shadow-none bg-white",
              headerTitle: "text-slate-800 font-extrabold",
              headerSubtitle: "text-slate-400 font-medium",
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition duration-200",
              formFieldInput: "border-slate-200 rounded-xl focus:border-blue-500 bg-slate-50/50"
            }
          }}
        />
      </div>
    </div>
  );
}
