import { pgTable, serial, text, timestamp, integer, jsonb } from "drizzle-orm/pg-core";

export const forms = pgTable("forms", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const fields = pgTable("fields", {
    id: serial("id").primaryKey(),
    formId: integer("form_id").references(() => forms.id).notNull(),
    type: text("type").notNull(),
    options: jsonb("options").notNull(),
    order: integer("order").notNull(),
});