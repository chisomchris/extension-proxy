import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class SummarizeService {
  private genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY!);

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getSummary(text: string, maxPoints?: number) {
    // Generate a simple hash/key from the text to check cache
    const cacheKey =
      Buffer.from(text.slice(0, 50)).toString('base64') + `_bp_${maxPoints}`;
    const cachedData = await this.cacheManager.get(cacheKey);

    if (cachedData) return { summary: cachedData, cached: true };

    const model = this.genAI.getGenerativeModel({
      model: 'gemini-3-flash-preview',
    });

    // 1. Logic for the bullet point constraint
    const bulletConstraint = maxPoints
      ? `Provide exactly ${maxPoints} bullet points for the summary section.`
      : 'Provide a natural number of bullet points for the summary based on the content depth.';

    // 2. Construct the structured prompt
    const prompt = `
      You are a professional content analyst. Summarize the following text provided below.
      
      Your response MUST follow this Markdown structure:
      
      **Estimated Reading Time:** [Calculate based on 200 words per minute]
      
      ### 💡 Key Insights
      [Provide 2-3 high-level strategic takeaways or unique perspectives found in the text]
      
      ### 📝 Summary
      [${bulletConstraint}]

      TEXT TO ANALYZE:
      ${text}
    `;

    const result = await model.generateContent(prompt);
    const summary = result.response.text();

    await this.cacheManager.set(cacheKey, summary, 3_600_000);

    return { summary, cached: false };
  }
}
