import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { Response,Request } from 'express';
import {JwtService} from "@nestjs/jwt";

type NewType = SignUpDto;

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService

    ) {}

  @Post('/signup')
  async signUp(@Body() signUpDto: NewType): Promise<{ token: string }> {
    return this.authService.signup(signUpDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto,
        @Res({passthrough:true}) response: Response
  ) {

    const jwt =  await this.authService.signin(loginDto);

    response.cookie('token', jwt ,{httpOnly:true})

    return {
      message:'success'
    }
    
  }

  @Get('user')
    async user(@Req() request: Request) {
        try {
            const cookie = request.cookies['jwt'];

            const data = await this.jwtService.verifyAsync(cookie);

            if (!data) {
                throw new UnauthorizedException();
            }

            const user = await this.authService.findOne({id: data['id']});

            const {password, ...result} = user;

            return result;
        } catch (e) {
            throw new UnauthorizedException();
        }
    }

    @Post('logout')
    async logout(@Res({passthrough: true}) response: Response) {
        response.clearCookie('jwt');

        return {
            message: 'success'
        }
    }

}
