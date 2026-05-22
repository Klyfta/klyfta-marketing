import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const waitlist = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  company: varchar("company", { length: 255 }),
  source: varchar("source", { length: 64 }), // e.g. 'antler', 'direct'
  createdAt: timestamp("created_at").defaultNow().notNull(),
  ipAddress: varchar("ip_address", { length: 64 }),
  userAgent: text("user_agent"),
});

export type Waitlist = typeof waitlist.$inferSelect;
export type NewWaitlist = typeof waitlist.$inferInsert;

export const roadmapRequests = pgTable("roadmap_requests", {
  id: serial("id").primaryKey(),
  request: text("request").notNull(),
  email: varchar("email", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  ipAddress: varchar("ip_address", { length: 64 }),
  userAgent: text("user_agent"),
});

export type RoadmapRequest = typeof roadmapRequests.$inferSelect;
export type NewRoadmapRequest = typeof roadmapRequests.$inferInsert;
