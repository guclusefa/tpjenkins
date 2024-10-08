const request = require('supertest');
const app = require('../app'); // L'application Express
const User = require('../models/user');

// Mock de la fonction User.getUsers
jest.mock('../models/user');

describe('GET /users', () => {
  it('devrait renvoyer tous les utilisateurs', async () => {
    User.getUsers.mockImplementation((callback) => {
      callback(null, [{ id: 1, username: 'testuser' }]);
    });

    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{ id: 1, username: 'testuser' }]);
  });

  it('devrait renvoyer une erreur', async () => {
    User.getUsers.mockImplementation((callback) => {
      callback(new Error('Erreur interne'));
    });

    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(500);
  });
});

describe('POST /users', () => {
  it('devrait créer un utilisateur', async () => {
    User.createUser.mockImplementation((data, callback) => {
      callback(null, { id: 1, username: 'newuser' });
    });

    const response = await request(app)
      .post('/users')
      .send({ username: 'newuser' });

    expect(response.statusCode).toBe(201);
    expect(response.text).toBe('User added successfully');
  });

  it('devrait renvoyer une erreur de création', async () => {
    User.createUser.mockImplementation((data, callback) => {
      callback(new Error('Erreur lors de la création'));
    });

    const response = await request(app)
      .post('/users')
      .send({ username: 'newuser' });

    expect(response.statusCode).toBe(500);
  });
});
