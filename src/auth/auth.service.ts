import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { v4 as uuidv4 } from 'uuid';
import { EmailService } from 'src/email/email.service';
import { UsersService } from 'src/users/users.service';
import { PasswordResetVerificationDto } from './dto/passwordreset.dto';
import { PasswordResetDto } from './dto/create-auth.dto';
const otpGenerator = require('otp-generator');

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private usersrepository: Repository<User>,
    private jwtService: JwtService,
    private emailService: EmailService,
    private usersService: UsersService
  ) {}
  
  
  async signup(signupDto: SignUpDto): Promise<{ message: string }> {
    const { username, email, password } = signupDto;

    const hashedPassword = await bcrypt.hash(password, 6);

    const existingUser = await this.usersrepository.findOneBy({ email });
    if (existingUser) {
      throw new HttpException('User with this email already exists', HttpStatus.CONFLICT);
    }

    

    // Generate email verification token
    const emailVerificationToken = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      digits: true,
      lowerCaseAlphabets: false,
    });

    const newUser = this.usersrepository.create({
      username,
      email,
      password: hashedPassword,
      emailVerificationToken,
      isEmailVerified: false,
    });

    // Send email with verification link
    await this.emailService.sendActivationEmail(email, emailVerificationToken);

    await this.usersrepository.save(newUser);

    return { message: 'Please check your email to verify your account.' };
  }

  async verifyEmail(token: string): Promise<string> {
    const user = await this.usersService.findByVerificationToken(token);
    if (!user) {
      throw new BadRequestException('Invalid token');
    }

    if (user.isEmailVerified) {
      return 'Email is already verified';
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = null;  
    await this.usersService.update(user.userid, user);

    return 'Email successfully verified';
  }
  
  async signin(logindto: LoginDto): Promise<{ token: string, role: string }> {
    const { email, password } = logindto;
  
    const user = await this.usersrepository.findOneBy({ email });
  
    if (!user) {
      throw new UnauthorizedException('Invalid email address');
    }
  
    if (!user.isEmailVerified) {
      throw new UnauthorizedException('Email is not verified');
    }
  
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid password');
    }
  
    const payload = { id: user.userid, role: user.role };
    const token = this.jwtService.sign(payload);
  
    console.log(token);
  
    return { token, role: user.role };
  }
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getByEmail(email);
    if (user && user.password === pass) { // In a real-world app, use hashed passwords
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userid, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      role: user.role, // Include role in the response
    };
  }
  async resetPassword(passwordResetVerificationDto: PasswordResetVerificationDto): Promise<{ message: string }> {
    const { token, newPassword } = passwordResetVerificationDto;

    // Log input data
    console.log('Received token:', token);
    console.log('Received newPassword:', newPassword);

    const user = await this.usersService.findByPasswordResetToken(token);

    if (!user) {
        console.error('User not found for token:', token);
        throw new HttpException('Invalid or expired token', HttpStatus.BAD_REQUEST);
    }

    // Log expiration date and current date
    console.log('Token expiration date:', user.passwordResetExpires);
    console.log('Current date:', new Date());

    if (user.passwordResetExpires < new Date()) {
        console.error('Token expired for user:', user.userid);
        throw new HttpException('Invalid or expired token', HttpStatus.BAD_REQUEST);
    }

    user.password = await bcrypt.hash(newPassword, 6);
    user.passwordResetToken = null;
    user.passwordResetExpires = null;

    // Log user update
    console.log('Updating user password for user:', user.userid);

    await this.usersService.update(user.userid, user);

    // Confirm update success
    console.log('Password successfully reset for user:', user.userid);

    return { message: 'Password has been successfully reset.' };
}
  
  async findOne(condition: any): Promise<User> {
    return this.usersrepository.findOne(condition);
}

async requestPasswordReset(passwordResetDto: PasswordResetDto): Promise<{ message: string }> {
  const { email } = passwordResetDto;

  const user = await this.usersService.getByEmail(email);
  if (!user) {
    throw new HttpException('User with this email does not exist', HttpStatus.NOT_FOUND);
  }

  const passwordResetToken = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    digits: true,
    lowerCaseAlphabets: false,
  });

  user.passwordResetToken = passwordResetToken;
  user.passwordResetExpires = new Date(Date.now() + 3600000); // Token valid for 1 hour
  await this.usersService.update(user.userid, user);

  await this.emailService.sendPasswordResetEmail(email, passwordResetToken);

  return { message: 'Please check your email for the password reset token.' };
}

async decodeToken(token: string) {
  return this.jwtService.decode(token);
}


}
