import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
    imports:[
        MailerModule.forRoot({
            transport:{
                host:'smtp.gmail.com',
                port:587,
                secure: false,
                auth:{
                    user:'kalisakelly2001@gmail.com',
                    password:'utug iiyu kyqb uqxz'
                },
                authMethod: 'PLAIN'
            }
        }),
    ],
    controllers:[EmailController],
    providers:[EmailService]
})
export class EmailModule {}

//utug iiyu kyqb uqxz
