import generateJWT from '../../src/middlewares/generateJWT';
const jest = require('jest-mock');
const mockUser = {
  _id: 1,
  firstName: 'Nour',
  lastName: 'Hamdan',
  email: 'nour96@gmail.com',
  userName: 'nour',
  password: '123456',
};
const mockRes = { cookie: jest.fn() };

describe('JWT Generator', () => {
  test('Should return error msg if either of the arguments is null', () => {
    expect(generateJWT(null, mockUser)).toBe('Invalid data!');
    expect(generateJWT({}, null)).toBe('Invalid data!');
    expect(generateJWT(null, null)).toBe('Invalid data!');
  });

  test('Should work properly', () => {
    const result = generateJWT(mockRes, mockUser);
    expect(result).not.toBe(null);
  });
});