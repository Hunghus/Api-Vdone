import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class SmsService {
  private readonly logger = new Logger(SmsService.name);
  constructor(private readonly httpService: HttpService) {}

  async sendSms(phone: string, content: string) {
    await firstValueFrom(
      this.httpService
        .post(
          'https://v1.tingting.im/api/sms',
          {
            to: phone,
            content: content,
            sender: 'VIPTAM',
          },
          {
            headers: {
              apikey: `DDrr0BuGCDeI73NEfZk63a91201a1487`,
            },
          },
        )
        .pipe(
          catchError((error) => {
            this.logger.error(error.response.data);
            throw new InternalServerErrorException(
              'Hệ thống sms đang gặp sự cố, vui lòng quay lại sau. Xin lỗi bạn vì vấn đề này, chúng tôi sẽ giải quyết sớm nhất',
            );
          }),
        ),
    );

    return true;
  }
}
