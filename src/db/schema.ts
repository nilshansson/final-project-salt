import { relations } from "drizzle-orm";
import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const students = pgTable("students", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  github: text("github"),
  classId: integer("class_id").references(() => classes.id),
});

export const classes = pgTable("classes", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
});

export const pageContents = pgTable("page_contents", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  intro: text("intro"),
});

export const studentsRelations = relations(students, ({ one }) => ({
  author: one(classes, {
    fields: [students.classId],
    references: [classes.id],
  }),
}));

export const classesRelations = relations(classes, ({ many }) => ({
  students: many(students),
}));
