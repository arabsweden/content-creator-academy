import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Initialize Gemini AI client if API key is present
  const getGenAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables");
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", app: "أكاديمية صانع المحتوى" });
  });

  // AI Content Generator Endpoint using Gemini 3.6 Flash
  app.post("/api/gemini/generate", async (req, res) => {
    try {
      const { prompt, systemInstruction, toolType } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: "الرجاء إدخال النص المطلوب" });
      }

      const ai = getGenAI();

      let defaultInstruction =
        "أنت مساعد الذكاء الاصطناعي لـ 'أكاديمية صانع المحتوى' بإشراف رائد شهاب (Arab Sweden). اجعل إجاباتك احترافية باللغة العربية وموجهة لصناع المحتوى بأسلوب مشجع ومنظم.";

      if (toolType === "hook") {
        defaultInstruction += " ركز على كتابة هوكات (Hooks) جذابة ومثيرة للاقتطاف في أول 3 ثوانٍ.";
      } else if (toolType === "script") {
        defaultInstruction += " اكتب سيناريو مقسم إلى: المقدمة (Hook)، المشهد والقصة (Body)، والدعوة لاتخاذ إجراء (CTA).";
      } else if (toolType === "ideas") {
        defaultInstruction += " قدم 5 أفكار محتوى مبتكرة وقابلة للتطبيق فوراً مع زاوية كل فكرة.";
      } else if (toolType === "calendar") {
        defaultInstruction += " أنشئ جدول محتوى لمنشورات وتصوير لمدة 30 يوماً بشكل جدول واضح.";
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          systemInstruction: systemInstruction || defaultInstruction,
          temperature: 0.7,
        },
      });

      res.json({ result: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({
        error: error.message || "حدث خطأ أثناء الاتصال بالذكاء الاصطناعي",
      });
    }
  });

  // Vite Middleware in development mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
