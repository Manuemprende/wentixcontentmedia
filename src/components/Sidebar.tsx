import React from "react";
import { Zap, LayoutDashboard, Cpu, Share2, LogOut, Terminal } from "lucide-react";
import { WentixBrandHeader } from "./WentixLogo";

interface SidebarProps {
  activeTab: "dashboard" | "studio" | "fanpages";
  setActiveTab: (tab: "dashboard" | "studio" | "fanpages") => void;
  userEmail: string;
}

export default function Sidebar({ activeTab, setActiveTab, userEmail }: SidebarProps) {
  // Extract initials from email, default to ME (Manu Emprendehoy)
  const getInitials = (email: string) => {
    if (!email) return "OP";
    const parts = email.split("@")[0].split(".");
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };

  const nameFromEmail = (email: string) => {
    if (!email) return "OPERATOR_01";
    return email.split("@")[0].toUpperCase();
  };

  const navItems = [
    {
      id: "dashboard" as const,
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      id: "studio" as const,
      label: "Content Studio",
      icon: Cpu,
    },
    {
      id: "fanpages" as const,
      label: "Fanpages Database",
      icon: Share2,
    },
  ];

  return (
    <div 
      id="wentix-sidebar" 
      className="hidden md:flex flex-col w-[240px] h-screen bg-[#080B14] border-r border-accent-cyan/15 fixed left-0 top-0 select-none text-[11px] uppercase tracking-widest z-35"
    >
      {/* Brand Header - Orbital Intelligence Logo */}
      <div className="p-5 flex items-center justify-start border-b border-accent-cyan/15 bg-black/30">
        <WentixBrandHeader size="sm" />
      </div>

      {/* Terminal Status Ticker */}
      <div className="px-5 py-3 border-b border-accent-cyan/10 bg-[#06080F]/50 flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-accent-cyan rounded-full animate-pulse shadow-[0_0_6px_#00F5FF]"></span>
        <span className="text-[8px] opacity-60 font-mono tracking-widest text-[#00F5FF]">
          WNTX_AI // ORBITAL_ACTIVE
        </span>
      </div>

      {/* Main Navigation links */}
      <nav className="flex-1 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const IconComponent = item.icon;
          return (
            <button
              id={`nav-link-${item.id}`}
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left py-3 px-5 flex items-center gap-3 transition-colors duration-150 relative ${
                isActive
                  ? "text-accent-cyan bg-[rgba(0,245,255,0.06)] border-l-2 border-accent-cyan"
                  : "text-[rgba(255,255,255,0.85)] opacity-40 hover:opacity-75 hover:bg-[rgba(255,255,255,0.02)] border-l-2 border-transparent"
              }`}
            >
              <IconComponent className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User tile at sidebar bottom */}
      <div className="p-4 border-t border-[rgba(255,255,255,0.06)] bg-black/40">
        <div className="flex items-center gap-3">
          {/* Avatar Tile */}
          <div className="w-8 h-8 rounded-sm bg-[#111111] border border-[rgba(255,255,255,0.08)] flex items-center justify-center font-mono text-[10px] text-accent-cyan">
            {getInitials(userEmail)}
          </div>
          
          {/* Metadata */}
          <div className="flex-1 min-w-0">
            <h4 className="text-[10px] text-[rgba(255,255,255,0.85)] font-semibold truncate tracking-wider leading-tight">
              {nameFromEmail(userEmail)}
            </h4>
            <span className="text-[8px] tracking-widest text-[rgba(255,255,255,0.25)] block">
              ADMIN // SYS_OPERATOR
            </span>
          </div>

          {/* Red hover logout */}
          <button 
            id="btn-logout"
            onClick={() => {
              if (window.confirm("CONFIRM DISCONNECTION FROM WENTIX SECURE TELEMETRY ENGINE?")) {
                alert("Session terminated. Reconnecting automatically...");
              }
            }}
            className="p-1.5 opacity-30 hover:opacity-100 hover:text-red-500 hover:bg-red-500/10 rounded-sm transition-colors duration-150"
            title="Disconnect connection"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
