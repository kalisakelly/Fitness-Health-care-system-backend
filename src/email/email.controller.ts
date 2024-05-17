import { Body, Controller, Get, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './mail.interface';
import * as nodemailer from "nodemailer";    


@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/sendEmail')
  async sendMail(): Promise<any> {
    try {
      const result = await this.emailService.sendActivationEmail(
        "kalisakelly@icloud.com",
        "Kelly",
        "123435424"
      );
      return { success: true, message: 'Email sent successfully', result };
    } catch (error) {
      return { success: false, message: 'Failed to send email', error };
    }
  }
}
