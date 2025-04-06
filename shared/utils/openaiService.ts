// shared/utils/openaiService.ts

import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getCodeReviewFeedback(code: string): Promise<string> {
  const prompt = `
You are an AI code reviewer. Analyze the following code and give feedback in a JSON array format with objects containing:
- "line": line number (approximate is fine)
- "message": one-line feedback

Example:
[
  { "line": 3, "message": "Use const instead of let for immutable variables." },
  { "line": 7, "message": "Consider breaking this function into smaller parts." }
]

Code to review:
\`\`\`javascript
${code}
\`\`\`
`;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.3,
  });

  const content = response.choices[0].message?.content?.trim();
  if (!content) throw new Error('No content received from OpenAI');

  return content;
}
