import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type, Schema } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post('/api/generate-reviews', async (req, res) => {
    try {
      const data = req.body;
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      const prompt = `
You are generating Google review drafts for a clothing retail business named "Citykart".
The customer has provided the following details about their shopping experience:
${JSON.stringify(data, null, 2)}

Based ONLY on the facts provided, generate exactly 3 review variations:
1. Natural (conversational and casual)
2. Short (simple and to the point)
3. Polished (detailed and well-written)

Rules:
- DO NOT invent any facts, product names, colours, prices, discounts, or staff behaviour that are not in the provided data.
- If a field is missing, omit it.
- If the customer provided a negative attribute, do not turn it into a positive statement.
- The reviews must sound like genuine customer reviews.
- Avoid keyword stuffing or repetitive phrases.
- The tone should match the provided sentiment.

Return a JSON array containing the 3 review strings in order: [natural, short, polished].
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          } as Schema,
        },
      });

      const resultText = response.text;
      let reviews = [];
      if (resultText) {
        reviews = JSON.parse(resultText);
      }

      res.json({ reviews });
    } catch (error) {
      console.error('Error generating reviews:', error);
      res.status(500).json({ error: 'Failed to generate reviews' });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
