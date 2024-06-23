import { IsString, IsNotEmpty } from 'class-validator';

export class PasswordResetVerificationDto {
    @IsString()
    @IsNotEmpty()
    token: string;

    @IsString()
    @IsNotEmpty()
    newPassword: string;
}
