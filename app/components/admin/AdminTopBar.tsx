"use client";

import { usePathname, useRouter } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/dashboard/inventory": "Inventory",
  "/admin/dashboard/orders": "Orders",
  "/admin/dashboard/readings": "Readings",
  "/admin/dashboard/analytics": "Analytics",
};

interface AdminTopBarProps {
  onMenuToggle: () => void;
}

export default function AdminTopBar({ onMenuToggle }: AdminTopBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const title = pageTitles[pathname] || "Dashboard";

  const handleLogout = () => {
    sessionStorage.removeItem("polly-admin-auth");
    router.push("/admin/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[#c8b898]/40 bg-[#e8e1d8]/95 px-4 backdrop-blur-sm lg:px-6">
      {/* Left: hamburger + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="rounded-lg p-2 text-[#7a6e62] hover:bg-[#d5cdc2] hover:text-[#3d352c] lg:hidden"
          aria-label="Toggle sidebar"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold text-[#3d352c]">{title}</h1>
      </div>

      {/* Right: user + logout */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8a6218]/20 text-xs font-semibold text-[#8a6218]">
            A
          </div>
          <span className="hidden text-sm text-[#7a6e62] sm:inline">Admin</span>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-lg px-3 py-1.5 text-xs font-medium text-[#7a6e62]/60 transition-colors hover:bg-[#8b2e1c]/10 hover:text-[#8b2e1c]"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
