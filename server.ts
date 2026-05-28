import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy initialization of GoogleGenAI client
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("GEMINI_API_KEY environment variable is not defined. Fallback results will be used.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key || "MOCK_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// REST route for social media content generation
app.post("/api/generate", async (req, res) => {
  const { prompt, platform, tone, language } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Missing required 'prompt' parameter." });
  }

  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    // Return high-quality mock data when key is missing to support pristine UX immediately
    const mockCaptions: Record<string, string> = {
      facebook: `[ANALYSIS ENGINE: ACTIVATED]\n[PLATFORM: FACEBOOK]\n[TONE: ${tone || "Luxury"}]\n\nWe have reached the inflection point where operational excellence is no longer optional. Our analytical frameworks show an 18.4% drift in consumer attention spans. The organizations navigating this transition are those investing in strict informational symmetry.\n\nRead the full technical whitepaper below.\n\n#OperationalSymmetry #StrategicAnalysis #Analytics`,
      instagram: `[SURFACE METRIC: INSIGHT]\n[PLATFORM: INSTAGRAM]\n[TONE: ${tone || "Minimalist"}]\n\nArchitectural honesty in corporate workflows. \n\nWe eliminate the decorative noise. We optimize the core loop. Every pixel, every second, every metric holds absolute accountability.\n\n#Wentix #Minimalism #ObsidianSystems #SaaS`,
      linkedin: `[EXECUTIVE INFERENCE]\n[PLATFORM: LINKEDIN]\n[TONE: ${tone || "Scientific"}]\n\nIn our latest cohort analysis of high-performing B2B enterprises, we identified a standard deviation of <0.02% in operational latency among top-quartile operators.\n\nThe lesson: systems engineered with strict, single-accent visual paradigms and high data density consistently out-convert low-contrast consumer layouts by a factor of 1.4x. \n\nHow is your executive suite auditing operational friction this quarter?\n\n#EnterpriseSaaS #SystemsDesign #DataOptimization #Operators`,
      twitter: `[TRANSMISSION: ACTIVE]\n\nSystems design governs the speed of decision-making. High density. Low latency. Zero decoration. Optimize the operational layer.\n\nwentix.platform/whitepaper`,
      tiktok: `[TELEMETRY SCAN]\n\nOps metrics normalized. Visual latency at 0.0ms. This is the operators stack. Absolute precision.\n\n#automation #datacollection #saas`
    };

    const mockComments = [
      {
        order: 1,
        delay: "+5m",
        text: `[AUTOMATION NODE 01]: Transmission verification completed. Analytical payload is now indexed. Redirecting secondary traffic to wentix.platform/portal.`
      },
      {
        order: 2,
        delay: "+45m",
        text: `[SYSTEM COHORT 09]: Early interaction logs confirm higher CTR among monospace displays. Adjusting presentation matrix to favor high-contrast obsidian themes.`
      },
      {
        order: 3,
        delay: "+2h",
        text: `[AUDIT CONTROLLER]: Archiving interaction telemetry. Next scheduled automated batch: 24:00 UTC.`
      }
    ];

    return res.json({
      caption: mockCaptions[platform?.toLowerCase()] || mockCaptions.linkedin,
      comments: mockComments,
      isMock: true
    });
  }

  try {
    const ai = getAiClient();
    
    // Formulate a structured request to Gemini with a clean schema for Wentix style outputs
    const systemInstruction = `You are the backend AI Engine of WENTIX CONTENT PLATFORM, a professional SaaS for scientific luxury and high-performance social content automation.
The tone must be scientific luxury: ultra-minimal, high-precision, deep-tech, elegant, and operator-focused. Avoid conversational filler or generic marketing slogans. Include technical accents like brackets, variables or operational codes (e.g. "[ANALYSIS ENGINE: ACTIVE]") if appropriate.

IMPORTANT: Generate the response strictly in Spanish if requested language is Spanish, or English if requested language is English.
Generate a cohesive caption optimized for ${platform} with tone "${tone}". Also generate exactly 3 sequential comments that function as automated, system-level follow-ups, each with an order number and a realistic monospace delay string (e.g. "+5m", "+1h", "+3h").`;

    const userPrompt = `Generate a social media caption and 3 sequential comments for:
SUBJECT: ${prompt}
PLATFORM: ${platform}
TONE: ${tone}
LANGUAGE: ${language || "Spanish"}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            caption: {
              type: Type.STRING,
              description: "The primary high-quality social media caption in font-mono layout style."
            },
            comments: {
              type: Type.ARRAY,
              description: "Three sequential automated comment follow-ups.",
              items: {
                type: Type.OBJECT,
                properties: {
                  order: { type: Type.INTEGER, description: "Sequential number (1, 2, 3)" },
                  delay: { type: Type.STRING, description: "Monospace time delay offset (e.g., '+5m', '+30m', '+2h')" },
                  text: { type: Type.STRING, description: "The content of the automated comment." }
                },
                required: ["order", "delay", "text"]
              }
            }
          },
          required: ["caption", "comments"]
        }
      }
    });

    const parsedData = JSON.parse(response.text || "{}");
    return res.json({
      caption: parsedData.caption || "",
      comments: parsedData.comments || [],
      isMock: false
    });

  } catch (error: any) {
    console.error("API Gemini generation error:", error);
    return res.status(500).json({ error: error.message || "Failed to generate AI content" });
  }
});

// Configure Vite or Static Serve middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Wentix Server booted successfully. Direct port ingress routed to http://0.0.0.0:${PORT}`);
  });
}

startServer();
