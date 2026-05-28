import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import DashboardView from "./components/DashboardView";
import ContentStudioView from "./components/ContentStudioView";
import FanpagesView from "./components/FanpagesView";
import { Fanpage } from "./types";
import { Zap, Menu, X, LayoutDashboard, Cpu, Share2 } from "lucide-react";
import { WentixBrandHeader } from "./components/WentixLogo";

export default function App() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "studio" | "fanpages">("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userEmail = "manu.emprendehoy@gmail.com";

  // Initial rich dataset of fanpage nodes
  const [fanpages, setFanpages] = useState<Fanpage[]>([
    {
      id: "node-1",
      name: "OBSIDIAN LABS & MEDIA",
      platform: "both",
      pageId: "@obsidian.labs.telemetry",
      status: "active",
      followers: "142,850",
    },
    {
      id: "node-2",
      name: "WENTIX SYSTEM INFERENCE",
      platform: "facebook",
      pageId: "facebook.com/wentix.sys.group",
      status: "active",
      followers: "89,400",
    },
    {
      id: "node-3",
      name: "COGNITIVE COHORT RESEARCH",
      platform: "instagram",
      pageId: "@cognitive.ops.co",
      status: "active",
      followers: "64,110",
    },
    {
      id: "node-4",
      name: "SILICON VALLEY OPERATORS",
      platform: "both",
      pageId: "@sv.operator.net",
      status: "inactive",
      followers: "12,410",
    },
  ]);

  const handleAddFanpage = (newPage: Omit<Fanpage, "id">) => {
    const id = `node-${Date.now()}`;
    setFanpages((prev) => [...prev, { ...newPage, id }]);
  };

  const handleDeleteFanpage = (id: string) => {
    setFanpages((prev) => prev.filter((p) => p.id !== id));
  };

  const navTabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "studio", label: "Studio", icon: Cpu },
    { id: "fanpages", label: "Fanpages", icon: Share2 }
  ];

  return (
    <div className="min-h-screen bg-[#06080F] text-white/85 font-sans antialiased relative w-full overflow-hidden">
      
      {/* LEFT SIDEBAR FOR DESKTOP (Width 240px, fixed background #080B14) */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setMobileMenuOpen(false);
        }} 
        userEmail={userEmail} 
      />

      {/* MOBILE HEADER TOP RAIL BAR */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-[#080B14] border-b border-accent-cyan/15 select-none sticky top-0 z-40">
        <div className="flex items-center">
          <WentixBrandHeader size="sm" />
        </div>

        {/* Action controls */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1 focus:outline-none text-white/80"
          title="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-accent-cyan" />
          ) : (
            <Menu className="w-5 h-5 text-zinc-300" />
          )}
        </button>
      </header>

      {/* MOBILE EXTENDED FLYOUT UNDERLAY */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[48px] bg-[#080B14]/95 backdrop-blur-md border-b border-accent-cyan/15 z-30 font-mono text-[10px] uppercase tracking-wider py-2">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left py-3 px-6 flex items-center gap-3 border-b border-white/[0.02] ${
                  isActive ? "text-accent-cyan bg-accent-cyan/5 font-bold" : "text-white/60"
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* MAIN CONTAINER LAYOUT */}
      <main 
        id="wentix-main-layout" 
        className="py-6 px-4 md:px-8 md:pl-[264px] min-h-screen overflow-x-hidden"
      >
        <div className="max-w-7xl mx-auto space-y-6">
          {activeTab === "dashboard" && (
            <DashboardView 
              userEmail={userEmail} 
              onNavigateToStudio={() => setActiveTab("studio")} 
              fanpagesCount={fanpages.length}
            />
          )}

          {activeTab === "studio" && (
            <ContentStudioView />
          )}

          {activeTab === "fanpages" && (
            <FanpagesView 
              fanpages={fanpages} 
              onAddFanpage={handleAddFanpage} 
              onDeleteFanpage={handleDeleteFanpage}
            />
          )}
        </div>
      </main>

      {/* Bloomberg-Terminal-style Global Operational Status Tick Footer */}
      <footer className="w-full text-center py-4 text-[8px] font-mono tracking-widest text-[#00F5FF]/40 border-t border-accent-cyan/10 bg-[#080B14] md:pl-[240px]">
        <span>WENTIX AUTOMATION // ENG_SEED: 0x8A129F || SECURE LOCALHOST REPLICA || CURRENT UTC: {new Date().toISOString().replace('T', ' ').substring(0, 19)}</span>
      </footer>
    </div>
  );
}
