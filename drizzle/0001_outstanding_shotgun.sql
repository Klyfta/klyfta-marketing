CREATE TABLE "roadmap_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"request" text NOT NULL,
	"email" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"ip_address" varchar(64),
	"user_agent" text
);
