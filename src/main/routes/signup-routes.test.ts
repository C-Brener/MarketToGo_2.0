import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Caique',
        email: 'brenercaique0806@gmail.com',
        password: 'any_password',
        confirmPassword: 'any_password',
        phoneNumber: '1234567890'
      })
      .expect(200)
  })
})
