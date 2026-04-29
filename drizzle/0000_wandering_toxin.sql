CREATE TABLE "waitlist" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"company" varchar(255),
	"source" varchar(64),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"ip_address" varchar(64),
	"user_agent" text,
	CONSTRAINT "waitlist_email_unique" UNIQUE("email")
);
