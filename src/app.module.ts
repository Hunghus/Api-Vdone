import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { SmsModule } from './modules/sms/sms.module';

@Module({
  imports: [UserModule, AuthModule, DatabaseModule, SmsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
