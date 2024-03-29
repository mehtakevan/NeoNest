// Assuming you have installed supertest and jest
const request = require('supertest');
const app = require('../server'); // Assuming your Express app is exported from app.js
// const {authUser} = require('../controllers/userControllers');

describe('POST /login', () => {
  test('should return a success message for valid credentials', async () => {
    const response = await request(app)
      .post('/api/user/login')
      .send({ email: 'imvijaymehta@gmail.com', password: 'bir@123' });

    console.log(response);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful');
  });

  test('should return an error message for invalid credentials', async () => {
    const response = await request(app)
      .post('/api/user/login')
      .send({ email: 'invalid@example.com', password: 'invalid' });

    expect(response.status).toBe(401);
    // expect(response.body.error).toBe('Invalid Email or Password');
  });
});
