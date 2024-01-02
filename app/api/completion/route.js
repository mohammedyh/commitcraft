import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const runtime = "edge";

export async function POST(req) {
  const { prompt } = await req.json();
  const response = await openai.completions.create({
    model: "text-davinci-003",
    stream: true,
    temperature: 0.6,
    max_tokens: 300,
    prompt: `Original Commit Message:
    ${prompt}

    Prompt:
    Improve the given Git commit message by considering different conventions. Output three variations:
    1. Follow the CommitLint convention.
    2. Use the gitmoji guideline for writing commit messages.
    3. Provide a clear and understandable commit message without following any specific convention.

    GitHub Guidelines:
    - Be clear and concise.
    - Use the imperative mood ("Add feature" instead of "Adding feature").
    - Limit the first line to 50 characters.
    - Use the body to provide a detailed explanation (if needed).
    - Reference GitHub issues or pull requests using #issue_number or pull/PR number.`,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
