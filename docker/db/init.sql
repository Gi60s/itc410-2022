-- Accounts

CREATE TABLE "accounts" (
  "account_id" varchar(36) NOT NULL,
  "username" varchar(40) NOT NULL,
  "name" varchar(80) NOT NULL,
  "password" varchar(80) NOT NULL,
  PRIMARY KEY ("account_id")
);

ALTER TABLE "accounts"
ADD CONSTRAINT "accounts_username" UNIQUE ("username");

-- Sessions

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
CREATE INDEX "IDX_session_expire" ON "session" ("expire");

-- Tasks

CREATE TABLE "tasks" (
  "task_id" varchar(36) NOT NULL,
  "account_id" varchar(36) NOT NULL,
  "title" varchar(80) NOT NULL,
  "description" text NOT NULL,
  "due_date" timestamptz NOT NULL,
  "completed" timestamptz NOT NULL,
  PRIMARY KEY ("task_id")
);

CREATE INDEX "tasks_account_id" ON "tasks" ("account_id");
CREATE INDEX "tasks_due_date" ON "tasks" ("account_id", "due_date");
CREATE INDEX "tasks_completed" ON "tasks" ("account_id", "completed");