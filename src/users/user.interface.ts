import { Role } from './entities/role.enum';
import { Userdetail } from 'src/userdetails/entities/userdetail.entity';
import { Video } from 'src/videos/entities/video.entity';
import { Nutrition } from 'src/nutrition/entities/nutrition.entity';
import { Blog } from 'src/blog/entities/blog.entity';

interface UserInt {
    userid: number;
    email: string;
    username: string;
    password: string;
    role: Role;
    createdate: Date;
    updatedate: Date;
    userDetails?: Userdetail; 
    Watchedvideos?: Video[]; 
    profileImage?: string; 
    OTP?: number; 
    likedvideos?: Video[]; 
    nutrient?: Nutrition[]; 
    phoneNumber?: string; 
    address?: string; 
    emergencyContact?: string; 
    Posts?: Blog[]; 
}
export enum UserRole {
    User = 'user',
    Admin = 'admin',
    Nutritionist='nutritionist'
  }

export default UserInt;
