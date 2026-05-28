import React, { useState, useEffect } from "react";
import { KPIItem, QuickAction, QueueItem } from "../types";
import { ArrowUpRight, CheckCircle2, AlertTriangle, Play, RefreshCw, Terminal, Search, Trash2 } from "lucide-react";

interface DashboardViewProps {
  userEmail: string;
  onNavigateToStudio: () => void;
  fanpagesCount: number;
}

export default function DashboardView({ userEmail, onNavigateToStudio, fanpagesCount }: DashboardViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlatformFilter, setSelectedPlatformFilter] = useState<string>("all");
  const [logs, setLogs] = useState<string[]>([]);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditMessage, setAuditMessage] = useState("");

  const [platformLoads, setPlatformLoads] = useState({
    linkedin: 84,
    facebook: 58,
    instagram: 69,
    twitter: 43
  });

  const [calibrating, setCalibrating] = useState(false);

  const handleCalibrateHarmonics = () => {
    setCalibrating(true);
    const timestamp = new Date().toISOString().replace("T", " ").substring(0, 19);
    setLogs((prev) => [`[${timestamp}] [SYS_ACTION] INITIALIZING HARMONICS RE-ALIGNMENT COMMAND...`, ...prev]);

    setTimeout(() => {
      const nextLoads = {
        linkedin: Math.floor(Math.random() * 25) + 75, // 75-100
        facebook: Math.floor(Math.random() * 35) + 55, // 55-90
        instagram: Math.floor(Math.random() * 25) + 70, // 70-95
        twitter: Math.floor(Math.random() * 45) + 35, // 35-80
      };
      setPlatformLoads(nextLoads);
      setLogs((prev) => [
        `[${timestamp}] [RECONCILER] HARMONICS ADJUSTED SUCCESSFULLY: LI=${nextLoads.linkedin}%, FB=${nextLoads.facebook}%, IG=${nextLoads.instagram}%, TW=${nextLoads.twitter}%`,
        ...prev
      ]);
      setCalibrating(false);
    }, 1000);
  };

  const nameFromEmail = (email: string) => {
    if (!email) return "OPERATOR_01";
    return email.split("@")[0].toUpperCase();
  };

  // KPI metadata with bottom accent ticks
  const kpiData: KPIItem[] = [
    { id: "kpi-1", label: "AUTOMATION FLOW RATE", value: "98.42 %", tickColor: "bg-accent-cyan" },
    { id: "kpi-2", label: "TELEMETRY LATENCY", value: "12.4 MS", tickColor: "bg-blue-500" },
    { id: "kpi-3", label: "ENGAGEMENT COEF", value: "4.71 X", tickColor: "bg-amber-500" },
    { id: "kpi-4", label: "MONITORED PAGES", value: `${fanpagesCount} NODE(S)`, tickColor: "bg-green-500" },
  ];

  // Initial campaign pipeline dataset
  const [pipelineData, setPipelineData] = useState<QueueItem[]>([
    { id: "WNTX-098", campaign: "SUMMER ACQUISITION METADATA", platform: "instagram", status: "active", scheduledTime: "2026-05-28 12:00 UTC", reconciliationRate: "99.82%" },
    { id: "WNTX-095", campaign: "FINANCIAL RATIO INFOGRAPHICS", platform: "linkedin", status: "completed", scheduledTime: "2026-05-28 09:30 UTC", reconciliationRate: "100.00%" },
    { id: "WNTX-092", campaign: "HIGH-CONTRAST MONOSPACE ANNOUNCEMENT", platform: "facebook", status: "active", scheduledTime: "2026-05-28 07:12 UTC", reconciliationRate: "92.40%" },
    { id: "WNTX-088", campaign: "OBSIDIAN WEB DESIGNS CAROUSEL", platform: "both", status: "paused", scheduledTime: "2026-05-27 18:00 UTC", reconciliationRate: "98.50%" },
    { id: "WNTX-084", campaign: "ENTERPRISE AUTOMATION LAUNCH", platform: "tiktok", status: "completed", scheduledTime: "2026-05-27 11:20 UTC", reconciliationRate: "100.00%" },
    { id: "WNTX-079", campaign: "SYSTEM RECONCILIATION DRIP", platform: "twitter", status: "failed", scheduledTime: "2026-05-26 15:45 UTC", reconciliationRate: "41.02%" },
  ]);

  // Simulated live event logger
  useEffect(() => {
    const defaultLogs = [
      `[SYS_LOG]: SECURE SHELL BIND COMPLETE // INGRESS GATEWAY ACTIVE`,
      `[SYS_LOG]: IDENTIFIED ${fanpagesCount} FANPAGE DATA SEGMENTS`,
      `[SYS_LOG]: METRIC DRIP SYNCED // DRIFT RATE < 0.002%`,
      `[SYS_LOG]: ENCRYPTION TOKENS NORMALIZED`,
    ];
    setLogs(defaultLogs);

    const interval = setInterval(() => {
      const timestamp = new Date().toISOString().replace("T", " ").substring(0, 19);
      const randomLogs = [
        `[TELEMETRY] PING facebook.com [200 OK] latency=14.2ms`,
        `[TELEMETRY] PING instagram.com [200 OK] latency=9.8ms`,
        `[SYS_DRIP] Automated queue check: 0 pending, 2 processing`,
        `[RECONCILER] Successfully verified token sequence for Node ${Math.floor(Math.random() * 10) + 1}`,
        `[AI_BOT] Generation load optimized. Cached queries ready for prompt processing`,
      ];
      const log = `[${timestamp}] ${randomLogs[Math.floor(Math.random() * randomLogs.length)]}`;
      setLogs((prev) => [log, ...prev.slice(0, 18)]);
    }, 4500);

    return () => clearInterval(interval);
  }, [fanpagesCount]);

  // Execute quick actions
  const handleQuickAction = (actionCode: string) => {
    setIsAuditing(true);
    setAuditMessage(`EXECUTING INTERACTION AT MODULE: ${actionCode}...`);
    
    // Log to simulated console
    const timestamp = new Date().toISOString().replace("T", " ").substring(0, 19);
    setLogs((prev) => [`[${timestamp}] [SYS_ACTION] EXECUTED: ${actionCode}`, ...prev]);

    setTimeout(() => {
      if (actionCode === "TELEM_ACCEL") {
        setAuditMessage("SUCCESS: Telemetry acceleration coefficients aligned. System latency reduced by 1.8ms.");
      } else if (actionCode === "INTEG_AUDIT") {
        setAuditMessage(`SUCCESS: Audited ${fanpagesCount} active fanpages. 0 failures detected.`);
      } else if (actionCode === "CLEAR_CACHE") {
        setAuditMessage("SUCCESS: Cleaned cache. 1.2 GB of temporary caption embeddings evacuated.");
      }
      setIsAuditing(false);
    }, 1500);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "active":
        return "border border-cyan-500/30 text-accent-cyan bg-cyan-950/20";
      case "completed":
        return "border border-green-500/30 text-green-400 bg-green-950/10";
      case "paused":
        return "border border-amber-500/30 text-amber-400 bg-amber-950/10";
      case "failed":
        return "border border-red-500/30 text-red-500 bg-red-950/20";
      default:
        return "border border-white/10 text-white/50 bg-white/5";
    }
  };

  // Filters logic
  const filteredPipeline = pipelineData.filter((item) => {
    const matchesSearch = item.campaign.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = selectedPlatformFilter === "all" || item.platform === selectedPlatformFilter;
    return matchesSearch && matchesPlatform;
  });

  const deleteCampaign = (id: string) => {
    setPipelineData(pi => pi.filter(p => p.id !== id));
    setLogs(prev => [`[${new Date().toISOString().replace("T", " ").substring(0, 19)}] [SYS_DELETE] Removed campaign ${id}`, ...prev]);
  };

  return (
    <div id="wentix-dashboard-view" className="space-y-6">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[rgba(255,255,255,0.40)] font-medium">
            BUENOS DÍAS, {nameFromEmail(userEmail)} // OPERATIONAL SUMMARY
          </span>
          <h1 className="text-[20px] font-semibold text-[rgba(255,255,255,0.85)] mt-0.5" id="dashboard-main-title">
            Dashboard
          </h1>
        </div>

        {/* Primary CTA */}
        <button
          id="cta-goto-studio"
          onClick={onNavigateToStudio}
          className="bg-accent-cyan text-black text-[11px] uppercase tracking-widest font-semibold px-4 py-2 hover:bg-cyan-400 transition-colors duration-150 rounded-xs flex items-center gap-2 select-none"
        >
          <span>Fast Content Dispatch</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid of 4 KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" id="kpi-grid">
        {kpiData.map((kpi) => (
          <div
            key={kpi.id}
            id={kpi.id}
            className="bg-[#090D1A]/90 hover:bg-[#0C1224] border border-accent-cyan/15 rounded-sm p-4 flex flex-col justify-between h-[100px] transition-all duration-200 relative group"
          >
            {/* KPI label */}
            <span className="text-[9px] uppercase tracking-widest text-[#00F5FF]/60 font-medium font-sans">
              {kpi.label}
            </span>
            {/* KPI bold mono value */}
            <span className="text-[20px] font-bold font-mono text-white tracking-tight">
              {kpi.value}
            </span>
            {/* bottom micro-tick line accent (per metric) */}
            <div className={`absolute bottom-0 left-0 right-0 h-[3px] rounded-b-sm transition-all duration-300 ${kpi.tickColor} group-hover:h-[5px]`} />
          </div>
        ))}
      </div>

      {/* Main Operations Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Ghost Quick-Action Rows & Logs */}
        <div className="space-y-6 lg:col-span-1">
          {/* Quick Actions Panel */}
          <div className="bg-[#090D1A]/90 border border-accent-cyan/15 rounded-sm p-5 space-y-4">
            <h2 className="text-[10px] uppercase tracking-widest font-medium opacity-60 text-accent-cyan font-sans">
              OPERATIONAL COMMANDS
            </h2>

            {/* Ghost quick-action rows */}
            <div className="space-y-2">
              <button
                id="btn-action-telemetry"
                onClick={() => handleQuickAction("TELEM_ACCEL")}
                className="w-full text-left bg-[#0C1224]/50 hover:bg-[#0C1224] border border-accent-cyan/10 hover:border-accent-cyan/50 p-3 transition-all duration-150 flex items-center justify-between group rounded-xs"
              >
                <div>
                  <div className="text-[11px] font-medium text-white/95 group-hover:text-accent-cyan transition-colors">
                    DEPLOY SYSTEM ACCELERATOR
                  </div>
                  <div className="text-[9px] text-white/40 font-mono mt-0.5 lowercase">
                    aligns telemetry coefficients
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-accent-cyan transition-colors" />
              </button>

              <button
                id="btn-action-audit"
                onClick={() => handleQuickAction("INTEG_AUDIT")}
                className="w-full text-left bg-[#0C1224]/50 hover:bg-[#0C1224] border border-accent-cyan/10 hover:border-accent-cyan/50 p-3 transition-all duration-150 flex items-center justify-between group rounded-xs"
              >
                <div>
                  <div className="text-[11px] font-medium text-white/95 group-hover:text-accent-cyan transition-colors">
                    TRIGGER INTEGRITY AUDIT
                  </div>
                  <div className="text-[9px] text-white/40 font-mono mt-0.5 lowercase">
                    verifies active fanpage integrations
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-accent-cyan transition-colors" />
              </button>

              <button
                id="btn-action-flush"
                onClick={() => handleQuickAction("CLEAR_CACHE")}
                className="w-full text-left bg-[#0C1224]/50 hover:bg-[#0C1224] border border-accent-cyan/10 hover:border-accent-cyan/50 p-3 transition-all duration-150 flex items-center justify-between group rounded-xs"
              >
                <div>
                  <div className="text-[11px] font-medium text-white/95 group-hover:text-accent-cyan transition-colors">
                    FLUSH INTERM CACHE
                  </div>
                  <div className="text-[9px] text-white/40 font-mono mt-0.5 lowercase">
                    evacuates vector embeddings
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-accent-cyan transition-colors" />
              </button>
            </div>

            {/* Audit Status Info Bar */}
            {(isAuditing || auditMessage) && (
              <div className="p-3 border border-accent-cyan/20 bg-black/40 rounded-xs font-mono text-[9px] tracking-normal leading-relaxed text-zinc-300">
                {isAuditing ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 text-accent-cyan animate-spin" />
                    <span>{auditMessage}</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="text-accent-cyan font-bold uppercase tracking-wider">[MODULE OUTPUT]:</div>
                    <p>{auditMessage}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Operational Log Console */}
          <div className="bg-[#090D1A]/90 border border-accent-cyan/15 rounded-sm p-5 flex flex-col h-[280px]">
            <div className="flex items-center justify-between mb-3 border-b border-accent-cyan/10 pb-2 select-none">
              <span className="text-[10px] uppercase tracking-widest font-medium opacity-60 text-accent-cyan flex items-center gap-1.5 font-sans">
                <Terminal className="w-3.5 h-3.5 text-accent-cyan" />
                SYSTEM TELEMETRY FEED
              </span>
              <span className="text-[8px] font-mono opacity-40 text-accent-cyan">STREAMING_ACTIVE</span>
            </div>
            {/* Scrollable logs matching JetBrains Mono layout */}
            <div className="flex-1 overflow-y-auto font-mono text-[9px] text-white/50 space-y-1.5 leading-tight select-text scrollbar-thin">
              {logs.map((log, index) => (
                <div key={index} className="hover:text-white transition-colors duration-100 break-all border-b border-white/[0.02] pb-1">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column (2x width span): Pipeline Telemetry Table */}
        <div className="lg:col-span-2 space-y-4">
          {/* Cybernetic Telemetry Channel Load Widget */}
          <div className="bg-[#090D1A]/90 border border-accent-cyan/15 p-5 space-y-4 rounded-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b border-accent-cyan/10 pb-2.5 select-none">
              <div>
                <span className="text-[10px] font-mono text-accent-cyan font-bold block uppercase tracking-widest">// COGNITIVE PIPELINE FLOW WAVEFORMS</span>
                <span className="text-[8px] opacity-25 font-mono">NODE CHANNEL LOADS PER SECURE INGRESS SESSION</span>
              </div>
              <button
                onClick={handleCalibrateHarmonics}
                disabled={calibrating}
                className="bg-black hover:border-accent-cyan/60 border border-[rgba(255,255,255,0.12)] text-accent-cyan font-mono text-[8.5px] uppercase tracking-widest py-1 px-3 rounded-xs flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-30 self-start sm:self-auto"
              >
                <RefreshCw className={`w-3 h-3 ${calibrating ? "animate-spin text-accent-cyan" : ""}`} />
                <span>{calibrating ? "RE-ALIGNING COGNITIVE BIND..." : "CALIBRATE HARMONICS"}</span>
              </button>
            </div>

            {/* Grid of load bars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono">
              {[
                { label: "METAPHYSICAL LINKEDIN B2B DISPATCH", value: platformLoads.linkedin, color: "bg-accent-cyan" },
                { label: "B2B TELEMETRY FACEBOOK CORE", value: platformLoads.facebook, color: "bg-blue-500/80" },
                { label: "LUXURY VISUAL INSTAGRAM PROTOCOL", value: platformLoads.instagram, color: "bg-amber-500/80" },
                { label: "TWITTER MICRO STREAMING DISGREGATE", value: platformLoads.twitter, color: "bg-zinc-700" }
              ].map((plat, idx) => (
                <div key={idx} className="space-y-1.5 border border-[rgba(255,255,255,0.03)] bg-black/30 p-2.5 rounded-xs hover:border-[rgba(255,255,255,0.08)] transition-all">
                  <div className="flex justify-between text-[8px] text-[rgba(255,255,255,0.40)]">
                    <span className="truncate max-w-[170px]">{plat.label}</span>
                    <span className="text-white/80 font-bold">{plat.value}%</span>
                  </div>
                  {/* Cyber progress line with ticks */}
                  <div className="flex items-center gap-1">
                    <div className="flex-1 bg-zinc-900 h-1.5 rounded-xs overflow-hidden relative">
                      <div className={`h-full ${plat.color}`} style={{ width: `${plat.value}%` }} />
                    </div>
                    {/* Simulated pulse state bubble */}
                    <span className={`w-1 h-1 rounded-full animate-ping ${plat.value > 80 ? "bg-accent-cyan" : "bg-zinc-650"}`} />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-[7.5px] font-mono text-[rgba(255,255,255,0.20)] uppercase flex justify-between select-none border-t border-[rgba(255,255,255,0.03)] pt-2">
              <span>System Clock Ref: UTC_NORMAL</span>
              <span>All nodes synced at latency drift coefficient &lt; 0.002%</span>
            </div>
          </div>

          <div className="bg-[#090D1A]/90 border border-accent-cyan/15 p-5 rounded-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-accent-cyan/10 pb-4 mb-4">
              <div>
                <h2 className="text-[10px] uppercase tracking-widest font-medium opacity-60 text-accent-cyan font-sans">
                  AUTOMATION DISPATCH QUEUE
                </h2>
                <span className="text-[8px] opacity-45 font-mono">
                  HISTORICAL AND DRIP INSTANCES INDEXED
                </span>
              </div>

              {/* Filtering Controls */}
              <div className="flex items-center gap-2">
                {/* Search */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-2.5 flex items-center pointer-events-none text-accent-cyan/40">
                    <Search className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="FILTER BY ID/REF..."
                    className="bg-[#070A14] text-[10px] font-mono text-white/90 placeholder:text-white/20 border border-accent-cyan/20 rounded-xs pl-8 pr-2.5 py-1.5 w-[150px] focus:outline-none focus:border-accent-cyan/60 focus:ring-1 focus:ring-accent-cyan/30"
                  />
                </div>

                {/* Platform dropdown selector */}
                <select
                  value={selectedPlatformFilter}
                  onChange={(e) => setSelectedPlatformFilter(e.target.value)}
                  className="bg-[#070A14] text-[10px] font-mono text-white/70 border border-accent-cyan/20 rounded-xs px-2.5 py-1.5 focus:outline-none focus:border-accent-cyan/60"
                >
                  <option value="all">ALL NODES</option>
                  <option value="facebook">FACEBOOK</option>
                  <option value="instagram">INSTAGRAM</option>
                  <option value="linkedin">LINKEDIN</option>
                  <option value="twitter">TWITTER</option>
                  <option value="tiktok">TIKTOK</option>
                </select>
              </div>
            </div>

            {/* Campaign Table with monospace fonts */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse" id="pipeline-table">
                <thead>
                  <tr className="border-b border-accent-cyan/10 text-[10px] uppercase font-bold text-accent-cyan/60">
                    <th className="py-2.5 px-3">REF ID</th>
                    <th className="py-2.5 px-3">CAMPAIGN INFERENCE</th>
                    <th className="py-2.5 px-3">PLATFORM</th>
                    <th className="py-2.5 px-3 hidden md:table-cell">RECON_RATE</th>
                    <th className="py-2.5 px-3">STATUS</th>
                    <th className="py-2.5 px-3 text-right font-sans">ACTION</th>
                  </tr>
                </thead>
                <tbody className="text-[11px] font-mono">
                  {filteredPipeline.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-white/20">
                        // NO TELEMETRY INSTANCES DETECTED FOR CURRENT QUERY //
                      </td>
                    </tr>
                  ) : (
                    filteredPipeline.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b border-accent-cyan/5 hover:bg-accent-cyan/[0.03] transition-colors duration-100 group"
                      >
                        {/* ID monospace */}
                        <td className="py-3 px-3 text-accent-cyan font-semibold">
                          {item.id}
                        </td>
                        {/* Title */}
                        <td className="py-3 px-3 tracking-wide text-white/90">
                          {item.campaign}
                        </td>
                        {/* Platform Target */}
                        <td className="py-3 px-3 uppercase text-[9px] tracking-widest opacity-80 text-accent-cyan">
                          {item.platform}
                        </td>
                        {/* Recon rate (reconciliation metrics) */}
                        <td className="py-3 px-3 text-zinc-400 hidden md:table-cell text-[10px]">
                          {item.reconciliationRate}
                        </td>
                        {/* Status Badge Custom Pill */}
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded-xs text-[8px] uppercase tracking-widest font-medium ${getStatusStyle(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        {/* Individual element action tool */}
                        <td className="py-3 px-3 text-right">
                          <button
                            id={`btn-del-${item.id}`}
                            onClick={() => deleteCampaign(item.id)}
                            className="bg-transparent opacity-30 hover:opacity-100 text-red-500 p-1 rounded-sm hover:bg-red-500/10 transition-colors"
                            title="Purge Campaign Payload"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination / Total Muted Monospace Display */}
            <div className="flex items-center justify-between text-[8px] text-white/30 font-mono uppercase mt-4">
              <span>SYSTEM DISPATCH: VER_9.11 // CORE_THREADS = 8</span>
              <span>CONSOLIDATED COHORTS IN INDEX: {filteredPipeline.length} ITEMS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
