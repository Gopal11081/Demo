"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("test_user");
    if (!storedUser) {
      router.push("/login");
    } else {
      setUser(JSON.parse(storedUser));
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("test_user");
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-slate-100">
        <div className="text-center space-y-4">
          <svg
            className="mx-auto h-8 w-8 animate-spin text-violet-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-slate-400 text-sm tracking-widest uppercase">Checking session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-radial from-slate-900 via-zinc-950 to-black text-slate-100 relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-1/4 left-1/4 -z-10 h-96 w-96 rounded-full bg-violet-600/10 blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 -z-10 h-96 w-96 rounded-full bg-cyan-600/10 blur-[150px] pointer-events-none"></div>

      {/* Header */}
      <header className="border-b border-white/5 bg-white/5 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-8 w-8 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center font-mono font-bold text-white shadow-md">
                TX
              </span>
              <span className="font-semibold text-white tracking-wide">NextTest Workspace</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden text-sm text-slate-400 sm:inline-block">
                Logged in as: <span className="font-semibold text-slate-200">{user?.email}</span>
              </span>
              <button
                onClick={handleLogout}
                className="rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 px-3.5 py-1.5 text-xs font-medium text-slate-300 transition-colors"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Welcome Section */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-semibold uppercase tracking-wider animate-bounce">
            ⚡ Next.js App Active
          </div>
          
          <h1 className="text-6xl font-extrabold tracking-tight text-white sm:text-8xl bg-gradient-to-r from-white via-violet-300 to-cyan-400 bg-clip-text text-transparent">
            Hello
          </h1>

          <p className="mx-auto max-w-md text-lg text-slate-400">
            Your Next.js project is running perfectly, successfully configured with client routing, mock login authentication, and modern Tailwind CSS.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-8 text-left max-w-xl mx-auto">
            <div className="p-5 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm space-y-2">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                Vercel Deploy Ready
              </h3>
              <p className="text-xs text-slate-400">
                Optimized configuration is ready to link, build, and deploy on the Vercel edge network in one click.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm space-y-2">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                GitHub Connected
              </h3>
              <p className="text-xs text-slate-400">
                Git repository is ready to push directly to your remote origin branch for seamless version control.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/40 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} NextTest Workspace. Built for premium testing verification.
      </footer>
    </div>
  );
}
