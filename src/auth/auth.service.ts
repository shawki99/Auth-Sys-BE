import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  private readonly logger = new Logger(AuthService.name);
  async signup(createUserDto: CreateUserDto) {
    const { email, name, password } = createUserDto;

    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      this.logger.warn(`Signup failed: Email already exists - ${email}`);
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.create({
      email,
      name,
      password: hashedPassword,
    });

    this.logger.log(`User signed up successfully: ${email}`);
    return { message: 'User created successfully', userId: user._id };
  }

  async signin(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userService.findByEmail(email);
    if (!user) {
      this.logger.warn(`Signin failed: Email not found - ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      this.logger.warn(`Signin failed: Invalid password - ${email}`);
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user._id, email: user.email, name: user.name };
    const token = this.jwtService.sign(payload);

    this.logger.log(`User logged in successfully: ${email}`);
    return { access_token: token };
  }
}
