import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

jest.mock('bcrypt', () => ({
  hash: jest.fn(() => 'hashedPassword'),
  compare: jest.fn(() => true),
}));

describe('AuthService', () => {
  let service: AuthService;
  let userService: Partial<UserService>;
  let jwtService: Partial<JwtService>;

  const fakeUser = {
    _id: 'abc123',
    email: 'test@example.com',
    password: 'hashedPassword',
    name: 'Test User',
  };

  beforeEach(async () => {
    userService = {
      findByEmail: jest.fn(),
      create: jest.fn().mockResolvedValue(fakeUser),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('fake-jwt-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signup()', () => {
    it('should create a new user if email does not exist', async () => {
      (userService.findByEmail as jest.Mock).mockResolvedValue(null);

      const result = await service.signup({
        email: 'test@example.com',
        name: 'Test User',
        password: 'test123',
      });

      expect(userService.create).toHaveBeenCalled();
      expect(result).toEqual({
        message: 'User created successfully',
        userId: fakeUser._id,
      });
    });

    it('should throw ConflictException if email already exists', async () => {
      (userService.findByEmail as jest.Mock).mockResolvedValue(fakeUser);

      await expect(
        service.signup({
          email: 'test@example.com',
          name: 'Test User',
          password: 'test123',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('signin()', () => {
    it('should return JWT if credentials are valid', async () => {
      (userService.findByEmail as jest.Mock).mockResolvedValue(fakeUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.signin({
        email: 'test@example.com',
        password: 'test123',
      });

      expect(result).toEqual({ access_token: 'fake-jwt-token' });
    });

    it('should throw UnauthorizedException if email is not found', async () => {
      (userService.findByEmail as jest.Mock).mockResolvedValue(null);

      await expect(
        service.signin({
          email: 'notfound@example.com',
          password: 'wrongpass',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      (userService.findByEmail as jest.Mock).mockResolvedValue(fakeUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.signin({
          email: 'test@example.com',
          password: 'wrongpass',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
