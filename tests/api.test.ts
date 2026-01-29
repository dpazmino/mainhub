import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import express from 'express';

const BASE_URL = 'http://localhost:5000';

describe('Health Check Endpoints', () => {
  it('should return 200 OK on /health endpoint', async () => {
    const response = await request(BASE_URL).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
  });

  it('should return 200 OK on root endpoint', async () => {
    const response = await request(BASE_URL).get('/');
    expect(response.status).toBe(200);
  });
});

describe('Student API Endpoints', () => {
  it('GET /api/students should return array of students', async () => {
    const response = await request(BASE_URL).get('/api/students');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('GET /api/students/:id should return student or 404', async () => {
    const response = await request(BASE_URL).get('/api/students/STU-000001');
    expect([200, 404]).toContain(response.status);
    if (response.status === 200) {
      expect(response.body).toHaveProperty('id');
    }
  });

  it('GET /api/students/:id/goals should return goals array', async () => {
    const response = await request(BASE_URL).get('/api/students/STU-000001/goals');
    expect([200, 404]).toContain(response.status);
    if (response.status === 200) {
      expect(Array.isArray(response.body)).toBe(true);
    }
  });

  it('GET /api/students/:id/skills should return skills array', async () => {
    const response = await request(BASE_URL).get('/api/students/STU-000001/skills');
    expect([200, 404]).toContain(response.status);
    if (response.status === 200) {
      expect(Array.isArray(response.body)).toBe(true);
    }
  });

  it('GET /api/students/:id/placements should return placements array', async () => {
    const response = await request(BASE_URL).get('/api/students/STU-000001/placements');
    expect([200, 404]).toContain(response.status);
    if (response.status === 200) {
      expect(Array.isArray(response.body)).toBe(true);
    }
  });
});

describe('Device Management API', () => {
  it('GET /api/devices should return array of devices', async () => {
    const response = await request(BASE_URL).get('/api/devices');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('GET /api/device-allocations should return allocations', async () => {
    const response = await request(BASE_URL).get('/api/device-allocations');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('Support Request API', () => {
  it('GET /api/support-requests should return requests array', async () => {
    const response = await request(BASE_URL).get('/api/support-requests');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('Mentor API', () => {
  it('GET /api/mentors should return mentors array', async () => {
    const response = await request(BASE_URL).get('/api/mentors');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('Learning Progress API', () => {
  it('GET /api/learning-progress should return progress data', async () => {
    const response = await request(BASE_URL).get('/api/learning-progress');
    expect(response.status).toBe(200);
  });
});
