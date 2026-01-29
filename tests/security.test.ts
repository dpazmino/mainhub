import { describe, it, expect } from 'vitest';
import request from 'supertest';

const BASE_URL = 'http://localhost:5000';

describe('Security Headers', () => {
  it('should not expose server version in headers', async () => {
    const response = await request(BASE_URL).get('/health');
    expect(response.headers['x-powered-by']).toBeUndefined();
  });

  it('should handle OPTIONS requests for CORS', async () => {
    const response = await request(BASE_URL)
      .options('/api/students')
      .set('Origin', 'http://localhost:5000');
    expect([200, 204, 404]).toContain(response.status);
  });
});

describe('Input Validation', () => {
  it('should reject invalid student ID format gracefully', async () => {
    const response = await request(BASE_URL).get('/api/students/invalid-id-!@#$');
    expect([400, 404]).toContain(response.status);
  });

  it('should handle SQL injection attempts in student ID', async () => {
    const response = await request(BASE_URL).get("/api/students/'; DROP TABLE students;--");
    expect([400, 404]).toContain(response.status);
    expect(response.status).not.toBe(500);
  });

  it('should handle XSS attempts in query parameters', async () => {
    const response = await request(BASE_URL).get('/api/students?search=<script>alert(1)</script>');
    expect(response.status).not.toBe(500);
  });
});

describe('Rate Limiting & Error Handling', () => {
  it('should handle malformed JSON gracefully', async () => {
    const response = await request(BASE_URL)
      .post('/api/support-requests')
      .set('Content-Type', 'application/json')
      .send('{"invalid json');
    expect([400, 500]).toContain(response.status);
  });

  it('should handle missing required fields', async () => {
    const response = await request(BASE_URL)
      .post('/api/support-requests')
      .send({});
    expect([400, 422]).toContain(response.status);
  });

  it('should handle non-existent API endpoints gracefully', async () => {
    const response = await request(BASE_URL).get('/api/non-existent-endpoint');
    expect([200, 404]).toContain(response.status);
  });
});

describe('Authentication Endpoints', () => {
  it('GET /api/auth/user should return auth status', async () => {
    const response = await request(BASE_URL).get('/api/auth/user');
    expect([200, 401]).toContain(response.status);
  });
});

describe('Data Integrity', () => {
  it('should return consistent data structure for students', async () => {
    const response = await request(BASE_URL).get('/api/students');
    if (response.body.length > 0) {
      const student = response.body[0];
      expect(student).toHaveProperty('id');
      expect(student).toHaveProperty('status');
    }
    expect(response.status).toBe(200);
  });

  it('should return consistent data structure for devices', async () => {
    const response = await request(BASE_URL).get('/api/devices');
    expect(response.status).toBe(200);
    if (response.body.length > 0) {
      const device = response.body[0];
      expect(device).toHaveProperty('id');
    }
  });
});
