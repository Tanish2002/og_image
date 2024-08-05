CREATE TABLE IF NOT EXISTS "posts" (
	"id" serial NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"image_url" text,
	"created_at" timestamp,
	"updated_at" timestamp
);
