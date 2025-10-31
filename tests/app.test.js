const request = require('supertest');
const app = require('../app');

describe('Health Check Endpoint', () => {
  test('GET /health should return status OK', async () => {
    const response = await request(app).get('/health');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'OK');
    expect(response.body).toHaveProperty('timestamp');
  });
});

describe('User Endpoints', () => {
  test('GET /users should return all users', async () => {
    const response = await request(app).get('/users');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('GET /users/:id should return specific user', async () => {
    const response = await request(app).get('/users/1');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
  });

  test('GET /users/:id with invalid id should return 404', async () => {
    const response = await request(app).get('/users/999');
    
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'User not found');
  });

  test('POST /users should create new user', async () => {
    const newUser = {
      name: 'Test User',
      email: 'test@example.com'
    };

    const response = await request(app)
      .post('/users')
      .send(newUser);
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.email).toBe(newUser.email);
  });

  test('POST /users with missing data should return 400', async () => {
    const invalidUser = {
      name: 'Test User'
      // email missing
    };

    const response = await request(app)
      .post('/users')
      .send(invalidUser);
    
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});

describe('Product Endpoints', () => {
  test('GET /products should return all products', async () => {
    const response = await request(app).get('/products');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /products?inStock=true should return only in-stock products', async () => {
    const response = await request(app).get('/products?inStock=true');
    
    expect(response.status).toBe(200);
    response.body.forEach(product => {
      expect(product.inStock).toBe(true);
    });
  });

  test('GET /products?inStock=false should return only out-of-stock products', async () => {
    const response = await request(app).get('/products?inStock=false');
    
    expect(response.status).toBe(200);
    response.body.forEach(product => {
      expect(product.inStock).toBe(false);
    });
  });

  test('GET /products/:id should return specific product', async () => {
    const response = await request(app).get('/products/1');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('price');
  });

  test('GET /products/:id with invalid id should return 404', async () => {
    const response = await request(app).get('/products/999');
    
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Product not found');
  });
});

describe('Error Handling', () => {
  test('GET non-existent route should return 404', async () => {
    const response = await request(app).get('/nonexistent');
    
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Route not found');
  });
});
