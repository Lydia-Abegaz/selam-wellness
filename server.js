import express from 'express';
import cors from 'cors';
import { DatabaseSync } from 'node:sqlite';
import { mockPosts } from './src/data/mockPosts.js';
import { mockCircles } from './src/data/mockCircles.js';
import { mockExperiences } from './src/data/mockExperiences.js';
import { mockPractitioners } from './src/data/mockPractitioners.js';

const app = express();
app.use(cors());
app.use(express.json());

const db = new DatabaseSync('database.db');

// Initialize Database Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author TEXT,
    avatar TEXT,
    time TEXT,
    content TEXT,
    reactions TEXT,
    comments INTEGER,
    circle TEXT,
    isAnonymous INTEGER DEFAULT 0
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS circles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    members INTEGER,
    activity TEXT,
    description TEXT,
    color TEXT,
    category TEXT,
    isWomensOnly INTEGER DEFAULT 0
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS experiences (
    id TEXT PRIMARY KEY,
    name TEXT,
    location TEXT,
    distance TEXT,
    price REAL,
    currency TEXT,
    rating REAL,
    category TEXT,
    description TEXT,
    highlights TEXT,
    available TEXT
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS practitioners (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    title TEXT,
    specialty TEXT,
    languages TEXT,
    price TEXT,
    available INTEGER DEFAULT 1,
    rating REAL,
    sessions INTEGER,
    bio TEXT
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS bookings (
    id TEXT PRIMARY KEY,
    expId TEXT,
    expName TEXT,
    date TEXT,
    adults INTEGER,
    children INTEGER,
    totalPrice REAL,
    paymentMethod TEXT,
    reference TEXT
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS mood_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT,
    mood TEXT,
    note TEXT
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS user_profile (
    id INTEGER PRIMARY KEY,
    name TEXT,
    avatar TEXT,
    bio TEXT,
    settings TEXT
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  )
`);

// Seed Database helper function
function seedData() {
  // Check and seed circles
  const circleCount = db.prepare('SELECT COUNT(*) as count FROM circles').get();
  if (circleCount.count === 0) {
    const insertCircle = db.prepare(`
      INSERT INTO circles (name, members, activity, description, color, category, isWomensOnly)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    mockCircles.forEach(c => {
      insertCircle.run(c.name, c.members, c.activity, c.description, c.color, c.category, c.isWomensOnly ? 1 : 0);
    });
    console.log('Seeded circles table.');
  }

  // Check and seed posts
  const postCount = db.prepare('SELECT COUNT(*) as count FROM posts').get();
  if (postCount.count === 0) {
    const insertPost = db.prepare(`
      INSERT INTO posts (author, avatar, time, content, reactions, comments, circle, isAnonymous)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    mockPosts.forEach(p => {
      insertPost.run(
        p.author,
        p.avatar,
        p.time,
        p.content,
        JSON.stringify(p.reactions),
        p.comments,
        p.circle,
        p.isAnonymous ? 1 : 0
      );
    });
    console.log('Seeded posts table.');
  }

  // Check and seed experiences
  const expCount = db.prepare('SELECT COUNT(*) as count FROM experiences').get();
  if (expCount.count === 0) {
    const insertExp = db.prepare(`
      INSERT INTO experiences (id, name, location, distance, price, currency, rating, category, description, highlights, available)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    mockExperiences.forEach(e => {
      insertExp.run(
        e.id,
        e.name,
        e.location,
        e.distance,
        e.price,
        e.currency,
        e.rating,
        e.category,
        e.description,
        JSON.stringify(e.highlights),
        JSON.stringify(e.available)
      );
    });
    console.log('Seeded experiences table.');
  }

  // Check and seed practitioners
  const practCount = db.prepare('SELECT COUNT(*) as count FROM practitioners').get();
  if (practCount.count === 0) {
    const insertPract = db.prepare(`
      INSERT INTO practitioners (name, title, specialty, languages, price, available, rating, sessions, bio)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    mockPractitioners.forEach(p => {
      insertPract.run(
        p.name,
        p.title,
        p.specialty,
        JSON.stringify(p.languages),
        p.price,
        p.available ? 1 : 0,
        p.rating,
        p.sessions,
        p.bio
      );
    });
    console.log('Seeded practitioners table.');
  }

  // Check and seed user profile
  const profileCount = db.prepare('SELECT COUNT(*) as count FROM user_profile').get();
  if (profileCount.count === 0) {
    db.prepare(`
      INSERT INTO user_profile (id, name, avatar, bio, settings)
      VALUES (1, 'Hana M.', null, 'Growing day by day, finding peace in community.', '{"notificationsEnabled": true}')
    `).run();
    console.log('Seeded user profile table.');
  }
  // Check and seed demo user
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
  if (userCount.count === 0) {
    db.prepare(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`).run(
      'Hana M.', 'hana@selam.et', 'selam123'
    );
    console.log('Seeded demo user (hana@selam.et / selam123).');
  }
}

seedData();

// API Endpoints

// 0. AUTH ENDPOINTS
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'All fields are required.' });
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) return res.status(409).json({ error: 'An account with this email already exists.' });
  const result = db.prepare(`INSERT INTO users (name, email, password) VALUES (?, ?, ?)`).run(name, email, password);
  const user = { id: Number(result.lastInsertRowid), name, email };
  // Also upsert user_profile for this user
  const profileExists = db.prepare('SELECT id FROM user_profile WHERE id = 1').get();
  if (!profileExists) {
    db.prepare(`INSERT INTO user_profile (id, name, bio, settings) VALUES (1, ?, ?, ?)`).run(
      name, 'Welcome to Selam Wellness!', '{"notificationsEnabled":true}'
    );
  }
  res.status(201).json({ user });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'All fields are required.' });
  const user = db.prepare('SELECT id, name, email FROM users WHERE email = ? AND password = ?').get(email, password);
  if (!user) return res.status(401).json({ error: 'Invalid email or password.' });
  res.json({ user });
});
app.get('/api/posts', (req, res) => {
  const circle = req.query.circle;
  let posts;
  if (circle) {
    posts = db.prepare('SELECT * FROM posts WHERE circle = ? ORDER BY id DESC').all(circle);
  } else {
    posts = db.prepare('SELECT * FROM posts ORDER BY id DESC').all();
  }

  // Parse JSON columns
  posts = posts.map(p => ({
    ...p,
    reactions: JSON.parse(p.reactions || '{}'),
    isAnonymous: !!p.isAnonymous
  }));

  res.json(posts);
});

app.post('/api/posts', (req, res) => {
  const { content, circle, isAnonymous, author = 'Hana M.' } = req.body;
  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  const defaultReactions = { '🤍': 0, '🌱': 0, '🙏': 0, '☀️': 0 };

  const insert = db.prepare(`
    INSERT INTO posts (author, avatar, time, content, reactions, comments, circle, isAnonymous)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const displayAuthor = isAnonymous ? 'Anonymous' : author;

  const result = insert.run(
    displayAuthor,
    null,
    'Just now',
    content,
    JSON.stringify(defaultReactions),
    0,
    circle || 'General',
    isAnonymous ? 1 : 0
  );

  const newPost = {
    id: Number(result.lastInsertRowid),
    author: displayAuthor,
    avatar: null,
    time: 'Just now',
    content,
    reactions: defaultReactions,
    comments: 0,
    circle: circle || 'General',
    isAnonymous: !!isAnonymous
  };

  res.status(201).json(newPost);
});

app.post('/api/posts/:id/react', (req, res) => {
  const { id } = req.params;
  const { reaction } = req.body; // e.g. '🤍'

  const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const reactions = JSON.parse(post.reactions || '{}');
  reactions[reaction] = (reactions[reaction] || 0) + 1;

  db.prepare('UPDATE posts SET reactions = ? WHERE id = ?').run(JSON.stringify(reactions), id);

  res.json({ id: Number(id), reactions });
});

// 2. Circles API
app.get('/api/circles', (req, res) => {
  let circles = db.prepare('SELECT * FROM circles').all();
  circles = circles.map(c => ({
    ...c,
    isWomensOnly: !!c.isWomensOnly
  }));
  res.json(circles);
});

app.post('/api/circles/:id/join', (req, res) => {
  const { id } = req.params;
  const circle = db.prepare('SELECT * FROM circles WHERE id = ?').get(id);
  if (!circle) {
    return res.status(404).json({ error: 'Circle not found' });
  }

  const updatedMembers = circle.members + 1;
  db.prepare('UPDATE circles SET members = ? WHERE id = ?').run(updatedMembers, id);

  res.json({ id: Number(id), members: updatedMembers });
});

// 3. Experiences API
app.get('/api/experiences', (req, res) => {
  let exps = db.prepare('SELECT * FROM experiences').all();
  exps = exps.map(e => ({
    ...e,
    highlights: JSON.parse(e.highlights || '[]'),
    available: JSON.parse(e.available || '[]')
  }));
  res.json(exps);
});

// 4. Practitioners API
app.get('/api/practitioners', (req, res) => {
  let practs = db.prepare('SELECT * FROM practitioners').all();
  practs = practs.map(p => ({
    ...p,
    languages: JSON.parse(p.languages || '[]'),
    available: !!p.available
  }));
  res.json(practs);
});

// 5. Bookings API
app.get('/api/bookings', (req, res) => {
  const bookings = db.prepare('SELECT * FROM bookings').all();
  res.json(bookings);
});

app.post('/api/bookings', (req, res) => {
  const { expId, expName, date, adults, children, totalPrice, paymentMethod } = req.body;
  if (!expId || !date) {
    return res.status(400).json({ error: 'expId and date are required' });
  }

  const id = `B-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const reference = `S-${Math.floor(1000 + Math.random() * 9000)}A`;

  db.prepare(`
    INSERT INTO bookings (id, expId, expName, date, adults, children, totalPrice, paymentMethod, reference)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(id, expId, expName, date, adults, children, totalPrice, paymentMethod, reference);

  res.status(201).json({
    id,
    expId,
    expName,
    date,
    adults,
    children,
    totalPrice,
    paymentMethod,
    reference
  });
});

// 6. Mood API
app.get('/api/mood', (req, res) => {
  const moods = db.prepare('SELECT * FROM mood_entries ORDER BY id DESC').all();
  res.json(moods);
});

app.post('/api/mood', (req, res) => {
  const { mood, note } = req.body;
  if (!mood) {
    return res.status(400).json({ error: 'Mood is required' });
  }

  const date = new Date().toISOString().split('T')[0];
  const result = db.prepare(`
    INSERT INTO mood_entries (date, mood, note)
    VALUES (?, ?, ?)
  `).run(date, mood, note || '');

  res.status(201).json({
    id: Number(result.lastInsertRowid),
    date,
    mood,
    note
  });
});

// 7. Profile API
app.get('/api/profile', (req, res) => {
  const profile = db.prepare('SELECT * FROM user_profile WHERE id = 1').get();
  if (profile) {
    profile.settings = JSON.parse(profile.settings || '{}');
  }
  res.json(profile);
});

app.post('/api/profile', (req, res) => {
  const { name, bio, settings } = req.body;
  const current = db.prepare('SELECT * FROM user_profile WHERE id = 1').get();

  const updatedName = name !== undefined ? name : current.name;
  const updatedBio = bio !== undefined ? bio : current.bio;
  const updatedSettings = settings !== undefined ? JSON.stringify(settings) : current.settings;

  db.prepare(`
    UPDATE user_profile
    SET name = ?, bio = ?, settings = ?
    WHERE id = 1
  `).run(updatedName, updatedBio, updatedSettings);

  res.json({
    id: 1,
    name: updatedName,
    bio: updatedBio,
    settings: settings !== undefined ? settings : JSON.parse(current.settings || '{}')
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
