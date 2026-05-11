import { NextResponse } from "next/server";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { getOpenAI, OPENAI_MODEL } from "@/lib/openai/client";
import { SYSTEM_PROMPT, CV_TOOL_SCHEMA } from "@/lib/openai/prompts";

export const runtime = "nodejs";

type ChatMessageIn = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  let body: { messages?: ChatMessageIn[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }
  const messages = body.messages ?? [];
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: "messages required" }, { status: 400 });
  }

  const openai = getOpenAI();
  const chatMessages: ChatCompletionMessageParam[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages.map((m) => ({ role: m.role, content: m.content }) as ChatCompletionMessageParam),
  ];

  const stream = await openai.chat.completions.create({
    model: OPENAI_MODEL,
    stream: true,
    messages: chatMessages,
    tools: [CV_TOOL_SCHEMA],
    tool_choice: "auto",
    temperature: 0.6,
  });

  // Stream as SSE-like newline-delimited JSON.
  // Each event is one of:
  //   { type: "text",   delta: string }
  //   { type: "cv",     patch: object }     // partial update_cv arguments (best-effort streamed)
  //   { type: "cv_end" }                    // marker after a complete tool call
  //   { type: "done" }
  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      const write = (obj: unknown) => controller.enqueue(encoder.encode(JSON.stringify(obj) + "\n"));
      let toolBuf = "";
      let inTool = false;
      try {
        for await (const chunk of stream) {
          const choice = chunk.choices[0];
          if (!choice) continue;
          const delta = choice.delta;
          if (delta?.content) write({ type: "text", delta: delta.content });
          const toolCalls = delta?.tool_calls;
          if (toolCalls && toolCalls.length) {
            inTool = true;
            for (const tc of toolCalls) {
              const argFragment = tc.function?.arguments ?? "";
              toolBuf += argFragment;
            }
          }
          if (choice.finish_reason === "tool_calls" || (inTool && choice.finish_reason)) {
            try {
              const parsed = JSON.parse(toolBuf);
              write({ type: "cv", patch: parsed });
            } catch {
              // Tool args weren't valid JSON (rare with strict-mode tools, can happen mid-stream)
            }
            write({ type: "cv_end" });
            toolBuf = "";
            inTool = false;
          }
        }
        write({ type: "done" });
      } catch (err) {
        const message = err instanceof Error ? err.message : "stream error";
        write({ type: "error", error: message });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
