import { isAuth } from '../../src/middlewares/privateRoute';
import jwt from 'jsonwebtoken';
const jest = require('jest-mock');

const mockRequest = {
  body: {
    token: 'test-token',
  },
  user: null,
};

const mockResponse = {
  status: (code) => {
    return { json: jest.fn() };
  },
};

const mockNext = jest.fn();

describe('Is Authorized Middleware', () => {
  test('Should not fail if token is valid', async () => {
    mockRequest.body.token = 'validToken';
    const spy = jest.spyOn(mockResponse, 'status');
    const jwtSpy = jest.spyOn(jwt, 'verify');
    jwtSpy.mockImplementation(() => ({ verified: 'true' }));

    await isAuth(mockRequest, mockResponse, mockNext);

    expect(spy).not.toBeCalled();
    expect(mockNext).toHaveBeenCalled();
  });

  test('Should return 401 if token is null', async () => {
    mockRequest.body.token = undefined;
    const spy = jest.spyOn(mockResponse, 'status');
    await isAuth(mockRequest, mockResponse, mockNext);

    expect(spy).toBeCalledWith(401);
  });

  test('Should return 400 if token is invalid', async () => {
    mockRequest.body.token = 'invalidToken';

    const spy = jest.spyOn(mockResponse, 'status');
    const jwtSpy = jest.spyOn(jwt, 'verify');
    jwtSpy.mockImplementation(() => {
      throw new Error('Invalid token!');
    });
    await isAuth(mockRequest, mockResponse, mockNext);

    expect(spy).toBeCalledWith(400);
  });
});
