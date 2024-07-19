import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UnauthorizedException, Query, HttpException, HttpStatus, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Response,Request } from 'express';
import {JwtService} from "@nestjs/jwt";
import { VerifyEmailDto } from './dto/VerifyEmail.dto';
import { PasswordResetVerificationDto } from './dto/passwordreset.dto';
import { PasswordResetDto } from './dto/create-auth.dto';
import { AuthenticationGuard } from 'src/guards/authentication.guard';
import { TokenService } from './tokenblacklist';

type NewType = SignUpDto;

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
    private readonly tokenService: TokenService
    ) {}

  @Post('signup')
  async signup(@Body() signupDto: SignUpDto) {
      return this.authService.signup(signupDto);
  }

  @Post('verify-email')
  async verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Post('login')
    async login(
      @Body() loginDto: LoginDto,
      @Res({ passthrough: true }) response: Response
    ) {
      const { token, role } = await this.authService.signin(loginDto);

      response.cookie('token', token, { httpOnly: true });

      return {
        message: 'success',
        token,
        role,
      };
    }
  @UseGuards(AuthenticationGuard)
  @Get('user')
  async user(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];

      if (!cookie) {
        throw new UnauthorizedException('JWT cookie is missing');
      }

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException('Invalid JWT token');
      }

      const user = await this.authService.findOne({ id: data.userid });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const { password, ...result } = user;

      return result;
    } catch (e) {
      throw new UnauthorizedException('Unauthorized access');
    }
  }
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) response: Response, @Req() request: Request) {
      const token = request.cookies['jwt'];
      if (token) {
          this.tokenService.addToBlacklist(token);
      }
      response.clearCookie('jwt');

      return {
          message: 'success',
      };
  }

    @Post('reset')
    async resetPassword(@Body() passwordResetVerificationDto: PasswordResetVerificationDto): Promise<{ message: string }> {
    try {
      const result = await this.authService.resetPassword(passwordResetVerificationDto);
      return result;
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Post('request-reset')
  async requestPasswordReset(@Body() passwordResetDto: PasswordResetDto): Promise<{ message: string }> {
    try {
      const result = await this.authService.requestPasswordReset(passwordResetDto);
      return result;
    } catch (error) {
      throw new HttpException(error.message, error.status || HttpStatus.BAD_REQUEST);
    }
  }

}
