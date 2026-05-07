"use server";

import { db } from "@/db";
import { waitlist } from "@/db/schema";
import { z } from "zod";
import { headers } from "next/headers";

const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  company: z.string().max(255).optional(),
  honeypot: z.string().max(0, "Bot detected").optional(),
});

export type WaitlistResult =
  | { success: true }
  | { success: false; error: string };

export async function joinWaitlist(formData: FormData): Promise<WaitlistResult> {
  const raw = {
    email: formData.get("email"),
    company: formData.get("company") || undefined,
    honeypot: formData.get("website") || "",
  };

  const parsed = waitlistSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid input",
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
      error: "Something went wrong. Please try again or email hello@verkio.eu.",
    };
  }
}
