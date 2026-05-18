"use server";

import { db } from "@/db";
import { waitlist } from "@/db/schema";
import { z } from "zod";
import { headers } from "next/headers";

export type WaitlistErrorKey =
  | "invalidEmail"
  | "invalidInput"
  | "genericError";

export type WaitlistResult =
  | { success: true }
  | { success: false; errorKey: WaitlistErrorKey };

const waitlistSchema = z.object({
  email: z.string().email(),
  company: z.string().max(255).optional(),
  honeypot: z.string().max(0).optional(),
});

export async function joinWaitlist(formData: FormData): Promise<WaitlistResult> {
  const raw = {
    email: formData.get("email"),
    company: formData.get("company") || undefined,
    honeypot: formData.get("website") || "",
  };

  const parsed = waitlistSchema.safeParse(raw);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    const isEmailIssue = firstIssue?.path[0] === "email";
    return {
      success: false,
      errorKey: isEmailIssue ? "invalidEmail" : "invalidInput",
    };
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

    await db.insert(waitlist).values({
      email: parsed.data.email.toLowerCase(),
      company: parsed.data.company,
      source: "direct",
      ipAddress,
      userAgent,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof Error && error.message.includes("duplicate")) {
      return { success: true };
    }
    console.error("Waitlist signup error:", error);
    return {
      success: false,
      errorKey: "genericError",
    };
  }
}
