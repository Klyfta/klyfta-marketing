"use server";

import { db } from "@/db";
import { roadmapRequests } from "@/db/schema";
import { z } from "zod";
import { headers } from "next/headers";

export type RoadmapRequestErrorKey =
  | "invalidRequest"
  | "invalidEmail"
  | "invalidInput"
  | "genericError";

export type RoadmapRequestResult =
  | { success: true }
  | { success: false; errorKey: RoadmapRequestErrorKey };

const schema = z.object({
  request: z.string().trim().min(10).max(1000),
  email: z.string().email().max(255).optional().or(z.literal("")),
  honeypot: z.string().max(0).optional(),
});

export async function submitRoadmapRequest(
  formData: FormData,
): Promise<RoadmapRequestResult> {
  const raw = {
    request: formData.get("request") ?? "",
    email: formData.get("email") ?? "",
    honeypot: formData.get("website") ?? "",
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    const path = firstIssue?.path[0];
    let errorKey: RoadmapRequestErrorKey = "invalidInput";
    if (path === "request") errorKey = "invalidRequest";
    else if (path === "email") errorKey = "invalidEmail";
    return { success: false, errorKey };
  }

  if (parsed.data.honeypot) {
    return { success: true };
  }

  try {
    const headersList = await headers();
    const ipAddress =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      headersList.get("x-real-ip") ??
      null;
    const userAgent = headersList.get("user-agent") ?? null;

    await db.insert(roadmapRequests).values({
      request: parsed.data.request,
      email: parsed.data.email ? parsed.data.email.toLowerCase() : null,
      ipAddress,
      userAgent,
    });

    return { success: true };
  } catch (error) {
    console.error("Roadmap request error:", error);
    return { success: false, errorKey: "genericError" };
  }
}
