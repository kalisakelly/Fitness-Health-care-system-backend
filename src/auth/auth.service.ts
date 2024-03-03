import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(@InjectRepository(User)
  private usersrepository:Repository<User>,
  private jwtService:JwtService
  ){}
  
  async signup(signupdto: SignUpDto): Promise<{ token: string }> {
    const { usernames, email, password } = signupdto;
  
    // Hash the password
    const hashedpassword = await bcrypt.hash(password, 10);
  
    // Check if the user already exists
    const existingUser = await this.usersrepository.findOneBy({ email });
  
    if (existingUser) {
      throw new HttpException('User with this email already exists', HttpStatus.CONFLICT);
    }
  
    // Create a new user
    const newUser = this.usersrepository.create({
      usernames,
      email,
      password: hashedpassword
    });
  
    // Save the new user
    const savedUser = await this.usersrepository.save(newUser);
  
    // Generate JWT token
    const token = this.jwtService.sign({ id: savedUser.userid });
  
    return { token };
  }
  

  async signin(logindto:LoginDto):Promise<{token:string}>{
    
    const {email, password} = logindto
    
    const user = await this.usersrepository.findOneBy({email})

    if (!user){
      throw new UnauthorizedException('Invalid email address')
    }

    const Ispasswordsmatch = await bcrypt.compare(password, user.password)
    if (!Ispasswordsmatch)
    throw new UnauthorizedException('Invalid password')
  
    const token = this.jwtService.sign({id: user.userid})

    return {token}
    

  }
  async findOne(condition: any): Promise<User> {
    return this.usersrepository.findOne(condition);
}
}
