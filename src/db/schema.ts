import { relations } from "drizzle-orm";
import { integer, pgTable, text } from "drizzle-orm/pg-core";

export const students = pgTable("students", {
  id: integer("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  classId: integer("class_id").references(() => classes.id),
  name: text("name").notNull(),
  github: text("github"),
});

export const users = pgTable("users", {
  id: text("id").notNull().unique(),
  role: text("role"),
});

export const classes = pgTable("classes", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
});

export const courseModules = pgTable("course_modules", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  intro: text("intro"),
});

export const links = pgTable("links", {
  id: integer("id").primaryKey(),
  courseModulesId: integer("course_modules_id").references(
    () => courseModules.id,
  ),
  url: text("url").notNull(),
  title: text("title").notNull(),
  description: text("description"),
});

export const utlinks = pgTable("utlinks", {
  id: integer("id").primaryKey(),
  courseModulesId: integer("course_modules_id").references(
    () => courseModules.id,
  ),
  url: text("url").notNull(),
  title: text("title").notNull(),
  description: text("description"),
});

export const courseModulesRelations = relations(courseModules, ({ many }) => ({
  links: many(links),
  utlinks: many(utlinks),
}));

export const linksRelations = relations(links, ({ one }) => ({
  module: one(courseModules, {
    fields: [links.courseModulesId],
    references: [courseModules.id],
  }),
}));

export const utlinksRelations = relations(utlinks, ({ one }) => ({
  module: one(courseModules, {
    fields: [utlinks.courseModulesId],
    references: [courseModules.id],
  }),
}));

export const studentsRelations = relations(students, ({ one }) => ({
  user: one(users, {
    fields: [students.userId],
    references: [users.id],
  }),
  class: one(classes, {
    fields: [students.classId],
    references: [classes.id],
  }),
}));

export const classesRelations = relations(classes, ({ many }) => ({
  students: many(students),
}));
