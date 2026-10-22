// src/test/reservationCrud.test.js
import { describe, it, expect, beforeEach } from 'vitest';
import fetchWithAuth from '../services/api';

describe('Experiment 1 & 3: Reservation CRUD Operations and API Testing', () => {
  beforeEach(async () => {
    localStorage.clear();
    // Real login to receive a valid JWT from the Express server
    const authRes = await fetchWithAuth('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'alex@example.com', password: 'password123' })
    });
    localStorage.setItem('authToken', authRes.token);
  });

  // d) Test reservation creation, retrieval, modification, and cancellation
  it('should fetch all restaurant listings (GET)', async () => {
    const restaurants = await fetchWithAuth('/api/restaurants');
    expect(Array.isArray(restaurants)).toBe(true);
    expect(restaurants.length).toBeGreaterThan(0);
    expect(restaurants[0]).toHaveProperty('name');
    expect(restaurants[0]).toHaveProperty('cuisine');
  });

  it('should fetch single restaurant by id (GET)', async () => {
    const restaurant = await fetchWithAuth('/api/restaurants/101');
    expect(restaurant.id).toBe(101);
    expect(restaurant.name).toBe('L’Étoile Bistro');
  });

  it('should create a reservation using POST', async () => {
    const newReservation = {
      restaurantId: 101,
      restaurantName: 'L’Étoile Bistro',
      date: '2026-10-28',
      time: '08:00 PM',
      guests: 4,
      tableId: 'T-102',
      tableName: 'Table 2 (Garden Terrace)',
      fullName: 'Emma Watson',
      email: 'emma@example.com'
    };

    const created = await fetchWithAuth('/api/protected/reservations', {
      method: 'POST',
      body: JSON.stringify(newReservation)
    });

    expect(created).toHaveProperty('id');
    expect(created.fullName).toBe('Emma Watson');
    expect(created.status).toBe('Confirmed');

    // Retrieve reservations list (GET)
    const list = await fetchWithAuth('/api/protected/reservations', { method: 'GET' });
    const exists = list.some((item) => item.id === created.id);
    expect(exists).toBe(true);
  });

  it('should modify reservation details using PATCH/PUT', async () => {
    // Seed reservation
    const initial = await fetchWithAuth('/api/protected/reservations', {
      method: 'POST',
      body: JSON.stringify({
        restaurantName: 'Sakura Omakase',
        guests: 2,
        time: '06:00 PM'
      })
    });

    const updated = await fetchWithAuth(`/api/protected/reservations/${initial.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ guests: 5, time: '08:30 PM' })
    });

    expect(updated.guests).toBe(5);
    expect(updated.time).toBe('08:30 PM');
  });

  it('should cancel a reservation using DELETE', async () => {
    const created = await fetchWithAuth('/api/protected/reservations', {
      method: 'POST',
      body: JSON.stringify({
        restaurantName: 'Villa Bellini',
        guests: 3
      })
    });

    const deleteRes = await fetchWithAuth(`/api/protected/reservations/${created.id}`, {
      method: 'DELETE'
    });
    expect(deleteRes.success).toBe(true);

    const list = await fetchWithAuth('/api/protected/reservations', { method: 'GET' });
    const exists = list.some((item) => item.id === created.id);
    expect(exists).toBe(false);
  });

  it('should throw 401 Unauthorized when token is missing or expired', async () => {
    localStorage.removeItem('authToken');
    await expect(fetchWithAuth('/api/protected/reservations')).rejects.toThrow(
      /401 Unauthorized/i
    );
  });
});
