import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { message: string } {
    return {
      message:
        'This is the Backend for the ECommerce Web App built using Nest.js',
    };
  }
}
