import { Injectable } from '@nestjs/common';
import { Public } from './auth/decorator/is-public.decorator';

@Injectable()
export class AppService {

  @Public()
  getHello(): string {
    return 'API Telemed';
  }
}
