// src/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @ApiBody({ type: CreateUserDto })
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('signin')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        password: { type: 'string', example: 'P@ssword123' },
      },
      required: ['email', 'password'],
    },
  })
  signin(@Body() loginDto: LoginDto) {
    return this.authService.signin(loginDto);
  }

  @Get('welcome')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getWelcome(@Req() req: Request) {
    const user = (req as any).user;
    return {
      message: `Welcome, ${user.name}!`,
    };
  }
}
