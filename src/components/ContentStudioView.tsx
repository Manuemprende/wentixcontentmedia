import React, { useState } from "react";
import { Cpu, Copy, Check, ChevronDown, ChevronUp, Sparkles, HelpCircle, Eye, Sliders, ThumbsUp, MessageSquare, Repeat, Send, Compass, Award } from "lucide-react";
import { GeneratedContent, CommentItem } from "../types";

export default function ContentStudioView() {
  const [prompt, setPrompt] = useState("");
  const [platform, setPlatform] = useState("linkedin");
  const [tone, setTone] = useState("Scientific");
  const [language, setLanguage] = useState("Spanish");

  // Advanced operator parameters
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(512);
  const [reconciliationWeight, setReconciliationWeight] = useState(94);

  const [isLoading, setIsLoading] = useState(false);
  const [generatedData, setGeneratedData] = useState<GeneratedContent | null>(null);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [copiedCommentIndex, setCopiedCommentIndex] = useState<number | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // Active view tabs on the output panel: Raw Output or Platform live Feed Preview
  const [activePreviewType, setActivePreviewType] = useState<"feed" | "raw">("feed");

  // Accordion active indexes for generated comments
  const [openComments, setOpenComments] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
  });

  const toggleComment = (index: number) => {
    setOpenComments((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const samplePrompts = [
    {
      label: "OBSIDIAN WORKSPACE",
      text: "Presentación del nuevo core industrial de Wentix Automation. Menos decoración, más procesamiento.",
    },
    {
      label: "METRICA LATENCY ELIM",
      text: "Optimizando la latencia de ingestión de datos a 0ms en Facebook e Instagram para directores de orquesta digital.",
    },
    {
      label: "COSMIC AUTOMATION",
      text: "[TELEMETRY RUNNING] We reject the decorative noise. A single accent cyan #00F5FF. Built for high-performance scale.",
    }
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setGeneratedData(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, platform, tone, language }),
      });

      if (!response.ok) {
        throw new Error("FAIL_TO_ENGAGE_AI_ENGINE");
      }

      const data = await response.json();
      setGeneratedData({
        caption: data.caption || "",
        comments: data.comments || [],
      });
      // Reset comments accordion states: expand the first comment, fold others
      setOpenComments({ 1: true, 2: false, 3: false });
    } catch (error) {
      console.error("AI_ENGINE_LATENCY_ERROR:", error);
      // Fallback in case of server failure
      setGeneratedData({
        caption: `[ERROR_STATE: OVERRIDE_INITIATOR]\n\nFAILED TO RETRIEVE CORRELATING VECTOR EMBEDDING FOR PROMPT: "${prompt.toUpperCase()}"\n\nTone sequence: ${tone.toUpperCase()}\nPlatform node: ${platform.toUpperCase()}\n\nSystems have reconciled. Core telemetry values remain locked at safe metrics. No data drift was registered during this payload transfer.`,
        comments: [
          { order: 1, delay: "+5m", text: "[AUTOMATION_NODE_01]: Retrying secondary gateway pipeline sequence. System metrics status: STANDBY." },
          { order: 2, delay: "+15m", text: "[AUTOMATION_NODE_02]: High load on telemetry servers. Switched output channels to local buffer memory modules." },
          { order: 3, delay: "+1h", text: "[AUTOMATION_NODE_03]: Verification signature verified. No user inputs were dropped." }
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, isCaption: boolean, commentIdx: number | null = null) => {
    navigator.clipboard.writeText(text);
    if (isCaption) {
      setCopiedCaption(true);
      setTimeout(() => setCopiedCaption(false), 2000);
    } else if (commentIdx !== null) {
      setCopiedCommentIndex(commentIdx);
      setTimeout(() => setCopiedCommentIndex(null), 2000);
    }
  };

  const currentDisplayCaption = generatedData?.caption || 
    `[WENTIX DATA INFERENCE: CHOOSE A PRESET OR WRITE A COMMAND]\n\nSelect one of the quick templates above or input a description of the campaign on the left panel to test the Super Saiyan AI Cognitive generation matrix.\n\n#SaaS #Obsidian #Minimalism`;

  return (
    <div id="wentix-content-studio" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#00F5FF]/60 font-medium">
            WNTX_ENG_V5 // COGNITIVE GENERATION SUITE
          </span>
          <h1 className="text-[20px] font-semibold text-white mt-0.5 font-sans">
            Content Studio
          </h1>
        </div>

        {/* Diagnostic Metadata Grid */}
        <div className="flex gap-4 font-mono text-[9px] text-[#00F5FF]/60">
          <div className="border border-accent-cyan/20 bg-[#070A14] px-3 py-1.5 select-none rounded-xs">
            ENGINE STATUS: <span className="text-accent-cyan font-bold">READY</span>
          </div>
          <div className="border border-accent-cyan/20 bg-[#070A14] px-3 py-1.5 select-none rounded-xs">
            RECONC_COEF: <span className="text-white/80 font-bold">{reconciliationWeight}%</span>
          </div>
        </div>
      </div>

      {/* Two Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Panel (5 Cols): Request Parameters & Cybernetic Dials */}
        <div className="bg-[#090D1A]/90 border border-accent-cyan/15 p-5 space-y-6 lg:col-span-5 rounded-sm">
          <div className="flex items-center justify-between border-b border-accent-cyan/10 pb-3">
            <span className="text-[10px] uppercase tracking-widest font-medium opacity-60 text-accent-cyan flex items-center gap-1.5 font-sans">
              <Cpu className="w-3.5 h-3.5 text-accent-cyan" />
              COGNITIVE BIND CONFIG
            </span>
            <span className="text-[8px] font-mono text-accent-cyan">GEMINI_ENGINE_CORE // V3.5</span>
          </div>

          <form onSubmit={handleGenerate} className="space-y-5">
            
            {/* Project Quick Templates */}
            <div>
              <span className="block text-[10px] uppercase tracking-widest font-semibold text-accent-cyan/60 mb-2 font-sans">
                FAST PRESET TELEMETRY
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5 font-sans">
                {samplePrompts.map((preset, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setPrompt(preset.text)}
                    className="text-left bg-[#070A14] hover:bg-[#0C1224] border border-accent-cyan/20 hover:border-accent-cyan/50 text-[8px] font-mono p-2 rounded-sm text-white/50 hover:text-white transition-all cursor-pointer truncate"
                  >
                    ⚡ {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt command */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-semibold text-accent-cyan/60 mb-1.5 font-sans">
                PROMPT COMMAND (SUBJECT ENGINE)
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="DESCRIBE THE TARGET CAMPAIGN, TECHNICAL HIGHLIGHTS, OR PRODUCT ANNOUNCEMENT..."
                className="w-full bg-[#070A14] text-[11px] font-mono p-3 border border-accent-cyan/25 rounded-sm text-white placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-accent-cyan/30 focus:border-accent-cyan/80 h-28 resize-none leading-relaxed"
                required
              />
            </div>

            {/* Grid of options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Platform selection code */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-semibold text-accent-cyan/60 mb-1.5 font-sans">
                  PLATFORM NODE
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full bg-[#070A14] text-[11px] font-mono p-2 border border-accent-cyan/25 rounded-sm text-white/80 focus:outline-none focus:ring-1 focus:ring-accent-cyan/30 focus:border-accent-cyan/80"
                >
                  <option value="linkedin">LINKEDIN // B2B INTEL</option>
                  <option value="facebook">FACEBOOK // META NODE</option>
                  <option value="instagram">INSTAGRAM // LUX PARADIGM</option>
                  <option value="twitter">TWITTER // MICRO DISPATCH</option>
                  <option value="tiktok">TIKTOK // ULTRA SPEED</option>
                </select>
              </div>

              {/* Tone Selection */}
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-semibold text-accent-cyan/60 mb-1.5 font-sans">
                  TONE SPECTRUM
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-[#070A14] text-[11px] font-mono p-2 border border-accent-cyan/25 rounded-sm text-white/80 focus:outline-none focus:ring-1 focus:ring-accent-cyan/30 focus:border-accent-cyan/80"
                >
                  <option value="Scientific">SCIENTIFIC LUXURY</option>
                  <option value="Minimalist">ELEGANT MINIMALIST</option>
                  <option value="Luxury">COSMIC OBSIDIAN</option>
                  <option value="Academic">OPERANT RESEARCH</option>
                  <option value="Cyberpunk">MATRIX FUTURISTA</option>
                </select>
              </div>

            </div>

            {/* PRO SCI-FI INTERACTIVE SLIDERS FOR CYBERNETIC LOOK */}
            <div className="border border-accent-cyan/15 bg-[#0C1224]/50 p-4 space-y-4 rounded-sm">
              <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-semibold text-accent-cyan font-sans">
                <Sliders className="w-3.5 h-3.5" />
                <span>OPERATOR PARAMETER INPUTS</span>
              </div>

              {/* Sliders in monospace schema */}
              <div className="space-y-3">
                
                {/* Temperature slider */}
                <div>
                  <div className="flex justify-between text-[8px] font-mono text-white/40 uppercase mb-1">
                    <span>AI TEMPERATURE COEFFICIENT (DETERMINISM)</span>
                    <span className="text-accent-cyan font-bold">{temperature.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full accent-accent-cyan cursor-pointer h-1 bg-[#070A14]"
                  />
                  <div className="flex justify-between text-[7px] text-accent-cyan/40 font-mono">
                    <span>[PRECISION-LOCKED]</span>
                    <span>[CREATIVE-FLOAT]</span>
                  </div>
                </div>

                {/* Tokens slider */}
                <div>
                  <div className="flex justify-between text-[8px] font-mono text-white/40 uppercase mb-1">
                    <span>MAX ENCODED TOKEN LIMIT</span>
                    <span className="text-accent-cyan font-bold">{maxTokens} TOKENS</span>
                  </div>
                  <input
                    type="range"
                    min="128"
                    max="1024"
                    step="64"
                    value={maxTokens}
                    onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                    className="w-full accent-accent-cyan cursor-pointer h-1 bg-[#070A14]"
                  />
                </div>

                {/* Reconciliation weight */}
                <div>
                  <div className="flex justify-between text-[8px] font-mono text-white/40 uppercase mb-1">
                    <span>ALGORITHMIC RECONCILIATION WEIGHT</span>
                    <span className="text-accent-cyan font-bold">{reconciliationWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    step="1"
                    value={reconciliationWeight}
                    onChange={(e) => setReconciliationWeight(parseInt(e.target.value))}
                    className="w-full accent-accent-cyan cursor-pointer h-1 bg-[#070A14]"
                  />
                </div>

              </div>
            </div>

            {/* Language restriction option */}
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-semibold text-accent-cyan/60 mb-1.5 font-sans">
                LANGUAGE SPECIFICATION
              </label>
              <div className="flex gap-4">
                {["Spanish", "English"].map((lang) => (
                  <label key={lang} className="flex items-center gap-2 cursor-pointer select-none font-mono text-[9px] uppercase">
                    <input
                      type="radio"
                      name="lang-spec-indigo"
                      value={lang}
                      checked={language === lang}
                      onChange={() => setLanguage(lang)}
                      className="accent-accent-cyan cursor-pointer"
                    />
                    <span className={language === lang ? "text-accent-cyan font-bold font-mono text-[9px]" : "text-white/40 font-mono text-[9px]"}>
                      {lang}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Primary Full Width Flat Cyan Button */}
            <button
              id="btn-trigger-ai-gen"
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="w-full bg-accent-cyan text-black hover:bg-[#1BF9FF] font-bold text-[11px] uppercase tracking-widest py-3.5 px-4 rounded-sm transition-colors duration-150 disabled:opacity-20 disabled:cursor-not-allowed select-none cursor-pointer shadow-[0_0_12px_rgba(0,245,255,0.2)]"
            >
              {isLoading ? "EXECUTING COGNITIVE BIND_..." : "GENERATE COGNITIVE PIPELINE"}
            </button>
          </form>
        </div>

        {/* Right Panel (7 Cols): Live Feed Preview and Accordions */}
        <div className="bg-[#090D1A]/90 border border-accent-cyan/15 p-5 min-h-[520px] lg:col-span-7 flex flex-col justify-between rounded-sm">
          
          {/* Output Control Row: Tabs for Feed Mock Preview & Raw output Code */}
          <div className="flex items-center justify-between border-b border-accent-cyan/15 pb-3 mb-4 select-none">
            <div className="flex items-center gap-2">
              <button
                id="btn-tab-preview-feed"
                onClick={() => setActivePreviewType("feed")}
                className={`text-[10px] uppercase tracking-widest font-mono font-medium py-1 px-3 border transition-all rounded-xs cursor-pointer ${
                  activePreviewType === "feed"
                    ? "border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan"
                    : "border-transparent text-white/40 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-1.5 font-sans">
                  <Eye className="w-3.5 h-3.5" />
                  <span>FEED LIVE PREVIEW</span>
                </div>
              </button>

              <button
                id="btn-tab-preview-raw"
                onClick={() => setActivePreviewType("raw")}
                className={`text-[10px] uppercase tracking-widest font-mono font-medium py-1 px-3 border transition-all rounded-xs cursor-pointer ${
                  activePreviewType === "raw"
                    ? "border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan"
                    : "border-transparent text-white/40 hover:text-white"
                }`}
              >
                <span className="font-sans">RAW TELEMETRY</span>
              </button>
            </div>

            {/* Action tool to copy primary caption */}
            {generatedData && (
              <button
                id="btn-copy-studio-caption"
                onClick={() => copyToClipboard(generatedData.caption, true)}
                className="flex items-center gap-1.5 text-[9px] uppercase font-mono tracking-widest text-[#00F5FF]/60 hover:text-accent-cyan bg-transparent transition-colors duration-150 py-1"
              >
                {copiedCaption ? (
                  <span className="text-accent-cyan font-bold">[COPIED]</span>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY MAIN</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Skeleton Pulse Loading State */}
          {isLoading ? (
            <div className="flex-1 space-y-6 animate-pulse p-2 select-none" id="skeleton-loader-studio">
              {/* Header row skeleton */}
              <div className="flex items-center justify-between">
                <div className="h-4 bg-zinc-800 w-28 rounded-xs"></div>
                <div className="h-4 bg-zinc-800 w-16 rounded-xs"></div>
              </div>

              {/* Mock visual preview skeleton card */}
              <div className="h-32 bg-zinc-900 border border-white/5 rounded-xs p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-zinc-800 rounded-sm"></div>
                  <div className="space-y-1">
                    <div className="h-2 bg-zinc-800 w-24 rounded-xs"></div>
                    <div className="h-1.5 bg-zinc-800 w-16 rounded-xs"></div>
                  </div>
                </div>
                <div className="space-y-1.5 pt-2">
                  <div className="h-2.5 bg-zinc-800 w-full rounded-xs"></div>
                  <div className="h-2.5 bg-zinc-800 w-[95%] rounded-xs"></div>
                  <div className="h-2.5 bg-zinc-800 w-[60%] rounded-xs"></div>
                </div>
              </div>

              {/* Subheading comments skeleton title */}
              <div className="space-y-3">
                <div className="h-3 bg-zinc-800 w-36 rounded-xs"></div>
                <div className="space-y-2">
                  <div className="h-[40px] bg-zinc-900 w-full rounded-xs"></div>
                  <div className="h-[40px] bg-zinc-900/40 w-full rounded-xs"></div>
                </div>
              </div>
            </div>
          ) : (
            // Output views
            <div className="flex-1 flex flex-col justify-between space-y-6">
              
              {/* Active Tab is FEED PREVIEW */}
              {activePreviewType === "feed" && (
                <div className="space-y-4" id="feed-preview-render-pane">
                  {actionFeedback && (
                    <div className="bg-[#0C1224] border border-accent-cyan text-accent-cyan px-3 py-2 text-[10px] font-mono rounded-xs animate-pulse flex justify-between select-none">
                      <span>⚙️ [TELEMETRY SIGNAL]: {actionFeedback}</span>
                      <span className="text-accent-cyan/50 font-bold">[SYS_OK]</span>
                    </div>
                  )}

                  {/* Platform Mock Feed Frame */}
                  <div className="bg-[#070A14] border border-accent-cyan/25 rounded-sm p-4 text-[11px] font-sans selection:bg-accent-cyan selection:text-black">
                    
                    {/* Platform Header */}
                    <div className="flex items-center justify-between border-b border-accent-cyan/15 pb-3 mb-3 shrink-0">
                      <div className="flex items-center gap-2.5">
                        <div className="w-5 h-5 bg-[#0C1224] border border-accent-cyan/30 flex items-center justify-center font-mono text-[9px] text-accent-cyan rounded-xs">
                          {platform[0].toUpperCase()}
                        </div>
                        <div className="font-mono text-[10px] tracking-wider uppercase font-semibold text-zinc-300">
                          {platform.toUpperCase()} NODE FEED SIMULATION
                        </div>
                      </div>
                      <span className="text-[8px] font-mono text-accent-cyan/40">SYS_RENDERING_ACTIVE</span>
                    </div>

                    {/* PLATFORM SPECIFIC MOCK CONSTRUCT */}
                    {platform === "linkedin" && (
                      <div className="font-sans text-[11px] leading-relaxed space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-[#0C1224] border border-accent-cyan/20 rounded-xs flex items-center justify-center font-mono text-[10px] text-accent-cyan font-bold select-none">
                            WX
                          </div>
                          <div>
                            <div className="font-semibold text-white/90 hover:underline cursor-pointer flex items-center gap-1.5">
                              <span>WENTIX AUTOMATION LABS</span>
                              <span className="text-[9px] text-accent-cyan font-mono border border-accent-cyan/20 px-1 py-0.5 rounded-xs leading-none">REPLICA_VERIFIED</span>
                            </div>
                            <div className="text-[10px] text-white/40 font-mono tracking-tight mt-0.5">
                              142,850 follower-operators • 1 min • 🌐
                            </div>
                          </div>
                        </div>
                        
                        <p className="font-mono text-[10px] p-2 bg-black/40 text-zinc-300 leading-relaxed whitespace-pre-wrap select-text border-l border-accent-cyan/30">
                          {currentDisplayCaption}
                        </p>
                        
                        {/* Fake system response counters */}
                        <div className="flex items-center justify-between text-[9px] text-zinc-500 pt-2 border-t border-accent-cyan/10 font-mono select-none">
                          <div className="flex items-center gap-3">
                            <span>👍 1.2k operators approved</span>
                          </div>
                          <div className="flex gap-2.5">
                            <span>💬 24 comment nodes</span>
                            <span>•</span>
                            <span>🔁 186 thread repoints</span>
                          </div>
                        </div>

                        {/* Interactive reaction bar */}
                        <div className="grid grid-cols-4 gap-1 pt-1.5 text-zinc-400 font-mono text-[8px] tracking-widest uppercase border-t border-accent-cyan/10 text-center select-none">
                          <button 
                            className="py-2 hover:bg-white/[0.02] hover:text-accent-cyan transition-colors cursor-pointer" 
                            onClick={() => {
                              setActionFeedback("COGNITIVE ACCELERATION APPROVED");
                              setTimeout(() => setActionFeedback(null), 3000);
                            }}
                          >
                            👍 INTENT_ACT
                          </button>
                          <button className="py-2 hover:bg-white/[0.02] hover:text-accent-cyan transition-colors cursor-pointer" onClick={() => setOpenComments({1: true, 2: true, 3: true})}>
                            💬 DRIP_TRACE
                          </button>
                          <button 
                            className="py-2 hover:bg-white/[0.02] hover:text-accent-cyan transition-colors cursor-pointer"
                            onClick={() => {
                              setActionFeedback("THREAD FLOW_DRIP SIGNAL DUPLICATED");
                              setTimeout(() => setActionFeedback(null), 3000);
                            }}
                          >
                            🔁 FLOW_DRIP
                          </button>
                          <button 
                            className="py-2 hover:bg-white/[0.02] hover:text-accent-cyan transition-colors cursor-pointer"
                            onClick={() => {
                              setActionFeedback("TARGET DATA BIND COMPLETED");
                              setTimeout(() => setActionFeedback(null), 3000);
                            }}
                          >
                            ⚡ BIND
                          </button>
                        </div>
                      </div>
                    )}

                    {platform === "instagram" && (
                      <div className="font-sans text-[11px] space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 bg-[#0C1224] border border-accent-cyan/25 rounded-full flex items-center justify-center font-mono text-[10px] text-accent-cyan">
                              WX
                            </div>
                            <span className="font-semibold font-mono text-white/80">@wentix.labs</span>
                          </div>
                          <span className="text-[9px] font-mono text-accent-cyan uppercase">[OPERATING]</span>
                        </div>

                        {/* Mock image container block simulating a minimalist vector graph */}
                        <div className="bg-[#0C1224]/50 hover:bg-[#0C1224]/80 transition-colors border border-accent-cyan/15 aspect-video flex flex-col items-center justify-center p-4 text-center select-none text-zinc-500 font-mono space-y-1 relative overflow-hidden rounded-xs">
                          {/* Ambient cyan mesh */}
                          <div className="absolute top-0 left-0 w-full h-[1px] bg-accent-cyan/35"></div>
                          <div className="absolute bottom-0 right-0 w-[4px] h-[4px] bg-accent-cyan"></div>
                          
                          <Sparkles className="w-6 h-6 text-accent-cyan/80 animate-pulse-none" />
                          <span className="text-[10px] text-zinc-300 font-semibold uppercase tracking-wider">
                            COGNITIVE MEDIA TARGET [MOCKED_01]
                          </span>
                          <span className="text-[8px] opacity-40 lowercase">
                            vector spectrum density // ratio = 16:9 // tone = {tone}
                          </span>
                        </div>

                        <p className="font-mono text-[10px] text-zinc-300 leading-relaxed whitespace-pre-wrap select-text selection:bg-accent-cyan p-1">
                          {currentDisplayCaption}
                        </p>

                        <div className="text-[9px] tracking-wider text-accent-cyan/50 font-mono">
                          9,410 likes recorded // wentix.labs
                        </div>
                      </div>
                    )}

                    {platform !== "linkedin" && platform !== "instagram" && (
                      <div className="font-sans text-[11px] leading-relaxed space-y-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 bg-[#0C1224] border border-accent-cyan/20 rounded-sm flex items-center justify-center font-mono text-[9px] text-accent-cyan">
                            G
                          </div>
                          <div>
                            <span className="font-bold font-mono text-white">Wentix Engine Node</span>
                            <span className="text-accent-cyan/50 text-[8.5px] font-mono ml-2">@wentix_automation</span>
                          </div>
                        </div>
                        
                        <p className="font-mono text-[10.5px] text-zinc-200 leading-relaxed p-3 bg-black/40 rounded-xs border-r border-accent-cyan/20 whitespace-pre-wrap select-text">
                          {currentDisplayCaption}
                        </p>

                        <div className="text-[8px] font-mono uppercase tracking-widest text-accent-cyan/40 flex gap-4 select-none">
                          <span>⏱️ SECURE TRANSMIT INSTANT</span>
                          <span>🔒 COMPLIANT LOG</span>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              )}

              {/* Active Tab is RAW TELEMETRY */}
              {activePreviewType === "raw" && (
                <div className="space-y-3" id="raw-telemetry-container">
                  <div className="p-4 bg-[#070A14] border border-accent-cyan/15 min-h-[160px] max-h-[220px] overflow-y-auto selection:bg-accent-cyan selection:text-black rounded-xs">
                    <pre className="text-[10px] font-mono text-zinc-350 leading-relaxed whitespace-pre-wrap select-text">
                      {`{
  "system_reconciliation": {
    "module": "COGNITIVE_DISPATCH_REPLICA",
    "timestamp_utc": "${new Date().toISOString()}",
    "latency_ms": 13.01,
    "temperature_determ": ${temperature},
    "max_token_weight": ${maxTokens},
    "readability_score": "98.4 %"
  },
  "inferred_platform": "${platform}",
  "selected_tone": "${tone}",
  "inferred_language": "${language}",
  "payload": {
    "caption": "${currentDisplayCaption.replace(/\n/g, "\\n")}"
  }
}`}
                    </pre>
                  </div>
                </div>
              )}

              {/* Collapsible Accordion Automated Sequential Comments */}
              <div className="space-y-2 border-t border-accent-cyan/15 pt-4">
                <div className="flex items-center justify-between mb-2 select-none">
                  <h3 className="text-[10px] uppercase tracking-widest font-semibold opacity-60 text-accent-cyan font-sans">
                    AUTOMATED DRIP FOLLOW-UPS
                  </h3>
                  <span className="text-[8px] font-mono opacity-40">3 SECURE NODES ACTIVATED</span>
                </div>

                <div className="space-y-1.5">
                  {(generatedData?.comments || [
                    { order: 1, delay: "+5h", text: "[STANDBY MODULE]: Secondary system response telemetry will be rendered here." },
                    { order: 2, delay: "+24h", text: "[STANDBY MODULE]: Generates auto comment triggers sequentially on specified intervals." }
                  ]).map((comment, idx) => {
                    const commentNumber = idx + 1;
                    const isOpen = !!openComments[commentNumber];
                    return (
                      <div
                        key={idx}
                        className="border border-accent-cyan/15 bg-[#070A14]/90 overflow-hidden rounded-xs"
                      >
                        {/* Header Row */}
                        <div
                          onClick={() => toggleComment(commentNumber)}
                          className="flex items-center justify-between p-2.5 bg-[#0C1224]/50 cursor-pointer hover:bg-accent-cyan/[0.03] select-none"
                        >
                          <div className="flex items-center gap-3">
                            {/* Order Number Box */}
                            <div className="w-5 h-5 bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan flex items-center justify-center font-mono text-[9px] font-bold rounded-xs">
                              0{comment.order || commentNumber}
                            </div>
                            <span className="text-[9px] font-mono tracking-widest text-[#00F5FF]/60">
                              DELAY DELIVERABLE: <span className="text-zinc-300 font-bold">{comment.delay}</span>
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {isOpen ? (
                              <ChevronUp className="w-3.5 h-3.5 text-accent-cyan" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 text-accent-cyan" />
                            )}
                          </div>
                        </div>

                        {/* Expandable Comment Pane */}
                        {isOpen && (
                          <div className="p-3 bg-[#05080E] border-t border-accent-cyan/10 border-l-2 border-accent-cyan/40 space-y-2 select-text selection:bg-accent-cyan selection:text-black">
                            <p className="text-[10px] font-mono text-zinc-300 leading-relaxed">
                              {comment.text}
                            </p>
                            {generatedData && (
                              <div className="flex justify-end pt-1">
                                <button
                                  onClick={() => copyToClipboard(comment.text, false, commentNumber)}
                                  className="flex items-center gap-1 text-[8.5px] font-mono tracking-widest opacity-40 hover:opacity-100 hover:text-accent-cyan transition-opacity cursor-pointer"
                                >
                                  {copiedCommentIndex === commentNumber ? (
                                    <span className="text-accent-cyan font-bold">[COPIED]</span>
                                  ) : (
                                    <>
                                      <Copy className="w-2.5 h-2.5" />
                                      <span>COPY</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* COGNITIVE SCORES DIAGNOSTIC GRAPH ON DESKTOP */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-4 border-t border-accent-cyan/15 font-mono text-[8px] uppercase text-zinc-400 select-none">
                <div className="p-2 border border-accent-cyan/15 rounded-xs bg-black/30">
                  <div className="text-accent-cyan/50 mb-0.5 font-sans">READ DISPATCH RATIO</div>
                  <div className="text-accent-cyan font-bold font-mono">{(85 + (reconciliationWeight % 15))}.6 / 100.0</div>
                </div>
                <div className="p-2 border border-accent-cyan/15 rounded-xs bg-black/30">
                  <div className="text-accent-cyan/50 mb-0.5 font-sans">EST READ RETENTION</div>
                  <div className="text-accent-cyan font-bold font-mono">{(92 + (temperature * 4)).toFixed(1)}%</div>
                </div>
                <div className="p-2 border border-accent-cyan/15 rounded-xs bg-black/30">
                  <div className="text-accent-cyan/50 mb-0.5 font-sans">HASHTAG ALIGN DENSITY</div>
                  <div className="text-accent-cyan font-bold font-mono">{(0.08 + (temperature * 0.05)).toFixed(2)} %</div>
                </div>
                <div className="p-2 border border-accent-cyan/15 rounded-xs bg-black/30">
                  <div className="text-accent-cyan/50 mb-0.5 font-sans">RECONC RATE WEIGHT</div>
                  <div className="text-accent-cyan font-bold font-mono">{reconciliationWeight / 100} x coeff</div>
                </div>
              </div>

              {/* Bottom operational ticker footer */}
              <div className="text-[8px] font-mono text-zinc-650 flex justify-between uppercase pt-2 select-none">
                <span>RECONCILIATION INDEXED ON PLAT_INTEGRITY</span>
                <span>SYSTEM DISPATCH: OPERATOR_VERIFIED_</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
