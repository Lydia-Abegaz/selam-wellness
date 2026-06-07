import { pgTable, serial, text, integer, real, boolean, jsonb } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  password: text("password").notNull(),
  createdAt: text("created_at").default("now()"),
});

export const circlesTable = pgTable("circles", {
  id: serial("id").primaryKey(),
  name: text("name").unique().notNull(),
  members: integer("members").notNull().default(0),
  activity: text("activity").notNull(),
  description: text("description").notNull(),
  color: text("color").notNull(),
  category: text("category").notNull(),
  isWomensOnly: boolean("is_womens_only").notNull().default(false),
});

export const postsTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  author: text("author").notNull(),
  avatar: text("avatar"),
  time: text("time").notNull(),
  content: text("content").notNull(),
  reactions: jsonb("reactions").notNull().default({}),
  comments: integer("comments").notNull().default(0),
  circle: text("circle").notNull().default("General"),
  isAnonymous: boolean("is_anonymous").notNull().default(false),
});

export const experiencesTable = pgTable("experiences", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  distance: text("distance").notNull(),
  price: real("price").notNull(),
  currency: text("currency").notNull(),
  rating: real("rating").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  highlights: jsonb("highlights").notNull().default([]),
  available: jsonb("available").notNull().default([]),
});

export const practitionersTable = pgTable("practitioners", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  specialty: text("specialty").notNull(),
  languages: jsonb("languages").notNull().default([]),
  price: text("price").notNull(),
  available: boolean("available").notNull().default(true),
  rating: real("rating").notNull(),
  sessions: integer("sessions").notNull().default(0),
  bio: text("bio").notNull(),
});

export const bookingsTable = pgTable("bookings", {
  id: text("id").primaryKey(),
  expId: text("exp_id").notNull(),
  expName: text("exp_name").notNull(),
  date: text("date").notNull(),
  adults: integer("adults").notNull().default(1),
  children: integer("children").notNull().default(0),
  totalPrice: real("total_price").notNull(),
  paymentMethod: text("payment_method").notNull(),
  reference: text("reference").notNull(),
});

export const moodEntriesTable = pgTable("mood_entries", {
  id: serial("id").primaryKey(),
  date: text("date").notNull(),
  mood: text("mood").notNull(),
  note: text("note").notNull().default(""),
});

export const userProfileTable = pgTable("user_profile", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  avatar: text("avatar"),
  bio: text("bio").notNull().default(""),
  settings: jsonb("settings").notNull().default({}),
});
