import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { SendEmailDto } from './mail.interface';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  // constructor(
  //   private readonly mailservice: MailerService
  // ){}
  // sendmail(){
  //   this.mailservice.sendMail(
  //     {
  //       to:'kalisakelly@icloud.com',
  //       from:'kalisakelly2001@gmail.com',
  //       subject:'test message',
  //       text:'Welcome to',
  //       html:'<p>Welcome</p>'
  //     }
  //   )
  // }
}
