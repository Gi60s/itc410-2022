CREATE TABLE "accounts" (
  "account_id" character(36) NOT NULL,
  "username" character(40) NOT NULL,
  "name" character(80) NOT NULL,
  "password" character(80) NOT NULL,
  PRIMARY KEY ("account_id")
);

ALTER TABLE "accounts"
ADD CONSTRAINT "accounts_username" UNIQUE ("username");

CREATE TABLE "tasks" (
  "task_id" character(36) NOT NULL,
  "account_id" character(36) NOT NULL,
  "title" character(80) NOT NULL,
  "description" text NOT NULL,
  "due_date" timestamptz NOT NULL,
  "completed" timestamptz NOT NULL,
  PRIMARY KEY ("task_id")
);

CREATE INDEX "tasks_account_id" ON "tasks" ("account_id");
CREATE INDEX "tasks_due_date" ON "tasks" ("account_id", "due_date");
CREATE INDEX "tasks_completed" ON "tasks" ("account_id", "completed");