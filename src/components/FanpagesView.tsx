import React, { useState } from "react";
import { Share2, Plus, Globe, HelpCircle, Check, AlertCircle, X, Info } from "lucide-react";
import { Fanpage } from "../types";

interface FanpagesViewProps {
  fanpages: Fanpage[];
  onAddFanpage: (page: Omit<Fanpage, "id">) => void;
  onDeleteFanpage: (id: string) => void;
}

export default function FanpagesView({ fanpages, onAddFanpage, onDeleteFanpage }: FanpagesViewProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPlatform, setNewPlatform] = useState<"facebook" | "instagram" | "both">("both");
  const [newPageId, setNewPageId] = useState("");
  const [newFollowers, setNewFollowers] = useState("");

  const [formError, setFormError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!newName.trim() || !newPageId.trim()) {
      setFormError("ALL FIELDS CORRELATING TO TRANSIT IDENTITY MUST BE VALIDATED.");
      return;
    }

    // Format ID to mimic page numbers or platform handles
    const pageIdClean = newPageId.trim().replace(/\s+/g, "");

    onAddFanpage({
      name: newName.trim().toUpperCase(),
      platform: newPlatform,
      pageId: pageIdClean,
      status: "active",
      followers: newFollowers.trim() ? parseInt(newFollowers).toLocaleString() : "24,500",
    });

    // Reset controls
    setNewName("");
    setNewPageId("");
    setNewFollowers("");
    setShowAddForm(false);
  };

  const getPlatformStyle = (p: string) => {
    switch (p) {
      case "facebook":
        return "border border-blue-500/20 text-blue-400 bg-blue-950/10";
      case "instagram":
        return "border border-zinc-700 text-[rgba(255,255,255,0.6)] bg-white/5";
      case "both":
        return "border border-cyan-500/30 text-accent-cyan bg-cyan-950/10";
      default:
        return "border border-zinc-800 text-zinc-400";
    }
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
  };

  return (
    <div id="wentix-fanpages-view" className="space-y-6">
      
      {/* Header with main Action Trigger */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[rgba(255,255,255,0.40)] font-medium">
            WNTX_REG // NODE CONNECTIVITY STATUS
          </span>
          <h1 className="text-[20px] font-semibold text-[rgba(255,255,255,0.85)] mt-0.5">
            Fanpages Database
          </h1>
        </div>

        {/* Cyan CTA Button */}
        <button
          id="btn-register-page"
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-accent-cyan text-black text-[11px] uppercase tracking-widest font-semibold px-4 py-2 hover:bg-cyan-400 transition-colors duration-150 rounded-sm flex items-center gap-2 select-none"
        >
          {showAddForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          <span>CONNECTION PROPOSAL</span>
        </button>
      </div>

      {/* Connection inline form card */}
      {showAddForm && (
        <div className="bg-[#090D1A] border border-accent-cyan/30 p-5 space-y-4 rounded-sm">
          <div className="flex items-center justify-between border-b border-accent-cyan/15 pb-2">
            <span className="text-[10px] font-mono text-accent-cyan font-bold block uppercase">
              // INITIALIZE NEW FANPAGE HANDLER
            </span>
            <span className="text-[8px] font-mono text-accent-cyan/40">SYS_PORT_INGEST_A</span>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-[9px] uppercase tracking-widest font-medium text-white/40 mb-1">
                FANPAGE IDENTITY NAME
              </label>
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. LUXURY DESIGN CO."
                className="w-full bg-[#070A14] text-[10px] font-mono p-2 border border-accent-cyan/20 rounded-sm text-white focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/30"
              />
            </div>

            <div>
              <label className="block text-[9px] uppercase tracking-widest font-medium text-white/40 mb-1">
                PLATFORM NODE SYSTEM
              </label>
              <select
                value={newPlatform}
                onChange={(e) => setNewPlatform(e.target.value as any)}
                className="w-full bg-[#070A14] text-[10px] font-mono p-2 border border-accent-cyan/20 rounded-sm text-white focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/30"
              >
                <option value="facebook">FACEBOOK ONLY</option>
                <option value="instagram">INSTAGRAM ONLY</option>
                <option value="both">BOTH PLATFORMS</option>
              </select>
            </div>

            <div>
              <label className="block text-[9px] uppercase tracking-widest font-medium text-white/40 mb-1">
                PAGE NO. / INTENT ID
              </label>
              <input
                type="text"
                required
                value={newPageId}
                onChange={(e) => setNewPageId(e.target.value)}
                placeholder="e.g. @lux.design.agency"
                className="w-full bg-[#070A14] text-[10px] font-mono p-2 border border-accent-cyan/20 rounded-sm text-white focus:outline-none focus:border-accent-cyan focus:ring-1 focus:ring-accent-cyan/30"
              />
            </div>

            <div>
              <label className="block text-[9px] uppercase tracking-widest font-medium text-white/40 mb-1">
                INITIAL COHORT SIZE
              </label>
              <input
                type="number"
                value={newFollowers}
                onChange={(e) => setNewFollowers(e.target.value)}
                placeholder="e.g. 104500"
                className="w-full bg-[#070A14] text-[10px] font-mono p-2 border border-accent-cyan/20 rounded-sm text-white focus:outline-none focus:border-accent-cyan/10 focus:ring-1 focus:ring-accent-cyan/30"
              />
            </div>

            {formError && (
              <div className="col-span-1 md:col-span-4 p-2 bg-red-950/20 border border-red-500/20 text-red-400 font-mono text-[9px] flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{formError}</span>
              </div>
            )}

            <div className="col-span-1 md:col-span-4 flex justify-end gap-2 border-t border-[rgba(255,255,255,0.03)] pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-[9px] uppercase font-mono tracking-widest text-zinc-500 hover:text-white px-3 py-1.5"
              >
                ABORT
              </button>
              <button
                id="btn-confirm-add"
                type="submit"
                className="bg-accent-cyan text-black hover:bg-cyan-400 font-semibold text-[9px] uppercase tracking-widest px-4 py-1.5 rounded-sm transition-colors cursor-pointer shadow-[0_0_8px_rgba(0,245,255,0.25)]"
              >
                COMMENCE BINDING
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Table Database Panel */}
      <div className="bg-[#090D1A]/90 border border-accent-cyan/15 p-5 rounded-sm">
        <div className="border-b border-accent-cyan/10 pb-4 mb-4 flex justify-between items-center select-none">
          <div>
            <h2 className="text-[10px] uppercase tracking-widest font-medium opacity-60 text-accent-cyan font-sans">
              ACTIVE INTEGRATED ACCOUNTS
            </h2>
            <span className="text-[8px] opacity-45 font-mono">
              VERIFIED SECURE AUTH CONNECTIONS FOR THE CURRENT CONTEXT SESSION:
            </span>
          </div>
          <span className="text-[9px] font-mono text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/15 px-2 py-0.5 rounded-xs">
            {fanpages.length} NODES LOGGED
          </span>
        </div>

        {/* Proper HTML table for Fanpages */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" id="fanpage-data-table">
            <thead>
              <tr className="border-b border-accent-cyan/10 text-[10px] uppercase font-bold text-accent-cyan/60">
                <th className="py-2.5 px-3">AVATAR</th>
                <th className="py-2.5 px-3">NAME</th>
                <th className="py-2.5 px-3">PLATFORM</th>
                <th className="py-2.5 px-3 text-left font-sans">PAGE ID METRIC</th>
                <th className="py-2.5 px-3 text-center font-sans">COHORT WEIGHT</th>
                <th className="py-2.5 px-3">INTEGRITY</th>
                <th className="py-2.5 px-3 text-right font-sans">ACTION</th>
              </tr>
            </thead>
            <tbody className="text-[11px] font-mono text-white/95">
              {fanpages.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-zinc-600 font-mono text-[10px] uppercase">
                    // PROPOSAL TIMEOUT: NO FANPAGE BINDINGS DETECTED. CLICK CONNECTION PROPOSAL TO INGRESS ACCOUNTS //
                  </td>
                </tr>
              ) : (
                fanpages.map((fanpage) => (
                  <tr
                    key={fanpage.id}
                    className="border-b border-accent-cyan/5 hover:bg-accent-cyan/[0.02] transition-colors duration-100"
                  >
                    {/* Unique Square avatar initials cell */}
                    <td className="py-3 px-3">
                      <div className="w-7 h-7 bg-[#070A14] border border-accent-cyan/20 flex items-center justify-center text-[9px] text-accent-cyan font-bold rounded-xs">
                        {getInitials(fanpage.name)}
                      </div>
                    </td>

                    {/* Name */}
                    <td className="py-3 px-3 font-semibold text-white/90 truncate font-sans">
                      {fanpage.name}
                    </td>

                    {/* Platform Badge */}
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 text-[8px] uppercase tracking-widest font-mono rounded-xs ${getPlatformStyle(fanpage.platform)}`}>
                        {fanpage.platform}
                      </span>
                    </td>

                    {/* Monospace page identity ID */}
                    <td className="py-3 px-3 text-zinc-400 font-mono text-[10px]">
                      {fanpage.pageId}
                    </td>

                    {/* Cohort size (followers) */}
                    <td className="py-3 px-3 text-center font-bold text-zinc-300">
                      {fanpage.followers}
                    </td>

                    {/* Status Pill Badge */}
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-xs text-[8px] uppercase tracking-wider ${
                        fanpage.status === "active"
                          ? "border border-green-500/20 text-green-400 bg-green-950/20"
                          : "border border-red-500/0 text-zinc-500 bg-zinc-950"
                      }`}>
                        {fanpage.status}
                      </span>
                    </td>

                    {/* Action buttons */}
                    <td className="py-3 px-3 text-right">
                      {/* Delete node option */}
                      <button
                        onClick={() => onDeleteFanpage(fanpage.id)}
                        className="p-1 px-2 border border-red-500/20 text-red-500/80 hover:text-red-500 hover:bg-red-500/10 rounded-sm font-mono text-[8px] tracking-widest uppercase transition-colors"
                      >
                        PURGE_NODE
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Informative terminal warning panel */}
        <div className="mt-6 border border-accent-cyan/15 bg-[#070A14]/60 p-3 flex gap-3 text-[9.5px] text-white/50 font-mono leading-relaxed rounded-xs" id="warning-notice-panel">
          <Info className="w-5 h-5 text-accent-cyan flex-shrink-0" />
          <p className="uppercase">
            [INFORMATION CRITICAL]: ALL AUTHENTICATION PARAMS RUN ON SYST_INTEGRITY RECONCILING ENGINE. SECURITY BINDINGS WITH META & INSTAGRAM CLOUD GRAPH APIS ARE FULLY ENCRYPTED VIA END-TO-END TRANSMISSION TOKENS. LATENCY DRIFT AUDITED PERPETUALLY. OFF-MODE LOCAL OVERRIDE DETECTED.
          </p>
        </div>
      </div>
    </div>
  );
}
