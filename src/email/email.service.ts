import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {}

  async sendEmail(email: string, id, Otp): Promise<string> {
    // Configure nodemailer with your email service provider
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get('EMAIL_USER'),
        pass: this.configService.get('EMAIL_PASSWORD'),
      },
    });

    // Define the email options
    const mailOptions = {
      from: 'kalisakelly2001@gmail.com',
      to: email,
      subject: 'Test Email from NestJS',
      text: `OTP is ${Otp} , It is valid for only 5 Min`,
    };

    try {
      await transporter.sendMail(mailOptions);
      return 'Email Otp sent successfully!';
    } catch (error) {
      return `Error sending email: ${error.message}`;
    }
  }
}
