// server.js
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'tablemate_super_secret_jwt_key_2026';

app.use(cors());
app.use(express.json());

// --- In-Memory Database Seed ---
const users = [
  {
    id: 'usr_1',
    name: 'Alexander Wright',
    email: 'alex@example.com',
    phone: '+1 (555) 234-5678',
    passwordHash: bcrypt.hashSync('password123', 8),
    role: 'VIP Patron'
  }
];

import { INITIAL_RESTAURANTS } from './src/data/restaurants.js';

const restaurants = [...INITIAL_RESTAURANTS];

let reservations = [
  {
    id: 1001,
    restaurantId: 101,
    restaurantName: 'L’Étoile Bistro',
    cuisine: 'French',
    location: 'Downtown',
    date: '2026-10-25',
    time: '07:30 PM',
    guests: 2,
    tableId: 'T-101',
    tableName: 'Table 1 (Window Alcove)',
    seatingArea: 'Window',
    fullName: 'Alexander Wright',
    email: 'alex@example.com',
    phone: '+1 (555) 234-5678',
    specialRequests: 'Anniversary celebration with champagne.',
    dietaryPreferences: 'Nut allergy',
    status: 'Confirmed',
    createdAt: new Date().toISOString()
  }
];

// --- JWT Authentication Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token || token === 'expired') {
    return res.status(401).json({ error: '401 Unauthorized: Valid session token is required.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ error: '401 Unauthorized: Invalid or expired token.' });
    }
    req.user = user;
    next();
  });
};

// --- Public Endpoints ---

// GET /api/restaurants - Fetch all restaurants or single by query / param
app.get('/api/restaurants', (req, res) => {
  res.json(restaurants);
});

app.get('/api/restaurants/:id', (req, res) => {
  const id = Number(req.params.id);
  const found = restaurants.find((r) => r.id === id);
  if (!found) {
    return res.status(404).json({ error: `Restaurant with ID ${id} was not found.` });
  }
  res.json(found);
});

// GET /api/tables - Check live table availability
app.get('/api/tables', (req, res) => {
  const restId = Number(req.query.restaurantId || 101);
  const date = req.query.date;
  const time = req.query.time;

  const rest = restaurants.find((r) => r.id === restId);
  if (!rest) {
    return res.status(404).json({ error: 'Restaurant not found' });
  }

  const reservedTableIds = reservations
    .filter(
      (r) =>
        r.restaurantId === restId &&
        r.date === date &&
        r.time === time &&
        r.status !== 'Cancelled'
    )
    .map((r) => r.tableId);

  const tablesWithStatus = rest.tables.map((tbl) => ({
    ...tbl,
    status: reservedTableIds.includes(tbl.id) ? 'occupied' : 'available'
  }));

  res.json(tablesWithStatus);
});

// POST /api/signup - Register new account without issuing token
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 8);
    const newUser = {
      id: `usr_${Date.now()}`,
      name,
      email,
      phone: phone || '',
      passwordHash,
      role: 'Valued Guest'
    };

    users.push(newUser);

    // Return success message. Do NOT return token so user must manually log in.
    return res.status(201).json({
      success: true,
      message: 'Account created successfully. Please sign in to continue.'
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Internal server error during registration.' });
  }
});

// POST /api/login - Authenticate user and issue JWT token
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() ||
        u.name.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password. Please try again.' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password. Please try again.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role
    };

    res.json({ token, user: safeUser });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error during authentication.' });
  }
});

// --- Protected Endpoints (Secured with JWT) ---

// GET /api/protected/reservations - Retrieve reservation history
app.get('/api/protected/reservations', authenticateToken, (req, res) => {
  res.json(reservations);
});

// POST /api/protected/reservations - Create reservation
app.post('/api/protected/reservations', authenticateToken, (req, res) => {
  const newReservation = {
    id: Date.now(),
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
    ...req.body
  };

  reservations.unshift(newReservation);
  res.status(201).json(newReservation);
});

// PATCH /api/protected/reservations/:id - Modify reservation
app.patch('/api/protected/reservations/:id', authenticateToken, (req, res) => {
  const id = Number(req.params.id);
  const index = reservations.findIndex((r) => r.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Reservation #${id} not found.` });
  }

  reservations[index] = {
    ...reservations[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  res.json(reservations[index]);
});

// DELETE /api/protected/reservations/:id - Cancel reservation
app.delete('/api/protected/reservations/:id', authenticateToken, (req, res) => {
  const id = Number(req.params.id);
  const exists = reservations.some((r) => r.id === id);

  if (!exists) {
    return res.status(404).json({ error: `Reservation #${id} not found.` });
  }

  reservations = reservations.filter((r) => r.id !== id);
  res.json({ success: true, message: `Reservation #${id} has been cancelled successfully.` });
});

app.listen(PORT, () => {
  console.log(`TableMate Express Backend running on http://localhost:${PORT}`);
});
