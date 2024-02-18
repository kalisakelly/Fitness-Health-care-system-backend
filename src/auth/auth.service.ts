import { Injectable, UnauthorizedException } from '@nestjs/common';
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
  
async signup(signupdto:SignUpDto):Promise <{token:string}>{

  const {usernames , email, password} = signupdto
  const hashedpassword = await bcrypt.hash(password,10)

  const user = await this.usersrepository.create({
    usernames,
    email,
    password:hashedpassword
  });

  await this.usersrepository.save(user);

  const token = this.jwtService.sign({ id: user.id});

  return { token}

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
  
    const token = this.jwtService.sign({id: user.id})

    return {token}
    

  }
}
