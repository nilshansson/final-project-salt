import { relations, sql } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  classId: integer("class_id").references(() => classes.id, {
    onDelete: "set null",
  }),
  name: text("name").notNull(),
  github: text("github"),
});

export const users = pgTable("users", {
  id: text("id").notNull().unique(),
  role: text("role"),
});

export const classes = pgTable("classes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  startDate: timestamp("start_date", { withTimezone: true }),
  gradDate: timestamp("grad_date", { withTimezone: true }),
});

export const courseModules = pgTable("course_modules", {
  id: serial("id").primaryKey(),
  classId: integer("class_id")
    .references(() => classes.id, { onDelete: "cascade" })
    .notNull(),
  title: text("title").notNull(),
  intro: text("intro"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const links = pgTable("links", {
  id: serial("id").primaryKey(),
  courseModulesId: integer("course_modules_id")
    .references(() => courseModules.id, { onDelete: "cascade" })
    .notNull(),
  url: text("url").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const utlinks = pgTable("utlinks", {
  id: serial("id").primaryKey(),
  courseModulesId: integer("course_modules_id")
    .references(() => courseModules.id, { onDelete: "cascade" })
    .notNull(),
  url: text("url").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const courseModulesRelations = relations(
  courseModules,
  ({ one, many }) => ({
    links: many(links),
    utlinks: many(utlinks),
    class: one(classes, {
      fields: [courseModules.classId],
      references: [classes.id],
    }),
  }),
);

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

export const usersRelations = relations(users, ({ one }) => ({
  student: one(students),
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
  courseModules: many(courseModules),
}));
